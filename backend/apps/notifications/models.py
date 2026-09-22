from django.db import models


class NotificationLog(models.Model):
    CHANNEL_CHOICES = [
        ("email", "Email"),
        ("sms", "SMS"),
        ("whatsapp", "WhatsApp"),
        ("push", "Push Notification"),
    ]

    STATUS_CHOICES = [
        ("queued", "Queued"),
        ("sent", "Sent"),
        ("failed", "Failed"),
    ]

    recipient = models.CharField(max_length=255)
    channel = models.CharField(max_length=20, choices=CHANNEL_CHOICES, default="email")
    subject = models.CharField(max_length=200, blank=True, default="")
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="queued")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.channel}: {self.recipient}"
