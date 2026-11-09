
import "../styles/Home.css";
import StoreHeader from "../components/StoreHeader";

const products = [
  {
    name: "Watches",
    description: "Find your perfect timepiece",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=700&q=85",
    className: "watch-card",
  },
  {
    name: "Bags",
    description: "Discover your signature style",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85",
    className: "bag-card",
  },
  {
    name: "Footwear",
    description: "Step into the right fit",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
    className: "shoes-card",
  },
];

function Home({ onLogin, onSignup, user, onLogout }) {
  return (
    <div className="home-page">
      {/* Header */}
      <StoreHeader activePage="home" onLogin={onLogin} onSignup={onSignup} user={user} onLogout={onLogout} />

      <main>
        {/* Hero */}
        <section className="hero-section" id="home">
          <div className="hero-content">
            <span className="hero-label">
              THE FUTURE OF ONLINE SHOPPING
            </span>

            <h1>
              Try it first.
              <br />
              <span>Love it forever.</span>
            </h1>

            <p className="hero-description">
              Discover your style with a smarter shopping experience.
              Virtually try watches, bags, and footwear before making
              your choice.
            </p>

            <div className="hero-buttons">
              <a href="/catalog" className="primary-hero-button">
                Explore Collection <span>↗</span>
              </a>

              <a
                href="#how-it-works"
                className="secondary-hero-button"
              >
                How It Works <span>→</span>
              </a>
            </div>

            <div className="hero-trust">
              <span className="trust-icon">✓</span>
              <span>Shop with confidence</span>
              <span className="trust-divider">|</span>
              <span>Find your perfect fit</span>
            </div>
          </div>

          {/* Product collage */}
          <div className="hero-visual">
            <div className="hero-decoration hero-decoration-one" />
            <div className="hero-decoration hero-decoration-two" />

            {/* Watch card */}
            <div className="hero-image-main">
              <img
                src={products[0].image}
                alt="Elegant wristwatch"
              />

              <div className="watch-card-text">
                <strong>Timeless Elegance</strong>
                <span>Explore watches</span>
              </div>
            </div>

            {/* Bag card */}
            <div className="floating-product floating-bag">
              <img
                src={products[1].image}
                alt="Stylish handbag"
              />

              <div>
                <strong>Everyday Elegance</strong>
                <span>Explore bags</span>
              </div>
            </div>

            {/* Footwear card */}
            <div className="floating-product floating-shoes">
              <img
                src={products[2].image}
                alt="Modern footwear"
              />

              <div>
                <strong>Made for You</strong>
                <span>Explore footwear</span>
              </div>
            </div>

            <div className="hero-caption">
              <span className="caption-line" />
              <span>YOUR STYLE, YOUR CHOICE</span>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="categories-section" id="categories">
          <div className="section-heading">
            <span className="section-eyebrow">
              EXPLORE YOUR STYLE
            </span>

            <h2>Find your perfect match.</h2>

            <p>
              Explore our collections and discover items that match
              your style before you buy.
            </p>
          </div>

          <div className="category-grid">
            {products.map((product, index) => (
              <article
                className={`category-card ${product.className}`}
                key={product.name}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="category-image"
                />

                <div className="category-overlay" />

                <div className="category-content">
                  <span className="category-number">
                    0{index + 1}
                  </span>

                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>

                  <a
                    href={`/catalog?category=${product.name === "Watches" ? "watches" : product.name === "Bags" ? "bags" : "footwear"}`}
                    className="category-link"
                    aria-label={`Explore ${product.name}`}
                  >
                    ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="how-section" id="how-it-works">
          <div className="section-heading">
            <span className="section-eyebrow">
              SIMPLE. SMART. PERSONAL.
            </span>

            <h2>Your shopping journey, reimagined.</h2>

            <p>
              Make more confident choices with a simple virtual
              try-on experience.
            </p>
          </div>

          <div className="steps-grid">
            <article className="step-card">
              <div className="step-icon">01</div>
              <h3>Explore</h3>
              <p>
                Browse watches, bags, and footwear from our
                collections.
              </p>
            </article>

            <article className="step-card">
              <div className="step-icon">02</div>
              <h3>Try It On</h3>
              <p>
                Use the supported camera experience to preview
                selected products.
              </p>
            </article>

            <article className="step-card">
              <div className="step-icon">03</div>
              <h3>Choose Confidently</h3>
              <p>
                Review your selection and make a more informed
                shopping decision.
              </p>
            </article>
          </div>

          <div className="how-cta">
            <div>
              <span className="section-eyebrow">
                READY TO DISCOVER?
              </span>
              <h2>Your next favorite is waiting.</h2>
            </div>

            <button
              type="button"
              className="signup-button cta-button"
              onClick={onSignup}
            >
              Get Started <span>↗</span>
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <a href="#home" className="home-logo footer-logo">
          Try<span>First</span>
          <span className="logo-dot">.</span>
        </a>

        <p>A smarter way to discover your style.</p>

        <span className="footer-copy">
          © {new Date().getFullYear()} TryFirst. All rights reserved.
        </span>
      </footer>
    </div>
  );
}

export default Home;
