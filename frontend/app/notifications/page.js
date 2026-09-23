"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchApi, normalizeListResponse } from "../../lib/api";

const fallbackAlerts = [
  {
    title: "VIP arrival checklist",
    detail:
      "Concierge team requested final room setup for Suite 204 by 4:30 PM.",
    time: "2 mins ago",
    level: "critical",
  },
  {
    title: "Refund review pending",
    detail: "2 refund cases need admin approval before the end of the day.",
    time: "18 mins ago",
    level: "warning",
  },
  {
    title: "New guest review",
    detail: "A guest left a 5-star review for spa and dining services.",
    time: "1 hour ago",
    level: "success",
  },
  {
    title: "Inventory update",
    detail:
      "Breakfast inventory has dropped below the recommended reorder threshold.",
    time: "3 hours ago",
    level: "warning",
  },
];

const formatRelativeTime = (dateString) => {
  if (!dateString) return "Just now";
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.max(1, Math.round(diffMs / 60000));
  if (minutes < 60) return `${minutes} mins ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
};

export default function NotificationsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadNotifications() {
      try {
        const response = await fetchApi("/notifications/logs/");
        if (!isMounted) return;
        const liveLogs = normalizeListResponse(response);
        setLogs(liveLogs.length ? liveLogs : []);
      } catch (error) {
        if (isMounted) setLogs([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadNotifications();
    return () => {
      isMounted = false;
    };
  }, []);

  const alerts = logs.length
    ? logs.slice(0, 4).map((log) => ({
        title: log.subject || `Notification for ${log.recipient || "guest"}`,
        detail: log.message || "Operational update received.",
        time: formatRelativeTime(log.created_at),
        level:
          log.status === "failed"
            ? "critical"
            : log.status === "queued"
              ? "warning"
              : "success",
      }))
    : fallbackAlerts;

  const urgentCount = logs.filter(
    (log) => log.status === "failed" || log.channel === "sms",
  ).length;
  const pendingCount = logs.filter((log) => log.status === "queued").length;
  const guestCount = logs.filter(
    (log) => log.recipient && log.recipient.toLowerCase().includes("guest"),
  ).length;
  const resolvedCount = logs.filter((log) => log.status === "sent").length;

  return (
    <div className="customer-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">Asteria</div>
            <div className="brand-subtitle">Notifications</div>
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
              <span className="eyebrow">Ops feed</span>
              <h2>Operational alerts</h2>
            </div>
            <button type="button" className="button button-primary">
              Broadcast update
            </button>
          </div>

          <section className="notification-grid">
            <div className="card-panel report-card">
              <span className="eyebrow">Urgent</span>
              <strong>{urgentCount || 3}</strong>
              <span className="pill" style={{ marginTop: 12 }}>
                Action needed
              </span>
            </div>
            <div className="card-panel report-card">
              <span className="eyebrow">Pending</span>
              <strong>{pendingCount || 12}</strong>
              <span className="pill" style={{ marginTop: 12 }}>
                Queued actions
              </span>
            </div>
            <div className="card-panel report-card">
              <span className="eyebrow">Guest updates</span>
              <strong>{guestCount || 21}</strong>
              <span className="pill" style={{ marginTop: 12 }}>
                Last 24h
              </span>
            </div>
            <div className="card-panel report-card">
              <span className="eyebrow">Resolved</span>
              <strong>{resolvedCount || 47}</strong>
              <span className="pill" style={{ marginTop: 12 }}>
                Today
              </span>
            </div>
          </section>

          <section className="notification-panel-grid">
            <div className="card-panel padded-box">
              <span className="eyebrow">Live feed</span>
              <h3>Recent notifications</h3>
              <ul className="notification-list" style={{ marginTop: 16 }}>
                {alerts.map((alert) => (
                  <li key={`${alert.title}-${alert.time}`}>
                    <div className="notification-item">
                      <div>
                        <strong>{alert.title}</strong>
                        <p style={{ margin: "6px 0 0", color: "var(--muted)" }}>
                          {alert.detail}
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span className={`badge ${alert.level}`}>
                          {alert.time}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-panel padded-box">
              <span className="eyebrow">Channels</span>
              <h3>Delivery status</h3>
              <ul className="alert-list" style={{ marginTop: 18 }}>
                <li>Email: 96% delivered</li>
                <li>SMS: 89% delivered</li>
                <li>WhatsApp: 93% delivered</li>
                <li>In-app: 99% delivered</li>
              </ul>
            </div>
          </section>

          {loading ? <p className="eyebrow">Loading notifications…</p> : null}
        </div>
      </main>
    </div>
  );
}
