from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models


class Booking(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("checked_in", "Checked In"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="bookings",
    )
    hotel = models.ForeignKey("hotels.Hotel", related_name="bookings", on_delete=models.CASCADE)
    room_type = models.ForeignKey("rooms.RoomType", related_name="bookings", on_delete=models.CASCADE)
    guest_name = models.CharField(max_length=200)
    guest_phone = models.CharField(max_length=40)
    check_in = models.DateField()
    check_out = models.DateField()
    adults = models.PositiveIntegerField(default=1)
    children = models.PositiveIntegerField(default=0)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    currency = models.CharField(max_length=10, default="INR")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    notes = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Booking"
        verbose_name_plural = "Bookings"

    def clean(self):
        if self.check_out <= self.check_in:
            raise ValidationError("Check-out date must be after check-in date.")

    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs)

    @property
    def nights(self):
        return (self.check_out - self.check_in).days

    def __str__(self):
        return f"{self.hotel.name} - {self.guest_name} ({self.status})"


class BookingItem(models.Model):
    booking = models.ForeignKey(Booking, related_name="items", on_delete=models.CASCADE)
    item_type = models.CharField(max_length=50, default="room")
    item_name = models.CharField(max_length=200)
    quantity = models.PositiveIntegerField(default=1)
    rate = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    nights = models.PositiveIntegerField(default=1)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"{self.item_name} - {self.booking.guest_name}"
