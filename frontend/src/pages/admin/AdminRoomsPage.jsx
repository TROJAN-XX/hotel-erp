export default function AdminRoomsPage() {
  return (
    <div className="admin-page">
      <div className="section-header">
        <div>
          <span className="eyebrow">Hotel</span>
          <h2>Rooms</h2>
        </div>
      </div>
      <div className="card-panel padded-box">
        <table className="data-table">
          <thead>
            <tr>
              <th>Room</th>
              <th>Type</th>
              <th>Floor</th>
              <th>Status</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>101</td>
              <td>Deluxe</td>
              <td>1</td>
              <td>Available</td>
              <td>₹8,500</td>
            </tr>
            <tr>
              <td>204</td>
              <td>Suite</td>
              <td>2</td>
              <td>Occupied</td>
              <td>₹12,900</td>
            </tr>
            <tr>
              <td>305</td>
              <td>Family</td>
              <td>3</td>
              <td>Cleaning</td>
              <td>₹10,400</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
