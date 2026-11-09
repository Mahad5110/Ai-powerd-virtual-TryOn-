import { useState } from "react";
import { LogOut, UserRound } from "lucide-react";

function StoreHeader({ activePage = "home", onLogin, onSignup, user, onLogout }) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="home-header">
      <a href="/" className="home-logo" aria-label="TryFirst home">
        Try<span>First</span>
        <span className="logo-dot">.</span>
      </a>

      <nav className="home-nav" aria-label="Main navigation">
        <a href="/" aria-current={activePage === "home" ? "page" : undefined}>Home</a>
        <a href="/catalog" aria-current={activePage === "catalog" ? "page" : undefined}>Discover</a>
        <a href="/#how-it-works">How It Works</a>
      </nav>

      <div className="home-auth-buttons">
        {user ? (
          <div className="profile-menu">
            <button
              type="button"
              className="profile-button"
              aria-expanded={profileOpen}
              aria-controls="profile-menu"
              onClick={() => setProfileOpen((open) => !open)}
            >
              <span className="profile-avatar" aria-hidden="true">
                {user.name?.charAt(0).toUpperCase() || <UserRound size={17} />}
              </span>
              <span className="profile-button-label">Profile</span>
            </button>

            {profileOpen && (
              <div className="profile-dropdown" id="profile-menu">
                <span className="profile-menu-heading">Signed in as</span>
                <strong>{user.name}</strong>
                <span className="profile-menu-email">{user.email}</span>
                <button
                  type="button"
                  className="profile-logout-button"
                  onClick={() => {
                    setProfileOpen(false);
                    onLogout();
                  }}
                >
                  <LogOut size={16} />
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button type="button" className="login-button" onClick={onLogin}>Log In</button>
            <button type="button" className="signup-button" onClick={onSignup}>Sign Up</button>
          </>
        )}
      </div>
    </header>
  );
}

export default StoreHeader;