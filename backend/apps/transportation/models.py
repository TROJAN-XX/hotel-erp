from django.db import models


class TransportService(models.Model):
    SERVICE_TYPE_CHOICES = [
        ("airport_transfer", "Airport Transfer"),
        ("taxi", "Taxi"),
        ("private_vehicle", "Private Vehicle"),
        ("rental", "Rental"),
    ]

    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    service_type = models.CharField(max_length=40, choices=SERVICE_TYPE_CHOICES, default="taxi")
    description = models.TextField(blank=True, default="")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class TransportVehicle(models.Model):
    service = models.ForeignKey(TransportService, related_name="vehicles", on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    plate_number = models.CharField(max_length=50, unique=True)
    capacity = models.PositiveIntegerField(default=4)
    base_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["service__name", "name"]

    def __str__(self):
        return self.name
