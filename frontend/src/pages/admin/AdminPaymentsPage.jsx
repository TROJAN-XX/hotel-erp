export default function AdminPaymentsPage() {
  return (
    <div className="admin-page">
      <div className="section-header">
        <div>
          <span className="eyebrow">Payments</span>
          <h2>Transactions</h2>
        </div>
      </div>
      <div className="card-panel padded-box">
        <p>
          Transactions, pending approvals, successful payments, failed charges,
          and refund processing appear here.
        </p>
      </div>
    </div>
  );
}
