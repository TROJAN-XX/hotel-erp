export default function ToursPage() {
  return (
    <div className="page-shell">
      <div className="section-header">
        <div>
          <span className="eyebrow">Travel & tourism</span>
          <h2>Explore local journeys</h2>
        </div>
      </div>
      <div className="card-grid three-up">
        {[
          "City Heritage Walk",
          "Tea Estate Tour",
          "Waterfall Day Trip",
          "Coconut Farm Experience",
        ].map((item) => (
          <article key={item} className="card-panel room-card">
            <div className="room-image placeholder-image" />
            <h3>{item}</h3>
            <p>Half-day guided experience with local insights</p>
            <div className="card-row">
              <strong>₹2,400</strong>
              <button className="button button-secondary">Book</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
