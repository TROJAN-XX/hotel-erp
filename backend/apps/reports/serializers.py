from rest_framework import serializers

from .models import SalesReport


class SalesReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesReport
        fields = [
            "id",
            "title",
            "report_type",
            "period_start",
            "period_end",
            "total_revenue",
            "total_bookings",
            "summary",
            "generated_at",
        ]
