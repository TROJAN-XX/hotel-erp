import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Rooms", to: "/rooms" },
  { label: "Dining", to: "/restaurants" },
  { label: "Tours", to: "/tours" },
  { label: "Travel", to: "/transport" },
  { label: "Wellness", to: "/wellness" },
  { label: "Packages", to: "/packages" },
  { label: "My Trips", to: "/trips" },
  { label: "Profile", to: "/profile" },
];

export default function CustomerLayout() {
  return (
    <div className="app-shell customer-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">Asteria</div>
            <div className="brand-subtitle">Hotel & Experiences</div>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <NavLink to="/login" className="button button-secondary">
            Login
          </NavLink>
          <NavLink to="/register" className="button button-primary">
            Book Now
          </NavLink>
        </div>
      </header>

      <main className="page-content">
        <Outlet />
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
