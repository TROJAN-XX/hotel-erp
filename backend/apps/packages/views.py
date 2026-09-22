from rest_framework import generics, permissions

from .models import Package
from .serializers import PackageSerializer


class PackageListView(generics.ListAPIView):
    queryset = Package.objects.filter(is_active=True).order_by("name")
    serializer_class = PackageSerializer
    permission_classes = [permissions.AllowAny]


class PackageDetailView(generics.RetrieveAPIView):
    queryset = Package.objects.filter(is_active=True)
    serializer_class = PackageSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"
