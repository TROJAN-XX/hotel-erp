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
