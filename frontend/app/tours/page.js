import Link from "next/link";

const tours = [
  { name: "Munnar Valley Circuit", duration: "Full day" },
  { name: "Cultural Heritage Walk", duration: "Half day" },
  { name: "Tea Estate Expedition", duration: "Day trip" },
];

export default function ToursPage() {
  return (
    <div className="customer-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">Asteria</div>
            <div className="brand-subtitle">Tours</div>
          </div>
        </div>
        <nav className="main-nav">
          {[
            ["/", "Home"],
            ["/rooms", "Rooms"],
            ["/packages", "Packages"],
            ["/transport", "Transport"],
            ["/wellness", "Wellness"],
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
              <span className="eyebrow">Experiences</span>
              <h2>Explore local adventures</h2>
            </div>
          </div>
          <div className="card-grid three-up">
            {tours.map((tour) => (
              <div key={tour.name} className="card-panel room-card">
                <div className="room-image placeholder-image" />
                <h3>{tour.name}</h3>
                <p>{tour.duration}</p>
                <button className="button button-secondary" type="button">
                  Reserve
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
