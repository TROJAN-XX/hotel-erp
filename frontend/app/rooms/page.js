import Link from "next/link";
import RoomCatalog from "../../components/RoomCatalog";

export default function RoomsPage() {
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
        <nav className="main-nav">
          {[
            ["/", "Home"],
            ["/rooms", "Rooms"],
            ["/restaurants", "Dining"],
            ["/tours", "Tours"],
            ["/transport", "Travel"],
            ["/wellness", "Wellness"],
            ["/packages", "Packages"],
            ["/trips", "My Trips"],
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
        <div className="page-shell">
          <RoomCatalog />
        </div>
      </main>
    </div>
  );
}
