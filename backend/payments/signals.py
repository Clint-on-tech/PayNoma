# payments/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import RentPayment, PlatformFee, AdminWallet, LedgerEntry
from decimal import Decimal
from django.utils import timezone

@receiver(post_save, sender=RentPayment)
def handle_successful_payment(sender, instance, created, **kwargs):
    """
    When a RentPayment is marked success, create PlatformFee and update admin wallet.
    Idempotent: checks if platform_fee already exists.
    """
    # Only act when status is success
    if instance.status != 'success':
        return

    # If PlatformFee already exists, do nothing
    if hasattr(instance, 'platform_fee'):
        return

    # Compute 2% fee
    fee_amount = (Decimal(instance.amount_paid) * Decimal('0.02')).quantize(Decimal('0.01'))

    # Create PlatformFee
    pf = PlatformFee.objects.create(payment=instance, amount=fee_amount)

    # Update or create admin wallet (singleton pattern using pk=1)
    wallet, _ = AdminWallet.objects.get_or_create(pk=1, defaults={'balance': Decimal('0.00')})
    wallet.balance = wallet.balance + fee_amount
    wallet.save()

    # Create ledger entry
    LedgerEntry.objects.create(
        wallet=wallet,
        entry_type='credit',
        amount=fee_amount,
        description=f'2% fee from payment {instance.id}',
        related_payment=instance
    )

    # Mark paid date and landlord_fee_deducted if not set
    updated = False
    if not instance.date_paid:
        instance.date_paid = timezone.now()
        updated = True
    if not instance.landlord_fee_deducted:
        instance.landlord_fee_deducted = True
        updated = True
    if updated:
        instance.save(update_fields=['date_paid', 'landlord_fee_deducted'])
