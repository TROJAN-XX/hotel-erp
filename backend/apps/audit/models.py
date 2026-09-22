from django.db import models


class AuditLog(models.Model):
    SEVERITY_CHOICES = [
        ("info", "Info"),
        ("warning", "Warning"),
        ("error", "Error"),
    ]

    actor_name = models.CharField(max_length=200)
    action = models.CharField(max_length=120)
    entity_type = models.CharField(max_length=100)
    entity_id = models.PositiveIntegerField(default=0)
    details = models.TextField(blank=True, default="")
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES, default="info")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.actor_name}: {self.action}"
