from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.bookings.models import Booking
from apps.hotels.models import Hotel
from apps.inventory.models import InventoryItem
from apps.rooms.models import RoomType
from .models import SalesReport


class ReportAPITests(APITestCase):
    def setUp(self):
        SalesReport.objects.create(
            title="Monthly revenue report",
            period_start="2026-09-01",
            period_end="2026-09-30",
            total_revenue=245000.00,
            total_bookings=38,
            report_type="monthly",
        )

    def test_sales_report_list_returns_reports(self):
        response = self.client.get(reverse("sales-report-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)

    def test_dashboard_summary_returns_operational_kpis(self):
        hotel = Hotel.objects.create(name="Asteria", slug="asteria", city="Bengaluru")
        room_type = RoomType.objects.create(
            hotel=hotel,
            name="Deluxe",
            slug="deluxe",
            base_price=12000.00,
        )
        Booking.objects.create(
            hotel=hotel,
            room_type=room_type,
            guest_name="Aisha Nair",
            guest_phone="9999999999",
            check_in="2026-09-22",
            check_out="2026-09-24",
            total_amount=22000.00,
            status="confirmed",
        )
        Booking.objects.create(
            hotel=hotel,
            room_type=room_type,
            guest_name="Karthik Rao",
            guest_phone="8888888888",
            check_in="2026-09-23",
            check_out="2026-09-25",
            total_amount=18000.00,
            status="pending",
        )
        Booking.objects.create(
            hotel=hotel,
            room_type=room_type,
            guest_name="Milan Thomas",
            guest_phone="7777777777",
            check_in="2026-09-21",
            check_out="2026-09-23",
            total_amount=15000.00,
            status="checked_in",
        )
        InventoryItem.objects.create(
            name="Fresh Linen",
            sku="LINEN-001",
            current_stock=4,
            reorder_level=8,
        )

        response = self.client.get(reverse("dashboard-summary"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["total_revenue"], 55000.0)
        self.assertEqual(response.data["total_bookings"], 3)
        self.assertEqual(response.data["pending_approvals"], 1)
        self.assertEqual(response.data["checked_in_count"], 1)
        self.assertEqual(response.data["low_stock_alerts"], 1)
        self.assertIn("occupancy_rate", response.data)
