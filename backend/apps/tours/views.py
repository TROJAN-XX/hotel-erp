from rest_framework import generics, permissions

from .models import Tour, TourDestination
from .serializers import TourDestinationSerializer, TourSerializer


class TourDestinationListView(generics.ListAPIView):
    queryset = TourDestination.objects.filter(is_active=True).order_by("name")
    serializer_class = TourDestinationSerializer
    permission_classes = [permissions.AllowAny]


class TourListView(generics.ListAPIView):
    queryset = Tour.objects.filter(is_active=True).select_related("destination").order_by("destination__name", "name")
    serializer_class = TourSerializer
    permission_classes = [permissions.AllowAny]
