from django.db import models


class PaymentTransaction(models.Model):
    PAYMENT_METHOD_CHOICES = [
        ("UPI", "UPI"),
        ("Card", "Card"),
        ("Net Banking", "Net Banking"),
        ("Wallet", "Wallet"),
        ("Cash", "Cash"),
    ]

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("paid", "Paid"),
        ("failed", "Failed"),
        ("refunded", "Refunded"),
    ]

    amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    currency = models.CharField(max_length=10, default="INR")
    payment_method = models.CharField(max_length=30, choices=PAYMENT_METHOD_CHOICES, default="UPI")
    gateway = models.CharField(max_length=60, default="Razorpay")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    reference_id = models.CharField(max_length=120, unique=True)
    note = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.reference_id


class RefundRequest(models.Model):
    STATUS_CHOICES = [
        ("requested", "Requested"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
        ("processed", "Processed"),
    ]

    transaction = models.ForeignKey(PaymentTransaction, related_name="refund_requests", on_delete=models.CASCADE)
    refund_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    reason = models.TextField(blank=True, default="")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="requested")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Refund for {self.transaction.reference_id}"
