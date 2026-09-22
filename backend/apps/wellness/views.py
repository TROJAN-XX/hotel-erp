from rest_framework import generics, permissions

from .models import MassageTherapist, WellnessService
from .serializers import MassageTherapistSerializer, WellnessServiceSerializer


class WellnessServiceListView(generics.ListAPIView):
    queryset = WellnessService.objects.filter(is_active=True).order_by("category", "name")
    serializer_class = WellnessServiceSerializer
    permission_classes = [permissions.AllowAny]


class MassageTherapistListView(generics.ListAPIView):
    queryset = MassageTherapist.objects.filter(is_available=True).order_by("name")
    serializer_class = MassageTherapistSerializer
    permission_classes = [permissions.AllowAny]
