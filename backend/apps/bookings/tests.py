from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.hotels.models import Hotel
from apps.inventory.models import InventoryItem, StockMovement
from apps.notifications.models import NotificationLog
from apps.reports.models import SalesReport
from apps.rooms.models import RoomType

from .models import Booking

User = get_user_model()


class BookingAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="guest@example.com",
            password="StrongPass123!",
            first_name="Guest",
            last_name="User",
        )
        self.hotel = Hotel.objects.create(
            name="Azure Bay Hotel",
            slug="azure-bay-hotel",
            city="Goa",
            state="Goa",
            country="India",
            address="Baga Beach",
            description="Beachside stay",
            star_rating=4.0,
            check_in_time="14:00",
            check_out_time="12:00",
        )
        self.room_type = RoomType.objects.create(
            hotel=self.hotel,
            name="Deluxe Suite",
            slug="deluxe-suite",
            room_size_sqft=520,
            max_guests=3,
            base_price=7000,
            bed_type="King",
            description="Large family suite",
            is_active=True,
        )

    def test_booking_creation_creates_booking_record(self):
        payload = {
            "hotel": self.hotel.id,
            "room_type": self.room_type.id,
            "guest_name": "Aparna Nair",
            "guest_phone": "+919876543210",
            "check_in": "2026-10-01",
            "check_out": "2026-10-03",
            "adults": 2,
            "children": 1,
            "total_amount": 14000,
            "currency": "INR",
            "notes": "Early check-in requested",
        }

        response = self.client.post(reverse("booking-list"), payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Booking.objects.count(), 1)
        self.assertEqual(response.data["status"], "pending")
        self.assertEqual(response.data["guest_name"], "Aparna Nair")

    def test_booking_list_returns_records(self):
        Booking.objects.create(
            hotel=self.hotel,
            room_type=self.room_type,
            guest_name="Rohan Malik",
            guest_phone="+919900000000",
            user=self.user,
            check_in="2026-11-10",
            check_out="2026-11-12",
            adults=2,
            children=0,
            total_amount=16000,
            currency="INR",
            status="pending",
        )

        response = self.client.get(reverse("booking-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)

    def test_booking_status_patch_updates_admin_flow(self):
        booking = Booking.objects.create(
            hotel=self.hotel,
            room_type=self.room_type,
            guest_name="Priya Shah",
            guest_phone="+919988776655",
            user=self.user,
            check_in="2026-11-18",
            check_out="2026-11-20",
            adults=2,
            children=0,
            total_amount=14000,
            currency="INR",
            status="pending",
        )

        response = self.client.patch(
            reverse("booking-detail", args=[booking.id]),
            {"status": "confirmed"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        booking.refresh_from_db()
        self.assertEqual(booking.status, "confirmed")
        self.assertEqual(response.data["status"], "confirmed")

    def test_seed_demo_data_populates_admin_dashboard_records(self):
        call_command("seed_demo_data")

        self.assertTrue(Booking.objects.exists())
        self.assertTrue(InventoryItem.objects.exists())
        self.assertTrue(StockMovement.objects.exists())
        self.assertTrue(NotificationLog.objects.exists())
        self.assertTrue(SalesReport.objects.exists())
