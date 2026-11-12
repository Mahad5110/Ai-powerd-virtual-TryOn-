import { ArrowUpRight } from "lucide-react";

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <a className="product-card-image" href={`/products/${product.id}`} aria-label={`View ${product.name}`}>
        <img src={product.image} alt={`${product.name} by ${product.brand}`} loading="lazy" />
        <span className="product-category-tag">{product.category}</span>
        <span className="product-card-arrow" aria-hidden="true"><ArrowUpRight size={17} /></span>
      </a>
      <div className="product-card-copy">
        <div className="product-card-meta">
          <span>{product.brand}</span>
          <span className="product-rating">★ {product.rating.toFixed(1)}</span>
        </div>
        <a className="product-card-title" href={`/products/${product.id}`}>{product.name}</a>
        <div className="product-card-bottom">
          <span className="product-price">PKR {product.price.toLocaleString()}</span>
          <span className="product-color">{product.color}</span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;