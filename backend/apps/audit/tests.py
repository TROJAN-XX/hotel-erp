from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import AuditLog


class AuditAPITests(APITestCase):
    def setUp(self):
        AuditLog.objects.create(
            actor_name="Admin User",
            action="created_booking",
            entity_type="booking",
            entity_id=1,
            details="Created a booking for guest check-in.",
            severity="info",
        )

    def test_audit_log_list_returns_logs(self):
        response = self.client.get(reverse("audit-log-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)

    def test_audit_summary_returns_operational_counts(self):
        AuditLog.objects.create(
            actor_name="Manager User",
            action="updated_room_rate",
            entity_type="room",
            entity_id=2,
            details="Updated room pricing for deluxe category.",
            severity="warning",
        )
        AuditLog.objects.create(
            actor_name="Finance User",
            action="processed_refund",
            entity_type="payment",
            entity_id=4,
            details="Refund issued to guest for cancelled stay.",
            severity="error",
        )

        response = self.client.get(reverse("audit-summary"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["total_events"], 3)
        self.assertEqual(response.data["by_severity"]["info"], 1)
        self.assertEqual(response.data["by_severity"]["warning"], 1)
        self.assertEqual(response.data["by_severity"]["error"], 1)
