from rest_framework import generics, permissions

from .models import Coupon
from .serializers import CouponSerializer


class CouponListView(generics.ListAPIView):
    queryset = Coupon.objects.filter(is_active=True).order_by("code")
    serializer_class = CouponSerializer
    permission_classes = [permissions.AllowAny]
