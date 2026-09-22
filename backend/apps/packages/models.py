from django.db import models


class Package(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True, default="")
    duration_days = models.PositiveIntegerField(default=1)
    base_price = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    currency = models.CharField(max_length=10, default="INR")
    included_services = models.JSONField(default=list, blank=True)
    image_url = models.URLField(blank=True, default="")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Package"
        verbose_name_plural = "Packages"

    def __str__(self):
        return self.name
