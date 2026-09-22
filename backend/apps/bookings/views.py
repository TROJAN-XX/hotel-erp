from rest_framework import generics, permissions

from .models import Booking
from .serializers import BookingSerializer


class BookingListCreateView(generics.ListCreateAPIView):
    queryset = Booking.objects.select_related("hotel", "room_type", "user").all().order_by("-created_at")
    serializer_class = BookingSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user if self.request.user.is_authenticated else None)


class BookingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.select_related("hotel", "room_type", "user").all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.AllowAny]
