from django.db import models


class RoomType(models.Model):
    hotel = models.ForeignKey("hotels.Hotel", related_name="room_types", on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    room_size_sqft = models.PositiveIntegerField(default=0)
    max_guests = models.PositiveIntegerField(default=2)
    base_price = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    bed_type = models.CharField(max_length=80, default="King")
    description = models.TextField(blank=True, default="")
    amenities = models.JSONField(default=list, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["hotel__name", "name"]
        unique_together = ("hotel", "slug")

    def __str__(self):
        return f"{self.hotel.name} - {self.name}"


class Room(models.Model):
    STATUS_CHOICES = [
        ("available", "Available"),
        ("occupied", "Occupied"),
        ("maintenance", "Maintenance"),
        ("out_of_order", "Out of order"),
    ]

    hotel = models.ForeignKey("hotels.Hotel", related_name="rooms", on_delete=models.CASCADE)
    room_type = models.ForeignKey(RoomType, related_name="rooms", on_delete=models.CASCADE)
    room_number = models.CharField(max_length=20)
    floor = models.PositiveIntegerField(default=1)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="available")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["hotel__name", "floor", "room_number"]
        unique_together = ("hotel", "room_number")

    def __str__(self):
        return f"{self.hotel.name} - Room {self.room_number}"
