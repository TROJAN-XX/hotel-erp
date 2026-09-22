import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="customer-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">Asteria</div>
            <div className="brand-subtitle">My profile</div>
          </div>
        </div>
        <nav className="main-nav">
          {[
            ["/", "Home"],
            ["/rooms", "Rooms"],
            ["/packages", "Packages"],
            ["/trips", "Trips"],
            ["/profile", "Profile"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="nav-link">
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="page-content">
        <div className="page-shell profile-grid">
          <div className="card-panel padded-box">
            <span className="eyebrow">Account</span>
            <h2>Rohit Menon</h2>
            <p>rohit@asteria.in</p>
            <p>Member since 2023</p>
            <button className="button button-primary" type="button">
              Edit profile
            </button>
          </div>
          <div className="card-panel padded-box">
            <span className="eyebrow">Loyalty</span>
            <h2>Gold member</h2>
            <p>4 upcoming stays • 12 reward points</p>
            <button className="button button-secondary" type="button">
              View rewards
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
