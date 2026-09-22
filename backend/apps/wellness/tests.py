from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import MassageTherapist, WellnessService


class WellnessAPITests(APITestCase):
    def setUp(self):
        WellnessService.objects.create(
            name="Signature Spa Ritual",
            slug="signature-spa-ritual",
            category="Spa",
            duration_minutes=90,
            price=4200,
            is_active=True,
        )
        MassageTherapist.objects.create(
            name="Aisha Nair",
            specialty="Deep Tissue Massage",
            experience_years=6,
            hourly_rate=1800,
            is_available=True,
        )

    def test_wellness_service_list_returns_services(self):
        response = self.client.get(reverse("wellness-service-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)

    def test_massage_therapist_list_returns_therapists(self):
        response = self.client.get(reverse("massage-therapist-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)
