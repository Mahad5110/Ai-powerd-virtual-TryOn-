function StoreHeader({ activePage = "home", onLogin, onSignup }) {
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
        <button type="button" className="login-button" onClick={onLogin}>Log In</button>
        <button type="button" className="signup-button" onClick={onSignup}>Sign Up</button>
      </div>
    </header>
  );
}

export default StoreHeader;