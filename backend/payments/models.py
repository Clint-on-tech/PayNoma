from django.db import models
from users.models import User
from property.models import Unit
from django.db.models.signals import post_save
from django.dispatch import receiver

class RentPayment(models.Model):
    tenant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rent_payments')
    unit = models.ForeignKey(Unit, on_delete=models.SET_NULL, null=True, related_name='payments')
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    date_paid = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=20, choices=(('M-PESA','M-PESA'), ('Card','Card')))
    landlord_fee_deducted = models.BooleanField(default=False)
    receipt_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.tenant.username} paid {self.amount_paid} for {self.unit.name} on {self.date_paid}"
# payments/models.py
from django.db import models
from django.conf import settings
from property.models import Unit
from decimal import Decimal
import uuid

User = settings.AUTH_USER_MODEL

class RentPayment(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('success', 'Success'),
        ('failed', 'Failed'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tenant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rent_payments')
    unit = models.ForeignKey(Unit, on_delete=models.SET_NULL, null=True, related_name='payments')
    amount_paid = models.DecimalField(max_digits=12, decimal_places=2)
    date_initiated = models.DateTimeField(auto_now_add=True)
    date_paid = models.DateTimeField(null=True, blank=True)
    payment_method = models.CharField(max_length=20, choices=(('M-PESA','M-PESA'), ('Card','Card')))
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    external_reference = models.CharField(max_length=255, blank=True, null=True)  # e.g., MPESA CheckoutRequestID or MerchantRequestID or transaction id
    receipt_url = models.URLField(blank=True, null=True)
    landlord_fee_deducted = models.BooleanField(default=False)

    class Meta:
        ordering = ['-date_initiated']

    def __str__(self):
        return f"{self.tenant} -> {self.amount_paid} ({self.status})"


class PlatformFee(models.Model):
    payment = models.OneToOneField(RentPayment, on_delete=models.CASCADE, related_name='platform_fee')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    credited_to_admin = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Fee {self.amount} for payment {self.payment.id}"


class AdminWallet(models.Model):
    # Single admin wallet (we will use get_or_create(pk=1))
    balance = models.DecimalField(max_digits=14, decimal_places=2, default=Decimal('0.00'))
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"AdminWallet: {self.balance}"


class LedgerEntry(models.Model):
    ENTRY_CHOICES = (
        ('credit', 'Credit'),
        ('debit', 'Debit'),
    )
    wallet = models.ForeignKey(AdminWallet, on_delete=models.CASCADE, related_name='entries')
    entry_type = models.CharField(max_length=10, choices=ENTRY_CHOICES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    description = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    related_payment = models.ForeignKey(RentPayment, null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.entry_type} {self.amount} - {self.description}"

class PlatformFee(models.Model):
    payment = models.OneToOneField(RentPayment, on_delete=models.CASCADE, related_name='platform_fee')
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # calculated dynamically
    credited_to_admin = models.BooleanField(default=False)
    date_credited = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"₭{self.amount} from {self.payment.unit.name} to PayNoma"


@receiver(post_save, sender=RentPayment)
def create_platform_fee(sender, instance, created, **kwargs):
    if created and not instance.landlord_fee_deducted:
        fee_amount = instance.amount_paid * 0.02  # 2% of rent
        PlatformFee.objects.create(payment=instance, amount=fee_amount)
        instance.landlord_fee_deducted = True
        instance.save()