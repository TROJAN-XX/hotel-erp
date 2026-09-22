import Link from "next/link";

const trips = [
  { title: "Kerala Escape", date: "12-15 Sep", status: "Confirmed" },
  { title: "Wellness Weekend", date: "18-20 Sep", status: "Pending" },
  { title: "City Heritage Tour", date: "22 Sep", status: "Booked" },
];

export default function TripsPage() {
  return (
    <div className="customer-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">Asteria</div>
            <div className="brand-subtitle">Trips</div>
          </div>
        </div>
        <nav className="main-nav">
          {[
            ["/", "Home"],
            ["/rooms", "Rooms"],
            ["/packages", "Packages"],
            ["/tours", "Tours"],
            ["/trips", "Trips"],
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
              <span className="eyebrow">Manage</span>
              <h2>My upcoming trips</h2>
            </div>
          </div>
          <div className="package-list">
            {trips.map((trip) => (
              <div key={trip.title} className="list-item-row card-panel">
                <div>
                  <h3>{trip.title}</h3>
                  <p>{trip.date}</p>
                </div>
                <span className="pill">{trip.status}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
