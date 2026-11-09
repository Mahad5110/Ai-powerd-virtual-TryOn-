import { useState } from "react";
import { resetPassword } from "../api";
import "../styles/Auth.css";

export default function ResetPassword({ token, onBackToLogin }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!token) {
      setError("This reset link is incomplete. Request a new password-reset email.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      setError("Password must include an uppercase letter, a lowercase letter, and a number.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await resetPassword(token, password);
      setMessage(result.message);
      setPassword("");
      setConfirmPassword("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-layout">
      <section className="auth-showcase">
        <div>
          <div className="auth-brand">
            <span className="auth-brand-icon">T</span>
            <span>
              TryFirst<span className="auth-brand-dot">.</span>
            </span>
          </div>
          <div className="auth-gold-line" />
          <h2 className="auth-showcase-title">
            A fresh start,
            <br />
            just one step away.
          </h2>
          <p className="auth-showcase-description">
            Choose a new password to get back to discovering your style.
          </p>
        </div>
        <div className="auth-category-list">
          <span>Watches</span>
          <span>Bags</span>
          <span>Shoes</span>
        </div>
      </section>

      <section className="auth-form-panel">
        <div className="auth-form-content">
          <h1>Choose a new password</h1>
          <p className="auth-description">
            Use at least 8 characters, including an uppercase letter, a lowercase letter, and a number. Your reset link is valid for 30 minutes and can only be used once.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="new-password">New password</label>
              <input
                id="new-password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="confirm-new-password">Confirm new password</label>
              <input
                id="confirm-new-password"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>

            {error && <p className="auth-error" role="alert">{error}</p>}
            {message && <p className="auth-success" role="status">{message}</p>}

            {message ? (
              <button className="auth-button" type="button" onClick={onBackToLogin}>
                Back to log in
              </button>
            ) : (
              <button className="auth-button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating password..." : "Update password"}
              </button>
            )}
          </form>

          {!message && (
            <p className="auth-switch">
              Remembered your password?{" "}
              <button type="button" onClick={onBackToLogin}>Back to log in</button>
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
