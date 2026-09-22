from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

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
