from collections import Counter

from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import AuditLog
from .serializers import AuditLogSerializer


class AuditLogListView(generics.ListAPIView):
    queryset = AuditLog.objects.all().order_by("-created_at")
    serializer_class = AuditLogSerializer
    permission_classes = [permissions.AllowAny]


class AuditSummaryView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        logs = AuditLog.objects.all().order_by("-created_at")
        counts = Counter(log.severity for log in logs)
        payload = {
            "total_events": logs.count(),
            "by_severity": {
                "info": counts.get("info", 0),
                "warning": counts.get("warning", 0),
                "error": counts.get("error", 0),
            },
            "latest_actions": [
                {
                    "actor_name": log.actor_name,
                    "action": log.action,
                    "entity_type": log.entity_type,
                    "severity": log.severity,
                    "created_at": log.created_at.isoformat(),
                }
                for log in logs[:5]
            ],
        }
        return Response(payload)
