from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import NotificationLog


class NotificationAPITests(APITestCase):
    def setUp(self):
        NotificationLog.objects.create(
            recipient="guest@example.com",
            channel="email",
            subject="Booking confirmation",
            message="Your reservation has been confirmed.",
            status="sent",
        )

    def test_notification_log_list_returns_notifications(self):
        response = self.client.get(reverse("notification-log-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)
