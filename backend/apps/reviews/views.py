from rest_framework import generics, permissions

from .models import GuestReview
from .serializers import GuestReviewSerializer


class GuestReviewListView(generics.ListAPIView):
    queryset = GuestReview.objects.filter(status="approved").order_by("-created_at")
    serializer_class = GuestReviewSerializer
    permission_classes = [permissions.AllowAny]
