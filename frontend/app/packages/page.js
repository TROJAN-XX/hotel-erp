import Link from "next/link";

const packageList = [
  {
    name: "Weekend Escape",
    price: "₹18,500",
    include: "2 nights + breakfast + transfers",
  },
  {
    name: "Wellness Retreat",
    price: "₹22,400",
    include: "Spa, yoga and curated dining",
  },
  {
    name: "Heritage Trail",
    price: "₹27,800",
    include: "Tours, local dining and stay",
  },
];

export default function PackagesPage() {
  return (
    <div className="customer-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">Asteria</div>
            <div className="brand-subtitle">Packages</div>
          </div>
        </div>
        <nav className="main-nav">
          {[
            ["/", "Home"],
            ["/rooms", "Rooms"],
            ["/tours", "Tours"],
            ["/wellness", "Wellness"],
            ["/packages", "Packages"],
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
              <span className="eyebrow">Tailored</span>
              <h2>Signature packages</h2>
            </div>
          </div>
          <div className="card-grid three-up">
            {packageList.map((pkg) => (
              <div key={pkg.name} className="card-panel room-card">
                <div className="room-image placeholder-image" />
                <h3>{pkg.name}</h3>
                <p>{pkg.include}</p>
                <div className="card-row">
                  <strong>{pkg.price}</strong>
                  <button className="button button-primary" type="button">
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
