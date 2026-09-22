from django.db import models


class Hotel(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    city = models.CharField(max_length=120)
    state = models.CharField(max_length=120, blank=True, default="")
    country = models.CharField(max_length=100, default="India")
    address = models.TextField(blank=True, default="")
    description = models.TextField(blank=True, default="")
    star_rating = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    check_in_time = models.TimeField(default="14:00")
    check_out_time = models.TimeField(default="12:00")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Hotel"
        verbose_name_plural = "Hotels"

    def __str__(self):
        return self.name
