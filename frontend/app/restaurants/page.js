import Link from "next/link";

const dining = [
  { name: "Azure Terrace", desc: "Fine dining overlooking the pool" },
  { name: "The Ember Club", desc: "Signature grill & bar experiences" },
  { name: "Café Mosaic", desc: "Casual breakfast and brunch" },
];

export default function RestaurantsPage() {
  return (
    <div className="customer-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">Asteria</div>
            <div className="brand-subtitle">Dining</div>
          </div>
        </div>
        <nav className="main-nav">
          {[
            ["/", "Home"],
            ["/rooms", "Rooms"],
            ["/restaurants", "Dining"],
            ["/packages", "Packages"],
            ["/profile", "Profile"],
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
              <span className="eyebrow">Culinary</span>
              <h2>Dining experiences</h2>
            </div>
          </div>
          <div className="card-grid three-up">
            {dining.map((item) => (
              <div key={item.name} className="card-panel room-card">
                <div className="room-image placeholder-image" />
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <button className="button button-primary" type="button">
                  Book table
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
