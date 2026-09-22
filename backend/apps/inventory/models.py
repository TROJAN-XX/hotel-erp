from django.db import models


class InventoryItem(models.Model):
    name = models.CharField(max_length=200)
    sku = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=100, default="General")
    current_stock = models.PositiveIntegerField(default=0)
    reorder_level = models.PositiveIntegerField(default=0)
    unit = models.CharField(max_length=30, default="units")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["category", "name"]

    def __str__(self):
        return f"{self.name} ({self.sku})"


class StockMovement(models.Model):
    MOVEMENT_TYPE_CHOICES = [
        ("inbound", "Inbound"),
        ("outbound", "Outbound"),
        ("adjustment", "Adjustment"),
    ]

    item = models.ForeignKey(InventoryItem, related_name="movements", on_delete=models.CASCADE)
    movement_type = models.CharField(max_length=20, choices=MOVEMENT_TYPE_CHOICES, default="inbound")
    quantity = models.IntegerField(default=0)
    reference = models.CharField(max_length=120, blank=True, default="")
    notes = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.item.name} - {self.movement_type}"
