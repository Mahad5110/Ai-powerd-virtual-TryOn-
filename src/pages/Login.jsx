
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "../styles/Auth.css";

export default function Login({
  onLogin,
  onShowSignup,
  onForgotPassword,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const form = event.currentTarget;
    const emailInput = form.elements.namedItem("email");
    const passwordInput = form.elements.namedItem("password");
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!emailInput.checkValidity()) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    onLogin();
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
            See it on you,
            <br />
            then decide.
          </h2>

          <p className="auth-showcase-description">
            Try watches, bags and shoes virtually before
            you spend a rupee.
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
          <h1>Welcome back</h1>

          <p className="auth-description">
            Log in to continue your virtual try-on.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-field">
              <div className="auth-label-row">
                <label htmlFor="login-password">Password</label>

                <button
                  className="auth-text-button"
                  type="button"
                  onClick={onForgotPassword}
                >
                  Forgot password?
                </button>
              </div>

              <div className="password-field">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}

            <button className="auth-button" type="submit">
              Log in
            </button>
          </form>

          <p className="auth-switch">
            New here?{" "}
            <button type="button" onClick={onShowSignup}>
              Create an account
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}
