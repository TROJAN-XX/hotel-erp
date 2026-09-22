from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import TransportVehicle, TransportService


class TransportAPITests(APITestCase):
    def setUp(self):
        service = TransportService.objects.create(
            name="Airport Transfer",
            slug="airport-transfer",
            service_type="airport_transfer",
            is_active=True,
        )
        TransportVehicle.objects.create(
            service=service,
            name="Toyota Innova",
            plate_number="GA-01-AB-2024",
            capacity=7,
            base_price=1800,
            is_active=True,
        )

    def test_transport_service_list_returns_services(self):
        response = self.client.get(reverse("transport-service-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)

    def test_transport_vehicle_list_returns_vehicles(self):
        response = self.client.get(reverse("transport-vehicle-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)
