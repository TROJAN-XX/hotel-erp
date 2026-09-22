import Link from "next/link";
import HospitalityOverview from "../components/HospitalityOverview";

export default function HomePage() {
  return (
    <div className="customer-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">Asteria</div>
            <div className="brand-subtitle">Hotel & Experiences</div>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          {[
            ["/", "Home"],
            ["/rooms", "Rooms"],
            ["/restaurants", "Dining"],
            ["/tours", "Tours"],
            ["/transport", "Travel"],
            ["/wellness", "Wellness"],
            ["/packages", "Packages"],
            ["/trips", "My Trips"],
            ["/profile", "Profile"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="nav-link">
              {label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/login" className="button button-secondary">
            Login
          </Link>
          <Link href="/booking" className="button button-primary">
            Book Now
          </Link>
        </div>
      </header>

      <main className="page-content">
        <div className="customer-page">
          <section className="hero-banner">
            <div className="hero-copy">
              <span className="eyebrow">Curated hospitality experiences</span>
              <h1>Luxury stays, memorable journeys & wellness escapes</h1>
              <p>
                Discover refined stays, destination tours, dining, spa rituals
                and tailored packages designed for your ideal getaway.
              </p>
              <div className="hero-actions">
                <Link href="/booking" className="button button-primary">
                  Book a stay
                </Link>
                <Link href="/packages" className="button button-secondary">
                  View packages
                </Link>
              </div>
            </div>

            <div className="booking-widget card-panel">
              <h3>Search your next escape</h3>
              <div className="booking-grid">
                <label>
                  Destination
                  <input type="text" value="Coimbatore" readOnly />
                </label>
                <label>
                  Check-in
                  <input type="date" />
                </label>
                <label>
                  Check-out
                  <input type="date" />
                </label>
                <label>
                  Adults
                  <input type="number" value={2} readOnly />
                </label>
                <label>
                  Children
                  <input type="number" value={1} readOnly />
                </label>
                <label>
                  Rooms
                  <input type="number" value={1} readOnly />
                </label>
              </div>
              <div className="action-row">
                <Link href="/booking" className="button button-primary">
                  Search Rooms
                </Link>
                <Link href="/packages" className="button button-secondary">
                  Explore Packages
                </Link>
              </div>
            </div>
          </section>

          <section className="stats-grid">
            <div className="stat-card gold">
              <span>Today’s Revenue</span>
              <strong>₹3.4L</strong>
            </div>
            <div className="stat-card">
              <span>Check-ins</span>
              <strong>42</strong>
            </div>
            <div className="stat-card">
              <span>Occupancy</span>
              <strong>78%</strong>
            </div>
            <div className="stat-card">
              <span>Pending Payments</span>
              <strong>₹96K</strong>
            </div>
          </section>

          <HospitalityOverview />
        </div>
      </main>

      <footer className="site-footer">
        <div>
          <div className="brand-name">Asteria</div>
          <p>
            Luxury stays, journeys, dining and wellness curated for
            unforgettable escapes.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li>Rooms</li>
            <li>Tours</li>
            <li>Packages</li>
            <li>Wellness</li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>+91 98765 43210</li>
            <li>hello@asteria.in</li>
            <li>Coimbatore, Tamil Nadu</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
