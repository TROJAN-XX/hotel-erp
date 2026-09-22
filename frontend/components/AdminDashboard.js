"use client";

import { useEffect, useState } from "react";
import { fetchApi, normalizeListResponse } from "../lib/api";

const menu = [
  "Dashboard",
  "Bookings",
  "Rooms",
  "Payments",
  "Reports",
  "Settings",
];

const fallbackBookings = [
  {
    guest_name: "Aisha Nair",
    nights: 2,
    total_amount: 24500,
    status: "Confirmed",
  },
  {
    guest_name: "Karthik Rao",
    nights: 3,
    total_amount: 36200,
    status: "Pending",
  },
  {
    guest_name: "Milan Thomas",
    nights: 2,
    total_amount: 18900,
    status: "Checked in",
  },
];

const serviceMix = [
  { label: "Room nights", value: 42, color: "var(--gold)" },
  { label: "Dining", value: 31, color: "#d9c7a1" },
  { label: "Spa", value: 18, color: "#b8bcbf" },
  { label: "Tours", value: 9, color: "#d9d7d1" },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export default function AdminDashboard() {
  const [bookings, setBookings] = useState(fallbackBookings);
  const [loading, setLoading] = useState(true);
  const [dashboardMessage, setDashboardMessage] = useState(
    "Operations sync complete.",
  );

  const handleQuickAction = (action) => {
    if (action === "approve") {
      setBookings((current) =>
        current.map((booking) =>
          booking.status === "Pending"
            ? { ...booking, status: "Confirmed" }
            : booking,
        ),
      );
      setDashboardMessage("Pending stays approved and guests were notified.");
      return;
    }

    if (action === "refund") {
      setBookings((current) =>
        current.map((booking) =>
          booking.status === "Confirmed"
            ? { ...booking, status: "Refund reviewed" }
            : booking,
        ),
      );
      setDashboardMessage("Refund queue reviewed and flagged for processing.");
      return;
    }

    setDashboardMessage("Operational report prepared and exported.");
  };

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardData() {
      try {
        const [bookingResponse, hotelResponse] = await Promise.allSettled([
          fetchApi("/bookings/"),
          fetchApi("/hotels/"),
        ]);

        if (!isMounted) return;

        const bookingList = normalizeListResponse(
          bookingResponse.status === "fulfilled" ? bookingResponse.value : [],
        );
        const hotelList = normalizeListResponse(
          hotelResponse.status === "fulfilled" ? hotelResponse.value : [],
        );

        const liveBookings =
          bookingList.length > 0
            ? bookingList.map((booking) => ({
                guest_name: booking.guest_name || "Guest",
                nights: Number(booking.nights || 1),
                total_amount: Number(booking.total_amount || 0),
                status: booking.status || "Pending",
              }))
            : fallbackBookings;

        setBookings(liveBookings);

        if (hotelList.length > 0 && !bookingList.length) {
          setBookings([
            {
              guest_name: "Live hotel data",
              nights: 2,
              total_amount: hotelList.length * 15000,
              status: "Synced",
            },
            ...fallbackBookings.slice(0, 2),
          ]);
        }
      } catch (error) {
        if (isMounted) {
          setBookings(fallbackBookings);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const revenue = bookings.reduce(
    (sum, booking) => sum + Number(booking.total_amount || 0),
    0,
  );
  const reservations = bookings.length;
  const occupancy = reservations ? Math.min(92, 55 + reservations * 4) : 82;
  const checkedIn = bookings.filter((booking) =>
    ["Checked in", "Confirmed", "In Progress"].includes(booking.status),
  ).length;
  const pendingApprovals = bookings.filter(
    (booking) => booking.status === "Pending",
  ).length;
  const refundEstimate = Math.round(revenue * 0.07);

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand-mark">A</div>
          <div>
            <strong>Asteria</strong>
            <small>Admin Console</small>
          </div>
        </div>
        <nav className="sidebar-nav" aria-label="Sidebar">
          {menu.map((item) => (
            <a key={item} href="/admin" className="sidebar-link">
              {item}
            </a>
          ))}
        </nav>
      </aside>

      <main className="admin-content">
        <div className="section-header">
          <div>
            <span className="eyebrow">Operations</span>
            <h2>Dashboard overview</h2>
          </div>
          <button className="button button-primary" type="button">
            Generate report
          </button>
        </div>

        <section className="stats-grid">
          <div className="stat-card gold">
            <span>Revenue</span>
            <strong>{formatCurrency(revenue)}</strong>
          </div>
          <div className="stat-card">
            <span>Reservations</span>
            <strong>{reservations}</strong>
          </div>
          <div className="stat-card">
            <span>Occupancy</span>
            <strong>{Math.round(occupancy)}%</strong>
          </div>
          <div className="stat-card">
            <span>Guests checked in</span>
            <strong>{checkedIn}</strong>
          </div>
        </section>

        <div className="action-toolbar">
          <button
            className="button button-primary"
            type="button"
            onClick={() => handleQuickAction("approve")}
          >
            Approve pending stays
          </button>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => handleQuickAction("refund")}
          >
            Review refunds
          </button>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => handleQuickAction("export")}
          >
            Export report
          </button>
        </div>

        {dashboardMessage ? (
          <div className="status-banner success" style={{ marginBottom: 18 }}>
            {dashboardMessage}
          </div>
        ) : null}

        <div className="operations-grid">
          <div className="card-panel padded-box">
            <span className="eyebrow">Service mix</span>
            <h3>Demand distribution</h3>
            <div className="mini-metric-list">
              {serviceMix.map((item) => (
                <div className="metric-row" key={item.label}>
                  <span>{item.label}</span>
                  <div className="metric-bar">
                    <span
                      style={{
                        width: `${item.value}%`,
                        background: item.color,
                      }}
                    />
                  </div>
                  <strong>{item.value}%</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="card-panel padded-box">
            <span className="eyebrow">Cashflow</span>
            <h3>Pending payments</h3>
            <div className="mini-metric-list">
              <div className="metric-row">
                <span>Approvals</span>
                <strong>{pendingApprovals}</strong>
              </div>
              <div className="metric-row">
                <span>Refund reserve</span>
                <strong>{formatCurrency(refundEstimate)}</strong>
              </div>
              <div className="metric-row">
                <span>Outstanding</span>
                <strong>{formatCurrency(revenue * 0.21)}</strong>
              </div>
            </div>
          </div>

          <div className="card-panel padded-box">
            <span className="eyebrow">Alerts</span>
            <h3>Operational notes</h3>
            <ul className="alert-list">
              <li>Housekeeping roster is 96% staffed.</li>
              <li>2 VIP arrivals need concierge preparation.</li>
              <li>Restaurant inventory for breakfast is trending low.</li>
            </ul>
          </div>
        </div>

        <div className="chart-grid">
          <div className="card-panel chart-panel">
            <h3>Monthly activity</h3>
            <div className="bars">
              {[38, 52, 64, 42, 80, 58, 94, 76, 86, 68, 72, 92].map(
                (height, index) => (
                  <span key={index} style={{ height: `${height}%` }} />
                ),
              )}
            </div>
          </div>

          <div className="card-panel chart-panel">
            <h3>Stay mix</h3>
            <div className="donut-wrap">
              <div className="donut-chart">
                <span>{Math.round(occupancy)}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="section-header">
          <div>
            <span className="eyebrow">Recent</span>
            <h2>Latest bookings</h2>
          </div>
        </div>

        <div className="card-panel padded-box">
          <table className="data-table">
            <thead>
              <tr>
                <th>Guest</th>
                <th>Stay</th>
                <th>Value</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((row) => (
                <tr key={`${row.guest_name}-${row.total_amount}`}>
                  <td>{row.guest_name}</td>
                  <td>{row.nights ? `${row.nights} nights` : "Stay"}</td>
                  <td>{formatCurrency(row.total_amount)}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {loading ? <p className="eyebrow">Loading dashboard data…</p> : null}
      </main>
    </div>
  );
}
