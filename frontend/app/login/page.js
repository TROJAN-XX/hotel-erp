"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getDefaultUserRole, saveUser } from "../../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setStatus("Please enter both email and password.");
      return;
    }

    const email = form.email.trim();
    const role = getDefaultUserRole(email);
    const user = {
      id: Date.now(),
      name: role === "admin" ? "Asteria Admin" : "Guest Traveler",
      email,
      phone: "+91 98765 43210",
      role,
      memberSince: new Date().toISOString().slice(0, 10),
    };

    saveUser(user);
    setStatus(
      role === "admin" ? "Admin login successful." : "Login successful.",
    );
    router.push(role === "admin" ? "/admin" : "/profile");
  };

  return (
    <div className="page-shell auth-shell">
      <div className="auth-card">
        <span className="eyebrow">Welcome back</span>
        <h1>Log in to your account</h1>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </label>
          <button className="button button-primary full-width" type="submit">
            Login
          </button>
        </form>
        {status ? <div className="status-banner success">{status}</div> : null}
        <p style={{ marginTop: 16, textAlign: "center" }}>
          Don&apos;t have an account? <Link href="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}
