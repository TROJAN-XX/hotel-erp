import SectionHeader from "../../components/common/SectionHeader";
import StatCard from "../../components/common/StatCard";

const featuredRooms = [
  { name: "Deluxe Suite", label: "Garden view", price: "₹12,500 / night" },
  {
    name: "Heritage Villa",
    label: "Private plunge pool",
    price: "₹18,900 / night",
  },
  {
    name: "Family Loft",
    label: "2 adults • 2 children",
    price: "₹15,400 / night",
  },
];

const packages = [
  "Kerala Weekend Escape",
  "Wellness Retreat",
  "Cultural Heritage Stay",
];

export default function HomePage() {
  return (
    <div className="customer-page">
      <section className="hero-banner">
        <div className="hero-copy">
          <span className="eyebrow">Curated hospitality experiences</span>
          <h1>Luxury stays, memorable journeys & wellness escapes</h1>
          <p>
            Discover refined stays, destination tours, dining, spa rituals and
            tailored packages designed for your ideal getaway.
          </p>
          <div className="hero-actions">
            <button className="button button-primary">Explore stays</button>
            <button className="button button-secondary">View packages</button>
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
            <button className="button button-primary">Search Rooms</button>
            <button className="button button-secondary">
              Explore Packages
            </button>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard label="Today’s Revenue" value="₹3.4L" tone="gold" />
        <StatCard label="Check-ins" value="42" />
        <StatCard label="Occupancy" value="78%" />
        <StatCard label="Pending Payments" value="₹96K" />
      </section>

      <SectionHeader eyebrow="Stay" title="Featured rooms" action="View all" />
      <section className="card-grid three-up">
        {featuredRooms.map((room) => (
          <article key={room.name} className="card-panel room-card">
            <div className="room-image placeholder-image" />
            <h3>{room.name}</h3>
            <p>{room.label}</p>
            <div className="card-row">
              <strong>{room.price}</strong>
              <button className="button button-secondary">Book</button>
            </div>
          </article>
        ))}
      </section>

      <SectionHeader
        eyebrow="Packages"
        title="Popular getaway packages"
        action="Build custom"
      />
      <section className="package-list">
        {packages.map((pkg) => (
          <div key={pkg} className="list-item-row card-panel">
            <div>
              <h3>{pkg}</h3>
              <p>
                Includes stay, guided experience, meals and optional add-ons.
              </p>
            </div>
            <button className="button button-primary">Explore</button>
          </div>
        ))}
      </section>

      <SectionHeader eyebrow="Experiences" title="Signature offering" />
      <section className="feature-strip">
        <div className="mini-card card-panel">
          <strong>Dining</strong>
          <span>Curated cuisine</span>
        </div>
        <div className="mini-card card-panel">
          <strong>Tours</strong>
          <span>Local adventures</span>
        </div>
        <div className="mini-card card-panel">
          <strong>Wellness</strong>
          <span>Spa & massage</span>
        </div>
        <div className="mini-card card-panel">
          <strong>Transport</strong>
          <span>Seamless arrivals</span>
        </div>
      </section>
    </div>
  );
}
