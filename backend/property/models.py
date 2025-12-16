from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings

User = get_user_model()
class Property(models.Model):
    landlord = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='properties'
    )
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.location})"

class Unit(models.Model):
    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name='units'
    )
    name = models.CharField(max_length=50)  # e.g., "Unit A3"
    rent_amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_occupied = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.property.name}"


class TenantProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE
    )
    assigned_unit = models.OneToOneField(
        Unit, on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return f"{self.user.username} - {self.assigned_unit}"