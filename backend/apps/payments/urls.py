from django.urls import path

from .views import PaymentTransactionListView, RefundRequestListView

urlpatterns = [
    path("transactions/", PaymentTransactionListView.as_view(), name="payment-transaction-list"),
    path("refunds/", RefundRequestListView.as_view(), name="refund-request-list"),
]
