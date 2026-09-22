from rest_framework import generics, permissions

from .models import PaymentTransaction, RefundRequest
from .serializers import PaymentTransactionSerializer, RefundRequestSerializer


class PaymentTransactionListView(generics.ListAPIView):
    queryset = PaymentTransaction.objects.all().order_by("-created_at")
    serializer_class = PaymentTransactionSerializer
    permission_classes = [permissions.AllowAny]


class RefundRequestListView(generics.ListAPIView):
    queryset = RefundRequest.objects.all().order_by("-created_at")
    serializer_class = RefundRequestSerializer
    permission_classes = [permissions.AllowAny]
