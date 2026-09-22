from rest_framework import serializers

from .models import AuditLog


class AuditLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditLog
        fields = [
            "id",
            "actor_name",
            "action",
            "entity_type",
            "entity_id",
            "details",
            "severity",
            "created_at",
        ]
