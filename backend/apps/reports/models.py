from django.db import models


class SalesReport(models.Model):
    REPORT_TYPE_CHOICES = [
        ("daily", "Daily"),
        ("weekly", "Weekly"),
        ("monthly", "Monthly"),
        ("yearly", "Yearly"),
    ]

    title = models.CharField(max_length=200)
    report_type = models.CharField(max_length=20, choices=REPORT_TYPE_CHOICES, default="monthly")
    period_start = models.DateField()
    period_end = models.DateField()
    total_revenue = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    total_bookings = models.PositiveIntegerField(default=0)
    summary = models.TextField(blank=True, default="")
    generated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-generated_at"]

    def __str__(self):
        return self.title
