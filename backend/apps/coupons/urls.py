from django.urls import path

from .views import CouponListView

urlpatterns = [
    path("", CouponListView.as_view(), name="coupon-list"),
]
