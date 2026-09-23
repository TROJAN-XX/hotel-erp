"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchApi, normalizeListResponse } from "../../lib/api";

const fallbackStaffOverview = [
  { label: "Active team", value: "124", tone: "success" },
  { label: "On duty today", value: "38", tone: "warning" },
  { label: "Open shifts", value: "06", tone: "critical" },
  { label: "Compliance", value: "98%", tone: "success" },
];

const fallbackStaffRows = [
  {
    name: "Priya Menon",
    role: "Front desk lead",
    shift: "Morning",
    status: "On duty",
  },
  {
    name: "Arjun Nair",
    role: "Housekeeping supervisor",
    shift: "Morning",
    status: "On duty",
  },
  {
    name: "Rhea Shah",
    role: "Restaurant manager",
    shift: "Evening",
    status: "Break",
  },
  {
    name: "Vikram Das",
    role: "Wellness therapist",
    shift: "Evening",
    status: "On duty",
  },
  {
    name: "Sana Khan",
    role: "Tour coordinator",
    shift: "Flexible",
    status: "Remote",
  },
];

const permissions = [
  { label: "Manager access", value: "Full" },
  { label: "Bookings", value: "Edit + approve" },
  { label: "Payments", value: "Review only" },
  { label: "Inventory", value: "Monitoring" },
  { label: "Wellness", value: "Edit" },
];

const shiftSummary = [
  { label: "Front office", value: "12 staff" },
  { label: "Housekeeping", value: "18 staff" },
  { label: "F&B", value: "15 staff" },
  { label: "Wellness", value: "9 staff" },
];

export default function StaffPage() {
  const [teamOverview, setTeamOverview] = useState(fallbackStaffOverview);
  const [teamRows, setTeamRows] = useState(fallbackStaffRows);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadStaffData() {
      try {
        const response = await fetchApi("/auth/staff/");
        if (!isMounted) return;
        const payload =
          response && typeof response === "object" ? response : {};
        const staffList = normalizeListResponse(payload.results || payload);

        if (staffList.length) {
          const mappedRows = staffList.map((member) => ({
            name:
              member.full_name ||
              `${member.first_name || ""} ${member.last_name || ""}`.trim() ||
              member.email,
            role: member.role
              ? member.role.charAt(0).toUpperCase() + member.role.slice(1)
              : "Staff",
            shift: member.is_active ? "Morning" : "Off duty",
            status: member.is_active ? "On duty" : "Offline",
          }));

          setTeamRows(mappedRows.length ? mappedRows : fallbackStaffRows);
          setTeamOverview([
            {
              label: "Active team",
              value: String(payload.active_staff ?? staffList.length),
              tone: "success",
            },
            {
              label: "On duty today",
              value: String(Math.min(staffList.length, 38)),
              tone: "warning",
            },
            {
              label: "Open shifts",
              value: String(payload.pending_shifts ?? 6).padStart(2, "0"),
              tone: "critical",
            },
            {
              label: "Compliance",
              value: `${payload.compliance ?? 98}%`,
              tone: "success",
            },
          ]);
        }
      } catch (error) {
        if (isMounted) {
          setTeamRows(fallbackStaffRows);
          setTeamOverview(fallbackStaffOverview);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadStaffData();
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
            <div className="brand-subtitle">People & access</div>
          </div>
        </div>
        <nav className="main-nav">
          {[
            ["/", "Home"],
            ["/admin", "Admin"],
            ["/staff", "Staff"],
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
              <span className="eyebrow">Operations</span>
              <h2>Staff management</h2>
            </div>
            <button type="button" className="button button-primary">
              Add team member
            </button>
          </div>

          <section className="staff-grid">
            {teamOverview.map((item) => (
              <div key={item.label} className="card-panel staff-card">
                <span className="eyebrow">{item.label}</span>
                <strong>{item.value}</strong>
                <span
                  className={`badge ${item.tone}`}
                  style={{ marginTop: 12 }}
                >
                  {item.tone === "success"
                    ? "Stable"
                    : item.tone === "warning"
                      ? "Monitor"
                      : "Action"}
                </span>
              </div>
            ))}
          </section>

          <section className="staff-panel-grid">
            <div className="card-panel padded-box">
              <span className="eyebrow">Roster</span>
              <h3>Team status</h3>
              <table className="staff-table" style={{ marginTop: 16 }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Shift</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {teamRows.map((member) => (
                    <tr key={member.name}>
                      <td>{member.name}</td>
                      <td>{member.role}</td>
                      <td>{member.shift}</td>
                      <td>
                        <span
                          className={`badge ${
                            member.status === "On duty"
                              ? "success"
                              : member.status === "Break"
                                ? "warning"
                                : "critical"
                          }`}
                        >
                          {member.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card-panel padded-box">
              <span className="eyebrow">Access</span>
              <h3>Permission map</h3>
              <div className="permission-list">
                {permissions.map((item) => (
                  <div key={item.label} className="permission-item">
                    <span>{item.label}</span>
                    <span className="pill">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="card-panel padded-box" style={{ marginTop: 24 }}>
            <span className="eyebrow">Coverage</span>
            <h3>Shift allocation</h3>
            <div className="feature-strip" style={{ marginTop: 18 }}>
              {shiftSummary.map((entry) => (
                <div key={entry.label} className="mini-card">
                  <span className="eyebrow">{entry.label}</span>
                  <strong>{entry.value}</strong>
                </div>
              ))}
            </div>
          </section>

          {loading ? <p className="eyebrow">Loading staff roster…</p> : null}
        </div>
      </main>
    </div>
  );
}
