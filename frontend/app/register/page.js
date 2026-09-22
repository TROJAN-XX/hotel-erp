import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="page-shell auth-shell">
      <div className="auth-card">
        <span className="eyebrow">Create account</span>
        <h1>Join Asteria</h1>
        <form className="form-grid">
          <label>
            Full name
            <input type="text" placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" placeholder="you@example.com" />
          </label>
          <label>
            Phone
            <input type="tel" placeholder="+91 98765 43210" />
          </label>
          <label>
            Password
            <input type="password" placeholder="Create a password" />
          </label>
          <button className="button button-primary full-width" type="submit">Register</button>
        </form>
        <p style={{ marginTop: 16, textAlign: 'center' }}>
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
