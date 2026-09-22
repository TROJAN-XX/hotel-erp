import SectionHeader from "../../components/common/SectionHeader";

const menus = [
  "Breakfast buffet",
  "Chef’s tasting menu",
  "Private dining",
  "Room service",
];

export default function DiningPage() {
  return (
    <div className="page-shell">
      <SectionHeader
        eyebrow="Dining"
        title="Restaurant & bar"
        action="Reserve table"
      />
      <div className="feature-strip">
        {menus.map((menu) => (
          <div key={menu} className="mini-card card-panel">
            <strong>{menu}</strong>
            <span>Curated experience</span>
          </div>
        ))}
      </div>
      <div className="card-panel padded-box">
        <h3>Today’s highlights</h3>
        <ul className="plain-list">
          <li>South Indian breakfast spread</li>
          <li>Sunset cocktail menu</li>
          <li>Private dining by the pool</li>
        </ul>
      </div>
    </div>
  );
}
