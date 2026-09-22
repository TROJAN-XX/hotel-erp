"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearUser, getStoredUser } from "../../lib/auth";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const handleLogout = () => {
    clearUser();
    setUser(null);
    router.push("/");
  };

  if (!user) {
    return (
      <div className="page-shell auth-shell">
        <div className="auth-card">
          <span className="eyebrow">Member access</span>
          <h1>Sign in to view your profile</h1>
          <p>
            Please log in to see your bookings, loyalty status, and preferences.
          </p>
          <div className="hero-actions" style={{ marginTop: 20 }}>
            <Link href="/login" className="button button-primary">
              Login
            </Link>
            <Link href="/register" className="button button-secondary">
              Create account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const loyaltyLabel = user.role === "admin" ? "Admin access" : "Gold member";

  return (
    <div className="customer-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">Asteria</div>
            <div className="brand-subtitle">My profile</div>
          </div>
        </div>
        <nav className="main-nav">
          {[
            ["/", "Home"],
            ["/rooms", "Rooms"],
            ["/packages", "Packages"],
            ["/trips", "Trips"],
            ["/profile", "Profile"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="nav-link">
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="page-content">
        <div className="page-shell profile-grid">
          <div className="card-panel padded-box">
            <span className="eyebrow">Account</span>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>Member since {user.memberSince || "2024"}</p>
            <div className="action-row">
              <button className="button button-primary" type="button">
                Edit profile
              </button>
              <button
                className="button button-secondary"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
          <div className="card-panel padded-box">
            <span className="eyebrow">Loyalty</span>
            <h2>{loyaltyLabel}</h2>
            <p>
              {user.role === "admin"
                ? "Operations access enabled"
                : "4 upcoming stays • 12 reward points"}
            </p>
            <div className="action-row">
              {user.role === "admin" ? (
                <Link href="/admin" className="button button-primary">
                  Open dashboard
                </Link>
              ) : (
                <button className="button button-secondary" type="button">
                  View rewards
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
