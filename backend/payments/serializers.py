# payments/serializers.py
from rest_framework import serializers
from .models import RentPayment, PlatformFee, AdminWallet, LedgerEntry
from property.serializers import UnitSerializer  # optional nested view

class RentPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = RentPayment
        fields = '__all__'
        read_only_fields = ('id', 'date_initiated', 'date_paid', 'status', 'receipt_url', 'landlord_fee_deducted')

class CreateRentPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = RentPayment
        fields = ('unit', 'amount_paid', 'payment_method', 'external_reference')
        # tenant will be set from request.user

class PlatformFeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlatformFee
        fields = '__all__'

class AdminWalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminWallet
        fields = '__all__'

class LedgerEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = LedgerEntry
        fields = '__all__'
