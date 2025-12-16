from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import RentPayment, PlatformFee
from .serializers import RentPaymentSerializer
from property.models import Unit
from .mpesa import lipa_na_mpesa
from users.decorators import role_required

# -------------------------------
# Rent Payment View
# -------------------------------
class RentPaymentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            tenant = request.user
            unit_id = request.data.get('unit_id')
            amount = float(request.data.get('amount'))
            payment_mode = request.data.get('payment_mode', 'monthly')  # 'monthly', 'half', 'annual'

            unit = Unit.objects.get(id=unit_id)

            # Calculate 2% commission
            commission = amount * 0.02
            landlord_amount = amount - commission

            # Save Payment Record
            rent_payment = RentPayment.objects.create(
                tenant=tenant,
                landlord=unit.property.owner,
                unit=unit,
                amount=amount,
                payment_mode=payment_mode,
                commission=commission,
                landlord_amount=landlord_amount,
                status="PENDING",
            )

            # Initiate M-PESA STK push (simulate)
            response = lipa_na_mpesa(amount, tenant.username)

            return Response({
                "message": "Payment initiated successfully",
                "payment_id": rent_payment.id,
                "mpesa_response": response
            }, status=status.HTTP_200_OK)

        except Unit.DoesNotExist:
            return Response({"error": "Unit not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# -------------------------------
# M-PESA Callback
# -------------------------------
class MpesaCallbackView(APIView):
    def post(self, request):
        """Handle callback from M-PESA API"""
        try:
            data = request.data
            payment_id = data.get('payment_id')
            rent_payment = RentPayment.objects.get(id=payment_id)

            rent_payment.status = "SUCCESS"
            rent_payment.save()

            # Log platform fee
            PlatformFee.objects.create(
                landlord=rent_payment.landlord,
                amount=rent_payment.commission
            )

            return Response({"message": "Callback received successfully"}, status=200)
        except RentPayment.DoesNotExist:
            return Response({"error": "Payment not found"}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=400)

@role_required(['landlord'])
def my_properties(request):
    # Only landlords can see this
    ...
