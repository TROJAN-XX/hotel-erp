from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

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
