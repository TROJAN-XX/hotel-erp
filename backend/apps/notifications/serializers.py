from rest_framework import serializers

from .models import NotificationLog


class NotificationLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationLog
        fields = [
            "id",
            "recipient",
            "channel",
            "subject",
            "message",
            "status",
            "created_at",
            "updated_at",
        ]
