from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import PaymentTransaction, RefundRequest


class PaymentAPITests(APITestCase):
    def setUp(self):
        transaction = PaymentTransaction.objects.create(
            amount=2500.00,
            payment_method="UPI",
            gateway="Razorpay",
            status="paid",
            reference_id="txn_1001",
        )
        RefundRequest.objects.create(
            transaction=transaction,
            refund_amount=2500.00,
            reason="Guest cancellation",
            status="requested",
        )

    def test_payment_transaction_list_returns_transactions(self):
        response = self.client.get(reverse("payment-transaction-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)

    def test_refund_request_list_returns_refunds(self):
        response = self.client.get(reverse("refund-request-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(response.data["count"], 1)
        self.assertIn("results", response.data)

    def test_payment_transaction_create_returns_created_record(self):
        payload = {
            "amount": 9500.00,
            "currency": "INR",
            "payment_method": "UPI",
            "gateway": "Razorpay",
            "status": "paid",
            "reference_id": "txn_2001",
            "note": "Room booking payment",
        }

        response = self.client.post(reverse("payment-transaction-list"), payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["reference_id"], "txn_2001")
        self.assertEqual(response.data["amount"], "9500.00")
