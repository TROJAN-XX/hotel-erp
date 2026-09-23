from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import PaymentTransaction
from apps.bookings.models import Booking

@receiver(post_save, sender=PaymentTransaction)
def update_booking_status_on_payment(sender, instance, created, **kwargs):
    if instance.status == "paid" and instance.booking:
        booking = instance.booking
        if booking.status != "confirmed":
            booking.status = 'confirmed'
            booking.save(update_fields=['status'])
