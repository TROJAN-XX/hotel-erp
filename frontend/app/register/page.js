"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getDefaultUserRole, saveUser } from "../../lib/auth";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
  role: "guest",
};

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setStatus("Please complete your name, email, and password.");
      return;
    }

    const normalizedEmail = form.email.trim();
    const selectedRole = form.role || getDefaultUserRole(normalizedEmail);
    const user = {
      id: Date.now(),
      name: form.name.trim(),
      email: normalizedEmail,
      phone: form.phone || "+91 98765 43210",
      role: selectedRole,
      memberSince: new Date().toISOString().slice(0, 10),
    };

    saveUser(user);
    setStatus("Account created successfully.");
    router.push(selectedRole === "admin" ? "/admin" : "/profile");
  };

  return (
    <div className="page-shell auth-shell">
      <div className="auth-card">
        <span className="eyebrow">Create account</span>
        <h1>Join Asteria</h1>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Full name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </label>
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
            Phone
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
            />
          </label>
          <label>
            Account role
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="guest">Guest traveler</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
            />
          </label>
          <button className="button button-primary full-width" type="submit">
            Register
          </button>
        </form>
        {status ? <div className="status-banner success">{status}</div> : null}
        <p style={{ marginTop: 16, textAlign: "center" }}>
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
