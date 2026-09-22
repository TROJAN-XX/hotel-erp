import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="page-shell auth-shell">
      <div className="auth-card">
        <span className="eyebrow">Welcome back</span>
        <h1>Log in to your account</h1>
        <form className="form-grid">
          <label>
            Email
            <input type="email" placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input type="password" placeholder="••••••••" />
          </label>
          <button className="button button-primary full-width" type="submit">
            Login
          </button>
        </form>
        <p style={{ marginTop: 16, textAlign: "center" }}>
          Don&apos;t have an account? <Link href="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}
