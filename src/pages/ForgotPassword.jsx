
import { useState } from "react";
import { requestPasswordReset } from "../api";
import "../styles/Auth.css";

export default function ForgotPassword({ onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const emailInput = event.currentTarget.elements.namedItem("email");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!emailInput.checkValidity()) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await requestPasswordReset(email.trim());
      setMessage(result.message);
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
            Get back to exploring your style and trying
            products virtually before you buy.
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
          <h1>Forgot password?</h1>

          <p className="auth-description">
            Enter the email address associated with your account.
            We'll help you get back in.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="reset-email">Email</label>

              <input
                id="reset-email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}

            {message && (
              <p className="auth-success" role="status">
                {message}
              </p>
            )}

            <button className="auth-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send reset link"}
            </button>
          </form>

          <p className="auth-switch">
            Remembered your password?{" "}
            <button type="button" onClick={onBackToLogin}>
              Back to log in
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}
