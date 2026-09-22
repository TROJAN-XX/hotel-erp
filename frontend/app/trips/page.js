"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const initialTrips = [
  {
    id: 1,
    title: "Kerala Escape",
    date: "12-15 Sep",
    status: "Confirmed",
    amount: 24500,
    type: "Resort stay + spa",
  },
  {
    id: 2,
    title: "Wellness Weekend",
    date: "18-20 Sep",
    status: "Pending",
    amount: 18200,
    type: "Yoga + Ayurvedic care",
  },
  {
    id: 3,
    title: "City Heritage Tour",
    date: "22 Sep",
    status: "Booked",
    amount: 9800,
    type: "Guided tour package",
  },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export default function TripsPage() {
  const [trips, setTrips] = useState(initialTrips);

  const summary = useMemo(() => {
    const total = trips.reduce((sum, trip) => sum + Number(trip.amount || 0), 0);
    const upcoming = trips.filter((trip) =>
      ["Confirmed", "Pending", "Booked"].includes(trip.status),
    ).length;
    const pendingRefunds = trips.filter((trip) => trip.status === "Refund requested").length;

    return { total, upcoming, pendingRefunds };
  }, [trips]);

  const handleStatusChange = (tripId, action) => {
    setTrips((current) =>
      current.map((trip) => {
        if (trip.id !== tripId) return trip;

        if (action === "reschedule") {
          return {
            ...trip,
            status: "Rescheduled",
            date: "26-29 Sep",
          };
        }

        if (action === "cancel") {
          return {
            ...trip,
            status: "Cancelled",
            date: "Cancelled",
          };
        }

        return {
          ...trip,
          status: "Refund requested",
        };
      }),
    );
  };

  return (
    <div className="customer-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">Asteria</div>
            <div className="brand-subtitle">Trips</div>
          </div>
        </div>
        <nav className="main-nav">
          {[
            ["/", "Home"],
            ["/rooms", "Rooms"],
            ["/packages", "Packages"],
            ["/tours", "Tours"],
            ["/trips", "Trips"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="nav-link">
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="page-content">
        <div className="page-shell trip-management-shell">
          <div className="section-header">
            <div>
              <span className="eyebrow">Manage</span>
              <h2>My upcoming trips</h2>
            </div>
          </div>

          <section className="trip-summary-grid">
            <div className="card-panel trip-summary-card">
              <span className="eyebrow">Trips</span>
              <strong>{summary.upcoming}</strong>
              <span>Upcoming bookings</span>
            </div>
            <div className="card-panel trip-summary-card">
              <span className="eyebrow">Value</span>
              <strong>{formatCurrency(summary.total)}</strong>
              <span>Current trip value</span>
            </div>
            <div className="card-panel trip-summary-card">
              <span className="eyebrow">Refunds</span>
              <strong>{summary.pendingRefunds}</strong>
              <span>Pending refund requests</span>
            </div>
          </section>

          <div className="trip-list">
            {trips.map((trip) => (
              <div key={trip.id} className="card-panel trip-card">
                <div className="trip-card-header">
                  <div>
                    <span className="eyebrow">{trip.type}</span>
                    <h3>{trip.title}</h3>
                  </div>
                  <span className="pill trip-pill">{trip.status}</span>
                </div>

                <div className="trip-meta-row">
                  <div>
                    <span className="meta-label">Dates</span>
                    <p>{trip.date}</p>
                  </div>
                  <div>
                    <span className="meta-label">Amount</span>
                    <p>{formatCurrency(trip.amount)}</p>
                  </div>
                </div>

                <div className="trip-actions">
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => handleStatusChange(trip.id, "reschedule")}
                  >
                    Reschedule
                  </button>
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => handleStatusChange(trip.id, "refund")}
                  >
                    Request refund
                  </button>
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={() => handleStatusChange(trip.id, "cancel")}
                  >
                    Cancel trip
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
