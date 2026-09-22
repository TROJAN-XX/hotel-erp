from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.hotels.models import Hotel
from apps.rooms.models import RoomType


class HotelAndRoomAPITests(APITestCase):
    def setUp(self):
        self.hotel = Hotel.objects.create(
            name="Azure Coast Hotel",
            slug="azure-coast-hotel",
            city="Goa",
            state="Goa",
            country="India",
            address="North Goa",
            description="Luxury ocean-view hotel for leisure and business guests.",
            star_rating=4.5,
            check_in_time="14:00",
            check_out_time="12:00",
        )
        RoomType.objects.create(
            hotel=self.hotel,
            name="Deluxe King",
            slug="deluxe-king",
            room_size_sqft=420,
            max_guests=2,
            base_price=5500,
            bed_type="King",
            description="Premium room with balcony and city view.",
            is_active=True,
        )

    def test_hotel_list_returns_active_hotels(self):
        response = self.client.get(reverse("hotel-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)

    def test_room_type_list_returns_room_types(self):
        response = self.client.get(reverse("room-type-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)
