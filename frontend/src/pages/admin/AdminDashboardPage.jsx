import StatCard from "../../components/common/StatCard";

export default function AdminDashboardPage() {
  return (
    <div className="admin-page">
      <div className="section-header">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h2>Hospitality overview</h2>
        </div>
      </div>

      <div className="stats-grid admin-stats">
        <StatCard label="Today’s Revenue" value="₹3.4L" tone="gold" />
        <StatCard label="Check-ins" value="42" />
        <StatCard label="Check-outs" value="19" />
        <StatCard label="Occupancy" value="78%" />
        <StatCard label="Available Rooms" value="28" />
        <StatCard label="Pending Payments" value="₹96K" />
      </div>

      <div className="chart-grid">
        <div className="card-panel chart-panel">
          <h3>Revenue trend</h3>
          <div className="bars">
            <span style={{ height: "38%" }} />
            <span style={{ height: "52%" }} />
            <span style={{ height: "60%" }} />
            <span style={{ height: "50%" }} />
            <span style={{ height: "73%" }} />
            <span style={{ height: "84%" }} />
            <span style={{ height: "92%" }} />
          </div>
        </div>
        <div className="card-panel chart-panel">
          <h3>Occupancy</h3>
          <div className="donut-wrap">
            <div className="donut-chart">
              <span>78%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
