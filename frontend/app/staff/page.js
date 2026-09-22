import Link from "next/link";

const staffOverview = [
  { label: "Active team", value: "124", tone: "success" },
  { label: "On duty today", value: "38", tone: "warning" },
  { label: "Open shifts", value: "06", tone: "critical" },
  { label: "Compliance", value: "98%", tone: "success" },
];

const staffRows = [
  { name: "Priya Menon", role: "Front desk lead", shift: "Morning", status: "On duty" },
  { name: "Arjun Nair", role: "Housekeeping supervisor", shift: "Morning", status: "On duty" },
  { name: "Rhea Shah", role: "Restaurant manager", shift: "Evening", status: "Break" },
  { name: "Vikram Das", role: "Wellness therapist", shift: "Evening", status: "On duty" },
  { name: "Sana Khan", role: "Tour coordinator", shift: "Flexible", status: "Remote" },
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
            {staffOverview.map((item) => (
              <div key={item.label} className="card-panel staff-card">
                <span className="eyebrow">{item.label}</span>
                <strong>{item.value}</strong>
                <span className={`badge ${item.tone}`} style={{ marginTop: 12 }}>
                  {item.tone === "success" ? "Stable" : item.tone === "warning" ? "Monitor" : "Action"}
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
                  {staffRows.map((member) => (
                    <tr key={member.name}>
                      <td>{member.name}</td>
                      <td>{member.role}</td>
                      <td>{member.shift}</td>
                      <td>
                        <span
                          className={`badge ${
                            member.status === "On duty" ? "success" : member.status === "Break" ? "warning" : "critical"
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
        </div>
      </main>
    </div>
  );
}
