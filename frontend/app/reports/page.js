import Link from "next/link";

const reportMetrics = [
  { label: "Revenue", value: "₹48.6L", change: "+12.4%" },
  { label: "Occupancy", value: "86%", change: "+5.1%" },
  { label: "Guest score", value: "4.8/5", change: "+0.3" },
  { label: "Refunds", value: "₹2.3L", change: "-1.8%" },
];

const salesRows = [
  { name: "Rooms", value: "₹21.4L", share: "44%" },
  { name: "Dining", value: "₹12.1L", share: "25%" },
  { name: "Spa & wellness", value: "₹7.8L", share: "16%" },
  { name: "Tours & transport", value: "₹5.7L", share: "12%" },
  { name: "Packages", value: "₹1.6L", share: "3%" },
];

const reportHistory = [
  { period: "This week", type: "Operational", status: "Healthy" },
  { period: "Last 30 days", type: "Revenue", status: "Rising" },
  { period: "This month", type: "Reservations", status: "Stable" },
  { period: "Q2 forecast", type: "Forecast", status: "Positive" },
];

export default function ReportsPage() {
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
                  <tr key={row.period}>
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
        </div>
      </main>
    </div>
  );
}
