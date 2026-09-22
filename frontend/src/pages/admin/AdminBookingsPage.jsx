export default function AdminBookingsPage() {
  return (
    <div className="admin-page">
      <div className="section-header">
        <div>
          <span className="eyebrow">Reservations</span>
          <h2>All bookings</h2>
        </div>
      </div>
      <div className="card-panel padded-box">
        <table className="data-table">
          <thead>
            <tr>
              <th>Booking</th>
              <th>Guest</th>
              <th>Check-in</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BK-2048</td>
              <td>Aarav Nair</td>
              <td>12 Oct 2026</td>
              <td>Confirmed</td>
              <td>₹28,450</td>
            </tr>
            <tr>
              <td>BK-2049</td>
              <td>Meera Iyer</td>
              <td>14 Oct 2026</td>
              <td>Checked In</td>
              <td>₹18,900</td>
            </tr>
            <tr>
              <td>BK-2050</td>
              <td>Rohit Shah</td>
              <td>18 Oct 2026</td>
              <td>Pending</td>
              <td>₹12,200</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
