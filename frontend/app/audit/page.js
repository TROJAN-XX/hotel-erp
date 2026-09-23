"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchApi, normalizeListResponse } from "../../lib/api";

const fallbackAudit = [
  {
    id: 1,
    actor_name: "Admin User",
    action: "created_booking",
    entity_type: "booking",
    details: "Created a booking for guest check-in.",
    severity: "info",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    actor_name: "Manager User",
    action: "updated_room_rate",
    entity_type: "room",
    details: "Updated room pricing for deluxe category.",
    severity: "warning",
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
];

const severityTone = {
  info: "success",
  warning: "warning",
  error: "critical",
};

const formatServiceText = (value) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : "Operational";

export default function AuditPage() {
  const [events, setEvents] = useState(fallbackAudit);
  const [summary, setSummary] = useState({
    total_events: 0,
    by_severity: { info: 0, warning: 0, error: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadAuditData() {
      try {
        const [logsResponse, summaryResponse] = await Promise.allSettled([
          fetchApi("/audit/"),
          fetchApi("/audit/summary/"),
        ]);

        if (!isMounted) return;

        const logList = normalizeListResponse(
          logsResponse.status === "fulfilled" ? logsResponse.value : [],
        );
        const auditSummary =
          summaryResponse.status === "fulfilled" ? summaryResponse.value : {};

        setEvents(logList.length ? logList : fallbackAudit);
        setSummary(
          auditSummary && Object.keys(auditSummary).length
            ? auditSummary
            : {
                total_events: logList.length || fallbackAudit.length,
                by_severity: { info: 1, warning: 1, error: 0 },
              },
        );
      } catch (error) {
        if (isMounted) {
          setEvents(fallbackAudit);
          setSummary({
            total_events: fallbackAudit.length,
            by_severity: { info: 1, warning: 1, error: 0 },
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadAuditData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="customer-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">Asteria</div>
            <div className="brand-subtitle">Audit trail</div>
          </div>
        </div>
        <nav className="main-nav">
          {[
            ["/", "Home"],
            ["/admin", "Admin"],
            ["/audit", "Audit"],
            ["/reports", "Reports"],
            ["/notifications", "Alerts"],
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
              <span className="eyebrow">Governance</span>
              <h2>Operational audit log</h2>
            </div>
            <button type="button" className="button button-primary">
              Export log
            </button>
          </div>

          <section className="notification-grid">
            <div className="card-panel report-card">
              <span className="eyebrow">Total events</span>
              <strong>{summary.total_events || events.length}</strong>
              <span className="pill" style={{ marginTop: 12 }}>
                Last 7 days
              </span>
            </div>
            <div className="card-panel report-card">
              <span className="eyebrow">Info</span>
              <strong>{summary.by_severity?.info ?? 0}</strong>
              <span className="pill" style={{ marginTop: 12 }}>
                Routine actions
              </span>
            </div>
            <div className="card-panel report-card">
              <span className="eyebrow">Warnings</span>
              <strong>{summary.by_severity?.warning ?? 0}</strong>
              <span className="pill" style={{ marginTop: 12 }}>
                Needs review
              </span>
            </div>
            <div className="card-panel report-card">
              <span className="eyebrow">Errors</span>
              <strong>{summary.by_severity?.error ?? 0}</strong>
              <span className="pill" style={{ marginTop: 12 }}>
                Critical issues
              </span>
            </div>
          </section>

          <section className="notification-panel-grid">
            <div className="card-panel padded-box">
              <span className="eyebrow">Recent trail</span>
              <h3>Latest operations</h3>
              <ul className="notification-list" style={{ marginTop: 16 }}>
                {events.map((entry) => (
                  <li key={`${entry.id}-${entry.created_at}`}>
                    <div className="notification-item">
                      <div>
                        <strong>{entry.actor_name}</strong>
                        <p style={{ margin: "6px 0 0", color: "var(--muted)" }}>
                          {formatServiceText(entry.entity_type)} •{" "}
                          {entry.action}
                        </p>
                        <p style={{ margin: "4px 0 0", color: "var(--muted)" }}>
                          {entry.details}
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span
                          className={`badge ${severityTone[entry.severity] || "success"}`}
                        >
                          {entry.severity || "info"}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-panel padded-box">
              <span className="eyebrow">Policy</span>
              <h3>Compliance watch</h3>
              <ul className="alert-list" style={{ marginTop: 18 }}>
                <li>
                  Every booking, refund, and inventory adjustment is logged.
                </li>
                <li>
                  High-risk actions require manager review before closure.
                </li>
                <li>
                  Audit exports remain available for internal compliance checks.
                </li>
              </ul>
            </div>
          </section>

          {loading ? <p className="eyebrow">Loading audit trail…</p> : null}
        </div>
      </main>
    </div>
  );
}
