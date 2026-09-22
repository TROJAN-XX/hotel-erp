import Link from "next/link";

const inventoryOverview = [
  { label: "Total stock units", value: "8,240", tone: "success" },
  { label: "Low stock alerts", value: "11", tone: "warning" },
  { label: "Pending reorders", value: "07", tone: "critical" },
  { label: "Turnover rate", value: "94%", tone: "success" },
];

const stockRows = [
  {
    item: "Fresh linens",
    status: "Healthy",
    count: "620 units",
    reorder: "No",
  },
  {
    item: "Breakfast ingredients",
    status: "Low",
    count: "84 units",
    reorder: "Yes",
  },
  { item: "Spa oils", status: "Healthy", count: "240 units", reorder: "No" },
  {
    item: "Housekeeping consumables",
    status: "Critical",
    count: "52 units",
    reorder: "Yes",
  },
  { item: "Bar spirits", status: "Healthy", count: "310 units", reorder: "No" },
];

const movementLog = [
  { label: "Rooms received", value: "+42" },
  { label: "Dining issued", value: "-18" },
  { label: "Spa stock returned", value: "+9" },
  { label: "Bar transfers", value: "-7" },
];

export default function InventoryPage() {
  return (
    <div className="customer-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">Asteria</div>
            <div className="brand-subtitle">Inventory</div>
          </div>
        </div>
        <nav className="main-nav">
          {[
            ["/", "Home"],
            ["/admin", "Admin"],
            ["/inventory", "Inventory"],
            ["/reports", "Reports"],
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
              <h2>Inventory control</h2>
            </div>
            <button type="button" className="button button-primary">
              Create reorder
            </button>
          </div>

          <section className="inventory-grid">
            {inventoryOverview.map((item) => (
              <div key={item.label} className="card-panel inventory-card">
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

          <section className="inventory-panel-grid">
            <div className="card-panel padded-box">
              <span className="eyebrow">Stock view</span>
              <h3>Current inventory status</h3>
              <table className="stock-table" style={{ marginTop: 16 }}>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Status</th>
                    <th>Quantity</th>
                    <th>Reorder</th>
                  </tr>
                </thead>
                <tbody>
                  {stockRows.map((row) => (
                    <tr key={row.item}>
                      <td>{row.item}</td>
                      <td>
                        <span
                          className={`badge ${
                            row.status === "Healthy"
                              ? "success"
                              : row.status === "Low"
                                ? "warning"
                                : "critical"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td>{row.count}</td>
                      <td>{row.reorder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card-panel padded-box">
              <span className="eyebrow">Movement</span>
              <h3>Daily adjustments</h3>
              <ul className="alert-list" style={{ marginTop: 18 }}>
                {movementLog.map((entry) => (
                  <li key={entry.label}>
                    <div className="notification-item">
                      <span>{entry.label}</span>
                      <strong>{entry.value}</strong>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
