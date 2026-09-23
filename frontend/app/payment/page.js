"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { API_BASE_URL } from "../../lib/api";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

function PaymentContent() {
  const searchParams = useSearchParams();
  const amount = Number(searchParams.get("amount") || 0);
  const guest = searchParams.get("guest") || "Guest";
  const hotel = searchParams.get("hotel") || "Asteria";
  const room = searchParams.get("room") || "Deluxe Stay";
  const nights = Number(searchParams.get("nights") || 1);`nconst bookingId = searchParams.get("booking_id") || "";`nconst bookingId = searchParams.get("booking_id") || "";
  const [method, setMethod] = useState("UPI");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const referenceId = `txn_${Date.now()}`;
      const payload = {
        amount,
        currency: "INR",
        payment_method: method,
        gateway: method === "UPI" ? "Razorpay" : "Stripe",
        status: "paid",
        reference_id: referenceId,
        note: `${guest} payment for ${room} at ${hotel}`,
      };

      const response = await fetch(`${API_BASE_URL}/payments/transactions/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.detail || data.message || "Payment processing failed.",
        );
      }

      setStatus({
        type: "success",
        message: `Payment successful. Reference: ${data.reference_id || referenceId}`,
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message ||
          "Something went wrong while processing your payment.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="customer-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">Asteria</div>
            <div className="brand-subtitle">Secure checkout</div>
          </div>
        </div>

        <div className="header-actions">
          <Link href="/" className="button button-secondary">
            Home
          </Link>
          <Link href="/booking" className="button button-primary">
            Modify booking
          </Link>
        </div>
      </header>

      <main className="page-content">
        <div className="page-shell payment-page-shell">
          <section className="payment-layout">
            <div className="card-panel payment-panel">
              <div className="section-header compact-header">
                <div>
                  <span className="eyebrow">Payment</span>
                  <h2>Complete your reservation</h2>
                </div>
              </div>

              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="payment-methods">
                  {["UPI", "Card", "Net Banking", "Wallet", "Cash"].map(
                    (option) => (
                      <label key={option} className="radio-option">
                        <input
                          type="radio"
                          name="payment_method"
                          value={option}
                          checked={method === option}
                          onChange={() => setMethod(option)}
                        />
                        <span>{option}</span>
                      </label>
                    ),
                  )}
                </div>

                <div className="booking-form-grid single-column">
                  <label>
                    Guest name
                    <input type="text" value={guest} readOnly />
                  </label>

                  <label>
                    Stay
                    <input
                      type="text"
                      value={`${hotel} • ${room} • ${nights} night${nights > 1 ? "s" : ""}`}
                      readOnly
                    />
                  </label>
                </div>

                {status.message ? (
                  <div className={`status-banner ${status.type}`}>
                    {status.message}
                  </div>
                ) : null}

                <div className="booking-actions">
                  <button
                    className="button button-primary"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? "Processing payment…" : "Pay now"}
                  </button>
                  <Link href="/rooms" className="button button-secondary">
                    Continue browsing
                  </Link>
                </div>
              </form>
            </div>

            <aside className="card-panel payment-summary">
              <div className="section-header compact-header">
                <div>
                  <span className="eyebrow">Summary</span>
                  <h3>Checkout</h3>
                </div>
              </div>

              <div className="summary-card">
                <h4>{hotel}</h4>
                <p>{room}</p>
                <ul>
                  <li>
                    <span>Guest</span>
                    <strong>{guest}</strong>
                  </li>
                  <li>
                    <span>Duration</span>
                    <strong>
                      {nights} night{nights > 1 ? "s" : ""}
                    </strong>
                  </li>
                  <li>
                    <span>Method</span>
                    <strong>{method}</strong>
                  </li>
                </ul>
              </div>

              <div className="total-box">
                <span>Total payable</span>
                <strong>{formatCurrency(amount)}</strong>
              </div>
            </aside>
          </section>
        </div>
      </main>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="customer-shell">
          <main className="page-content">
            <div className="page-shell">
              <p className="eyebrow">Loading payment summary…</p>
            </div>
          </main>
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}


