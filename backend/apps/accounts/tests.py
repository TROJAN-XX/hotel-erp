from decimal import Decimal

from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.bookings.models import Booking
from apps.hotels.models import Hotel
from apps.rooms.models import RoomType

User = get_user_model()


class AuthAPITests(APITestCase):
    def test_user_registration_creates_account(self):
        url = reverse("register")
        payload = {
            "email": "new.customer@example.com",
            "password": "StrongPass123!",
            "first_name": "Aisha",
            "last_name": "Nair",
            "phone_number": "+919876543210",
        }

        response = self.client.post(url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(email="new.customer@example.com").exists())
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_user_login_returns_jwt_tokens(self):
        user = User.objects.create_user(
            email="login.user@example.com",
            password="StrongPass123!",
            first_name="Login",
            last_name="User",
            phone_number="+919900000001",
        )

        url = reverse("login")
        payload = {"email": user.email, "password": "StrongPass123!"}

        response = self.client.post(url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_staff_directory_lists_team_members(self):
        User.objects.create_user(
            email="reception@example.com",
            password="StrongPass123!",
            first_name="Priya",
            last_name="Menon",
            phone_number="+919900000002",
            role="staff",
        )
        User.objects.create_user(
            email="agent@example.com",
            password="StrongPass123!",
            first_name="Arjun",
            last_name="Nair",
            phone_number="+919900000003",
            role="staff",
        )
        User.objects.create_user(
            email="guest@example.com",
            password="StrongPass123!",
            first_name="Guest",
            last_name="User",
            phone_number="+919900000004",
            role="customer",
        )

        response = self.client.get(reverse("staff-directory"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["total_staff"], 2)
        self.assertEqual(response.data["active_staff"], 2)
        self.assertEqual(len(response.data["results"]), 2)

    def test_admin_access_check_blocks_non_admin_users(self):
        admin = User.objects.create_user(
            email="admin@example.com",
            password="StrongPass123!",
            first_name="Asteria",
            last_name="Admin",
            phone_number="+919900000005",
            role="admin",
        )
        guest = User.objects.create_user(
            email="guest.user@example.com",
            password="StrongPass123!",
            first_name="Guest",
            last_name="User",
            phone_number="+919900000006",
            role="customer",
        )

        admin_client = self.client_class()
        admin_client.force_authenticate(user=admin)
        admin_response = admin_client.get(reverse("admin-access-check"))
        self.assertEqual(admin_response.status_code, status.HTTP_200_OK)
        self.assertTrue(admin_response.data["is_admin"])

        guest_client = self.client_class()
        guest_client.force_authenticate(user=guest)
        guest_response = guest_client.get(reverse("admin-access-check"))
        self.assertEqual(guest_response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_overview_returns_metrics_and_alerts(self):
        admin = User.objects.create_user(
            email="overview.admin@example.com",
            password="StrongPass123!",
            first_name="Ops",
            last_name="Admin",
            phone_number="+919900000007",
            role="admin",
        )
        hotel = Hotel.objects.create(
            name="Northwind Stay",
            slug="northwind-stay",
            city="Mumbai",
            state="Maharashtra",
            country="India",
            address="MG Road",
            star_rating=4.5,
        )
        room_type = RoomType.objects.create(
            hotel=hotel,
            name="Premier Suite",
            slug="premier-suite",
            room_size_sqft=500,
            max_guests=2,
            base_price=Decimal("3000.00"),
        )
        Booking.objects.create(
            hotel=hotel,
            room_type=room_type,
            guest_name="Hina Verma",
            guest_phone="+919900000008",
            check_in="2026-09-20",
            check_out="2026-09-22",
            adults=2,
            children=0,
            total_amount=Decimal("6000.00"),
            status="pending",
        )

        admin_client = self.client_class()
        admin_client.force_authenticate(user=admin)
        response = admin_client.get(reverse("admin-overview"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("summary", response.data)
        self.assertIn("alerts", response.data)
        self.assertEqual(response.data["summary"]["pending_approvals"], 1)

    def test_admin_action_can_approve_booking(self):
        admin = User.objects.create_user(
            email="approve.admin@example.com",
            password="StrongPass123!",
            first_name="Approval",
            last_name="Admin",
            phone_number="+919900000009",
            role="admin",
        )
        hotel = Hotel.objects.create(
            name="Harbor View",
            slug="harbor-view",
            city="Chennai",
            state="Tamil Nadu",
            country="India",
            address="Beach Road",
            star_rating=4.2,
        )
        room_type = RoomType.objects.create(
            hotel=hotel,
            name="Ocean Deluxe",
            slug="ocean-deluxe",
            room_size_sqft=470,
            max_guests=2,
            base_price=Decimal("3500.00"),
        )
        booking = Booking.objects.create(
            hotel=hotel,
            room_type=room_type,
            guest_name="Rohan Shah",
            guest_phone="+919900000010",
            check_in="2026-09-21",
            check_out="2026-09-24",
            adults=2,
            children=1,
            total_amount=Decimal("10500.00"),
            status="pending",
        )

        admin_client = self.client_class()
        admin_client.force_authenticate(user=admin)
        response = admin_client.post(
            reverse("admin-action"),
            {"action": "approve_booking", "booking_id": booking.id},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        booking.refresh_from_db()
        self.assertEqual(booking.status, "confirmed")
        self.assertEqual(response.data["status"], "confirmed")
