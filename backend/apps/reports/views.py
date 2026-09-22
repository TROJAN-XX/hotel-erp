from rest_framework import generics, permissions

from .models import SalesReport
from .serializers import SalesReportSerializer


class SalesReportListView(generics.ListAPIView):
    queryset = SalesReport.objects.all().order_by("-generated_at")
    serializer_class = SalesReportSerializer
    permission_classes = [permissions.AllowAny]
