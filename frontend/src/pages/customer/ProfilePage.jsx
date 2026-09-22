export default function ProfilePage() {
  return (
    <div className="page-shell">
      <div className="section-header">
        <div>
          <span className="eyebrow">Profile</span>
          <h2>Guest profile</h2>
        </div>
      </div>
      <div className="profile-grid card-panel padded-box">
        <div>
          <h3>Personal details</h3>
          <p>Name: Aarav Nair</p>
          <p>Email: aarav@asteria.in</p>
          <p>Phone: +91 98765 43210</p>
        </div>
        <div>
          <h3>Preferences</h3>
          <p>Late checkout</p>
          <p>Vegetarian dining</p>
          <p>Premium airport transfer</p>
        </div>
      </div>
    </div>
  );
}
