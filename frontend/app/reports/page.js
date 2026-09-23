"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchApi, normalizeListResponse } from "../../lib/api";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const fallbackReports = [
  {
    title: "Monthly overview",
    report_type: "monthly",
    total_revenue: 486000,
    total_bookings: 128,
    summary: "Strong occupancy and repeat guest demand.",
    generated_at: new Date().toISOString(),
  },
  {
    title: "Last 30 days",
    report_type: "weekly",
    total_revenue: 332000,
    total_bookings: 92,
    summary: "Dining and wellness demand remain elevated.",
    generated_at: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
];

export default function ReportsPage() {
  const [reports, setReports] = useState(fallbackReports);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadReports() {
      try {
        const response = await fetchApi("/reports/sales/");
        if (!isMounted) return;
        const liveReports = normalizeListResponse(response);
        setReports(liveReports.length ? liveReports : fallbackReports);
      } catch (error) {
        if (isMounted) setReports(fallbackReports);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadReports();
    return () => {
      isMounted = false;
    };
  }, []);

  const revenueTotal = reports.reduce(
    (sum, item) => sum + Number(item.total_revenue || 0),
    0,
  );
  const bookingTotal = reports.reduce(
    (sum, item) => sum + Number(item.total_bookings || 0),
    0,
  );

  const reportMetrics = [
    { label: "Revenue", value: formatCurrency(revenueTotal), change: "+12.4%" },
    { label: "Occupancy", value: "86%", change: "+5.1%" },
    { label: "Guest score", value: "4.8/5", change: "+0.3" },
    {
      label: "Total bookings",
      value: String(bookingTotal || 128),
      change: "+18.2%",
    },
  ];

  const salesRows = [
    { name: "Rooms", value: formatCurrency(revenueTotal * 0.44), share: "44%" },
    {
      name: "Dining",
      value: formatCurrency(revenueTotal * 0.25),
      share: "25%",
    },
    {
      name: "Spa & wellness",
      value: formatCurrency(revenueTotal * 0.16),
      share: "16%",
    },
    {
      name: "Tours & transport",
      value: formatCurrency(revenueTotal * 0.12),
      share: "12%",
    },
    {
      name: "Packages",
      value: formatCurrency(revenueTotal * 0.03),
      share: "3%",
    },
  ];

  const reportHistory = reports.slice(0, 4).map((row) => ({
    period: row.title || "Latest report",
    type: row.report_type || "Monthly",
    status: row.summary ? "Healthy" : "Positive",
  }));

  return (
    <div className="customer-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">Asteria</div>
            <div className="brand-subtitle">Reports</div>
          </div>
        </div>
        <nav className="main-nav">
          {[
            ["/", "Home"],
            ["/admin", "Admin"],
            ["/reports", "Reports"],
            ["/notifications", "Notifications"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="nav-link">
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="page-content">
        <div className="page-shell">
          <div className="section-header">
            <div>
              <span className="eyebrow">Performance</span>
              <h2>Operations snapshot</h2>
            </div>
            <button type="button" className="button button-primary">
              Export report
            </button>
          </div>

          <section className="report-grid">
            {reportMetrics.map((metric) => (
              <div key={metric.label} className="card-panel report-card">
                <span className="eyebrow">{metric.label}</span>
                <strong>{metric.value}</strong>
                <span className="pill" style={{ marginTop: 12 }}>
                  {metric.change}
                </span>
              </div>
            ))}
          </section>

          <section className="report-panel-grid">
            <div className="card-panel padded-box">
              <span className="eyebrow">Revenue mix</span>
              <h3>Service contribution</h3>
              <table className="report-table" style={{ marginTop: 16 }}>
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Value</th>
                    <th>Share</th>
                  </tr>
                </thead>
                <tbody>
                  {salesRows.map((row) => (
                    <tr key={row.name}>
                      <td>{row.name}</td>
                      <td>{row.value}</td>
                      <td>{row.share}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card-panel padded-box">
              <span className="eyebrow">Forecast</span>
              <h3>Operational outlook</h3>
              <ul className="alert-list" style={{ marginTop: 18 }}>
                <li>Room demand remains above target in the next 2 weeks.</li>
                <li>Weekend dining reservations are trending 18% higher.</li>
                <li>Wellness bundles are driving repeat bookings.</li>
              </ul>
            </div>
          </section>

          <div className="section-header" style={{ marginTop: 28 }}>
            <div>
              <span className="eyebrow">Archive</span>
              <h2>Recent report views</h2>
            </div>
          </div>

          <div className="card-panel padded-box">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Report type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reportHistory.map((row) => (
                  <tr key={`${row.period}-${row.type}`}>
                    <td>{row.period}</td>
                    <td>{row.type}</td>
                    <td>
                      <span className="badge success">{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {loading ? <p className="eyebrow">Loading reports…</p> : null}
        </div>
      </main>
    </div>
  );
}
