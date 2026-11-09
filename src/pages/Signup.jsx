
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signUp } from "../api";
import "../styles/Auth.css";

export default function Signup({ onShowLogin, onSignup }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const form = event.currentTarget;
    const name = form.elements.namedItem("name").value.trim();
    const emailInput = form.elements.namedItem("email");
    const email = emailInput.value.trim();
    const password = form.elements.namedItem("password").value;
    const confirmPassword =
      form.elements.namedItem("confirmPassword").value;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (!emailInput.checkValidity()) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      setError(
        "Password must include an uppercase letter, a lowercase letter, and a number."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const session = await signUp(name, email, password);
      onSignup(session);
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
            Find your style,
            <br />
            before you buy.
          </h2>

          <p className="auth-showcase-description">
            Create your account and explore virtual try-on
            for watches, bags and shoes.
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
          <h1>Create account</h1>

          <p className="auth-description">
            Join TryFirst and start your virtual shopping experience.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="signup-name">Full name</label>
              <input
                id="signup-name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="signup-password">Password</label>

              <div className="password-field">
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create your password"
                  autoComplete="new-password"
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

            <div className="auth-field">
              <label htmlFor="signup-confirm-password">
                Confirm password
              </label>

              <div className="password-field">
                <input
                  id="signup-confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
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

            <button className="auth-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <button type="button" onClick={onShowLogin}>
              Log in
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}
