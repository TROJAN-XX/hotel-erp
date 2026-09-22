from django.db import models


class PricingRule(models.Model):
    RULE_TYPE_CHOICES = [
        ("percentage", "Percentage"),
        ("fixed", "Fixed Amount"),
    ]

    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    rule_type = models.CharField(max_length=20, choices=RULE_TYPE_CHOICES, default="percentage")
    value = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    applies_to = models.CharField(max_length=50, default="all")
    description = models.TextField(blank=True, default="")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Pricing Rule"
        verbose_name_plural = "Pricing Rules"

    def __str__(self):
        return self.name

    @property
    def effective_value(self):
        if self.rule_type == "fixed":
            return self.value
        return self.value / 100
