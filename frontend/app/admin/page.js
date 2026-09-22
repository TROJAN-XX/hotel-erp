"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminDashboard from "../../components/AdminDashboard";
import { getStoredUser } from "../../lib/auth";

export default function AdminDashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  if (!user || user.role !== "admin") {
    return (
      <div className="page-shell auth-shell">
        <div className="auth-card">
          <span className="eyebrow">Restricted access</span>
          <h1>Admin access required</h1>
          <p>
            This dashboard is only available to verified staff and
            administrators.
          </p>
          <div className="hero-actions" style={{ marginTop: 20 }}>
            <Link href="/login" className="button button-primary">
              Login as admin
            </Link>
            <Link href="/" className="button button-secondary">
              Back home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}
