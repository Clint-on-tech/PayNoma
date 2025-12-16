from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Property, Unit
from .serializers import PropertySerializer, UnitSerializer
from users.models import User
from users.decorators import role_required
# ------------------------------
# List + Create Properties
# ------------------------------
class PropertyListView(generics.ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Landlord sees their own properties, tenants see their assigned ones
        if user.role == 'landlord':
            return Property.objects.filter(owner=user)
        elif user.role == 'tenant':
            return Property.objects.filter(units__tenant=user)
        return Property.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        if user.role != 'landlord':
            raise PermissionError("Only landlords can add properties.")
        serializer.save(owner=user)


# ------------------------------
# Property Detail View
# ------------------------------
class PropertyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'landlord':
            return Property.objects.filter(owner=user)
        elif user.role == 'tenant':
            return Property.objects.filter(units__tenant=user)
        return Property.objects.none()


# ------------------------------
# List + Create Units
# ------------------------------
class UnitListView(generics.ListCreateAPIView):
    serializer_class = UnitSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'landlord':
            return Unit.objects.filter(property__owner=user)
        elif user.role == 'tenant':
            return Unit.objects.filter(tenant=user)
        return Unit.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        if user.role != 'landlord':
            raise PermissionError("Only landlords can add units.")
        serializer.save()


# ------------------------------
# Assign Tenant to a Unit
# ------------------------------
class TenantAssignmentView(generics.UpdateAPIView):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        user = request.user
        if user.role != 'landlord':
            return Response({"error": "Only landlords can assign tenants."}, status=403)

        unit_id = kwargs.get('pk')
        tenant_id = request.data.get('tenant_id')

        try:
            unit = Unit.objects.get(pk=unit_id, property__owner=user)
            tenant = User.objects.get(pk=tenant_id, role='tenant')
        except Unit.DoesNotExist:
            return Response({"error": "Unit not found or not yours."}, status=404)
        except User.DoesNotExist:
            return Response({"error": "Invalid tenant ID."}, status=404)

        # Assign tenant to unit
        unit.tenant = tenant
        unit.save()

        return Response({"message": "Tenant assigned successfully.", "unit": UnitSerializer(unit).data})

@role_required(['landlord'])
def my_properties(request):
    # Only landlords can see this
    ...
