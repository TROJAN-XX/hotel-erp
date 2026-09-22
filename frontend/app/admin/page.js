import Link from "next/link";

const menu = [
  "Dashboard",
  "Bookings",
  "Rooms",
  "Payments",
  "Reports",
  "Settings",
];
const bookingRows = [
  {
    guest: "Aisha Nair",
    stay: "2 nights",
    value: "₹24,500",
    status: "Confirmed",
  },
  {
    guest: "Karthik Rao",
    stay: "Weekend package",
    value: "₹36,200",
    status: "Pending",
  },
  {
    guest: "Milan Thomas",
    stay: "Spa + stay",
    value: "₹18,900",
    status: "Checked in",
  },
];

export default function AdminDashboardPage() {
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
            <Link key={item} href="/admin" className="sidebar-link">
              {item}
            </Link>
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
            <strong>₹8.6L</strong>
          </div>
          <div className="stat-card">
            <span>Reservations</span>
            <strong>126</strong>
          </div>
          <div className="stat-card">
            <span>Occupancy</span>
            <strong>82%</strong>
          </div>
          <div className="stat-card">
            <span>Guests checked in</span>
            <strong>48</strong>
          </div>
        </section>

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
                <span>78%</span>
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
              {bookingRows.map((row) => (
                <tr key={row.guest}>
                  <td>{row.guest}</td>
                  <td>{row.stay}</td>
                  <td>{row.value}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
