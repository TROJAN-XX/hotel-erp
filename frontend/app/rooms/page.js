import Link from 'next/link';

const rooms = [
  { name: 'Deluxe King Room', rate: '₹9,600/night', status: 'Available' },
  { name: 'Garden Family Suite', rate: '₹14,200/night', status: 'Limited' },
  { name: 'Heritage Suite', rate: '₹18,800/night', status: 'Popular' },
];

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
          {[['/', 'Home'], ['/rooms', 'Rooms'], ['/restaurants', 'Dining'], ['/tours', 'Tours'], ['/transport', 'Travel'], ['/wellness', 'Wellness'], ['/packages', 'Packages'], ['/trips', 'My Trips']].map(([href, label]) => (
            <Link key={href} href={href} className="nav-link">{label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href="/login" className="button button-secondary">Login</Link>
          <Link href="/register" className="button button-primary">Book Now</Link>
        </div>
      </header>

      <main className="page-content">
        <div className="page-shell">
          <div className="section-header">
            <div>
              <span className="eyebrow">Hotel</span>
              <h2>Rooms & stays</h2>
            </div>
            <button className="button button-primary" type="button">Filter</button>
          </div>

          <div className="card-grid three-up">
            {rooms.map((room) => (
              <article key={room.name} className="card-panel room-card">
                <div className="room-image placeholder-image" />
                <h3>{room.name}</h3>
                <p>King bed • Breakfast • City view</p>
                <div className="card-row">
                  <strong>{room.rate}</strong>
                  <span className="pill">{room.status}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
