from django.db import models


class WellnessService(models.Model):
    CATEGORY_CHOICES = [
        ("Spa", "Spa"),
        ("Massage", "Massage"),
        ("Wellness", "Wellness"),
        ("Sauna", "Sauna"),
        ("Yoga", "Yoga"),
    ]

    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=40, choices=CATEGORY_CHOICES, default="Spa")
    description = models.TextField(blank=True, default="")
    duration_minutes = models.PositiveIntegerField(default=60)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    currency = models.CharField(max_length=10, default="INR")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["category", "name"]

    def __str__(self):
        return self.name


class MassageTherapist(models.Model):
    name = models.CharField(max_length=200)
    specialty = models.CharField(max_length=200, default="General Massage")
    experience_years = models.PositiveIntegerField(default=1)
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name
