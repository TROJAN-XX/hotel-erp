export default function WellnessPage() {
  return (
    <div className="page-shell">
      <div className="section-header">
        <div>
          <span className="eyebrow">Wellness</span>
          <h2>Spa, massage & restorative rituals</h2>
        </div>
      </div>
      <div className="card-grid three-up">
        {[
          "Signature Massage",
          "Detox Facial",
          "Ayurvedic Therapy",
          "Sauna & Steam",
        ].map((item) => (
          <article key={item} className="card-panel room-card">
            <div className="room-image placeholder-image" />
            <h3>{item}</h3>
            <p>Designed to recharge body and mind.</p>
            <div className="card-row">
              <strong>₹3,500</strong>
              <button className="button button-secondary">Book</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
