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
