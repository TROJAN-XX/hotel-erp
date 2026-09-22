export default function BookingCard({ title, meta, amount, status }) {
  return (
    <article className="booking-card">
      <div>
        <h3>{title}</h3>
        <p>{meta}</p>
      </div>
      <div className="booking-card-meta">
        <span className="pill">{status}</span>
        <strong>{amount}</strong>
      </div>
    </article>
  );
}
