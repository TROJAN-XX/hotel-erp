import BookingCard from "../../components/common/BookingCard";

export default function MyTripsPage() {
  return (
    <div className="page-shell">
      <div className="section-header">
        <div>
          <span className="eyebrow">Trips</span>
          <h2>Upcoming & previous journeys</h2>
        </div>
      </div>
      <div className="booking-stack">
        <BookingCard
          title="Kerala Weekend Escape"
          meta="20–23 Oct 2026 • Deluxe Suite"
          amount="₹28,450"
          status="Confirmed"
        />
        <BookingCard
          title="Wellness Retreat"
          meta="14–16 Nov 2026 • Spa & Massage"
          amount="₹16,900"
          status="Booked"
        />
        <BookingCard
          title="Heritage Tour"
          meta="26 Nov 2026 • City Walk + Dinner"
          amount="₹7,800"
          status="Completed"
        />
      </div>
    </div>
  );
}
