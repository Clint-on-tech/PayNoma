from rest_framework import serializers
from .models import Property, Unit
from users.models import User


# ------------------------------
# UNIT SERIALIZER
# ------------------------------
class UnitSerializer(serializers.ModelSerializer):
    tenant_name = serializers.CharField(source='tenant.username', read_only=True)
    property_name = serializers.CharField(source='property.name', read_only=True)

    class Meta:
        model = Unit
        fields = ['id', 'property', 'property_name', 'unit_number', 'rent_amount', 'tenant', 'tenant_name', 'is_occupied']

    def validate(self, data):
        """Ensure rent amount is positive and property exists"""
        if data.get('rent_amount') is not None and data['rent_amount'] <= 0:
            raise serializers.ValidationError({"rent_amount": "Rent amount must be positive."})
        return data

# ------------------------------
# PROPERTY SERIALIZER
# ------------------------------
class PropertySerializer(serializers.ModelSerializer):
    owner_name = serializers.CharField(source='owner.username', read_only=True)
    units = UnitSerializer(many=True, read_only=True)

    class Meta:
        model = Property
        fields = ['id', 'name', 'location', 'owner', 'owner_name', 'units']

    def validate(self, data):
        """Ensure property name is provided"""
        if not data.get('name'):
            raise serializers.ValidationError({"name": "Property name is required."})
        return data
