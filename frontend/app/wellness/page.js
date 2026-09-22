import Link from "next/link";

const wellness = [
  {
    name: "Signature Massage Therapy",
    desc: "60 minute deep relaxation therapy",
  },
  { name: "Detox Spa Ritual", desc: "Custom therapy with herbal-infused oils" },
  { name: "Yoga & Breathwork", desc: "Guided sunrise wellness session" },
];

export default function WellnessPage() {
  return (
    <div className="customer-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">Asteria</div>
            <div className="brand-subtitle">Wellness</div>
          </div>
        </div>
        <nav className="main-nav">
          {[
            ["/", "Home"],
            ["/rooms", "Rooms"],
            ["/packages", "Packages"],
            ["/tours", "Tours"],
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
              <span className="eyebrow">Healing</span>
              <h2>Luxury wellness experiences</h2>
            </div>
          </div>
          <div className="card-grid three-up">
            {wellness.map((item) => (
              <div key={item.name} className="card-panel room-card">
                <div className="room-image placeholder-image" />
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <button className="button button-primary" type="button">
                  Book session
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
