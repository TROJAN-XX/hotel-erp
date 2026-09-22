import Link from "next/link";

const transport = [
  { name: "Airport Transfer", text: "Private pickup and drop" },
  { name: "Luxury Chauffeur", text: "Hourly premium car service" },
  { name: "Intercity Travel", text: "Curated destination rides" },
];

export default function TransportPage() {
  return (
    <div className="customer-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">Asteria</div>
            <div className="brand-subtitle">Transport</div>
          </div>
        </div>
        <nav className="main-nav">
          {[
            ["/", "Home"],
            ["/rooms", "Rooms"],
            ["/tours", "Tours"],
            ["/packages", "Packages"],
            ["/transport", "Transport"],
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
              <span className="eyebrow">Travel</span>
              <h2>Seamless transfers</h2>
            </div>
          </div>
          <div className="card-grid three-up">
            {transport.map((item) => (
              <div key={item.name} className="card-panel room-card">
                <div className="room-image placeholder-image" />
                <h3>{item.name}</h3>
                <p>{item.text}</p>
                <button className="button button-secondary" type="button">
                  Book service
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
