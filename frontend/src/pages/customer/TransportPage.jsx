export default function TransportPage() {
  return (
    <div className="page-shell">
      <div className="section-header">
        <div>
          <span className="eyebrow">Transport</span>
          <h2>Airport, local and private transfers</h2>
        </div>
      </div>
      <div className="card-grid three-up">
        {[
          "Airport Transfer",
          "Private Car",
          "Luxury Van",
          "Corporate Travel",
        ].map((item) => (
          <article key={item} className="card-panel room-card">
            <div className="room-image placeholder-image" />
            <h3>{item}</h3>
            <p>Flexible schedules with verified drivers.</p>
            <div className="card-row">
              <strong>From ₹850</strong>
              <button className="button button-secondary">Reserve</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
