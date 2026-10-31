import { ArrowLeft, ArrowUpRight, Star } from "lucide-react";
import ProductCard from "../components/ProductCard";
import StoreHeader from "../components/StoreHeader";
import { products } from "../data/products";
import "../styles/Storefront.css";

function ProductDetails({ product, onLogin, onSignup }) {
  if (!product) {
    return (
      <div className="storefront-page detail-page">
        <StoreHeader activePage="catalog" onLogin={onLogin} onSignup={onSignup} />
        <main className="detail-not-found"><span className="store-eyebrow">NOT IN THIS EDIT</span><h1>We couldn't find that piece.</h1><a href="/catalog" className="detail-back-link"><ArrowLeft size={17} /> Back to discovery</a></main>
      </div>
    );
  }

  const relatedProducts = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);

  return (
    <div className="storefront-page detail-page">
      <StoreHeader activePage="catalog" onLogin={onLogin} onSignup={onSignup} />
      <main>
        <div className="detail-breadcrumb"><a href="/catalog"><ArrowLeft size={16} /> Back to discovery</a><span>/</span><a href={`/catalog?category=${encodeURIComponent(product.category)}`}>{product.category}</a><span>/</span><span>{product.name}</span></div>

        <section className="product-detail-layout">
          <div className="detail-image-wrap"><img src={product.image} alt={`${product.name} by ${product.brand}`} /><span className="detail-image-caption">TRYFIRST EDIT · {product.category.toUpperCase()}</span></div>
          <div className="detail-copy">
            <span className="store-eyebrow">{product.brand} / {product.category}</span>
            <h1>{product.name}</h1>
            <div className="detail-rating"><span><Star size={15} fill="currentColor" /> {product.rating.toFixed(1)}</span><span>{product.reviewCount} reviews</span></div>
            <p className="detail-price">${product.price.toFixed(2)}</p>
            <p className="detail-description">{product.description}</p>
            <div className="detail-color"><span>COLOR</span><strong>{product.color}</strong></div>
            <div className="detail-actions">
              <button type="button" className="detail-primary-action" onClick={() => window.alert("Virtual try-on is coming soon.")}>Try it on <ArrowUpRight size={17} /></button>
              <button type="button" className="detail-secondary-action" onClick={() => window.alert("This product has been saved to your edit.")}>Save piece</button>
            </div>
            <div className="detail-note"><span>01</span><p>See how it looks before you decide. Your style, your call.</p></div>
            <div className="detail-specs"><h2>Details</h2><ul>{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div>
          </div>
        </section>

        <section className="related-section">
          <div className="related-heading"><div><span className="store-eyebrow">A LITTLE MORE TO EXPLORE</span><h2>More from {product.category.toLowerCase()}.</h2></div><a href={`/catalog?category=${encodeURIComponent(product.category)}`}>View collection <ArrowUpRight size={17} /></a></div>
          <div className="product-grid related-grid">{relatedProducts.map((item) => <ProductCard key={item.id} product={item} />)}</div>
        </section>
      </main>
      <footer className="store-footer"><a href="/" className="home-logo">Try<span>First</span><span className="logo-dot">.</span></a><span>Good choices start with a closer look.</span><a href="/catalog">Back to discovery ↑</a></footer>
    </div>
  );
}

export default ProductDetails;