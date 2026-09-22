from rest_framework import generics, permissions

from .models import TransportService, TransportVehicle
from .serializers import TransportServiceSerializer, TransportVehicleSerializer


class TransportServiceListView(generics.ListAPIView):
    queryset = TransportService.objects.filter(is_active=True).order_by("name")
    serializer_class = TransportServiceSerializer
    permission_classes = [permissions.AllowAny]


class TransportVehicleListView(generics.ListAPIView):
    queryset = TransportVehicle.objects.filter(is_active=True).select_related("service").order_by("service__name", "name")
    serializer_class = TransportVehicleSerializer
    permission_classes = [permissions.AllowAny]
