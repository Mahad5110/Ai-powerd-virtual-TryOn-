import { useState } from "react";
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../components/ProductCard";
import StoreHeader from "../components/StoreHeader";
import { categories, products } from "../data/products";
import "../styles/Storefront.css";

const PAGE_SIZE = 6;
const brands = [...new Set(products.map((product) => product.brand))].sort();

function Catalog({ onLogin, onSignup, user, onLogout, initialCategory = "All pieces" }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(
    categories.includes(initialCategory) ? initialCategory : "All pieces",
  );
  const [brand, setBrand] = useState("All brands");
  const [minimumPrice, setMinimumPrice] = useState("");
  const [maximumPrice, setMaximumPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [page, setPage] = useState(1);

  const filteredProducts = products
    .filter((product) => {
      const searchText = `${product.name} ${product.brand} ${product.category} ${product.color}`.toLowerCase();
      return (
        (!query || searchText.includes(query.trim().toLowerCase())) &&
        (category === "All pieces" || product.category === category) &&
        (brand === "All brands" || product.brand === brand) &&
        (minimumPrice === "" || product.price >= Number(minimumPrice)) &&
        (maximumPrice === "" || product.price <= Number(maximumPrice))
      );
    })
    .sort((first, second) => {
      if (sortOrder === "price-low") return first.price - second.price;
      if (sortOrder === "price-high") return second.price - first.price;
      return new Date(second.createdAt) - new Date(first.createdAt);
    });

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const visibleProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function resetFilters() {
    setQuery("");
    setCategory("All pieces");
    setBrand("All brands");
    setMinimumPrice("");
    setMaximumPrice("");
    setSortOrder("newest");
    setPage(1);
  }

  function updateCategory(nextCategory) {
    setCategory(nextCategory);
    setPage(1);
  }

  return (
    <div className="storefront-page catalog-page">
      <StoreHeader activePage="catalog" onLogin={onLogin} onSignup={onSignup} user={user} onLogout={onLogout} />
      <main>
        <section className="catalog-intro">
          <div className="catalog-intro-inner">
            <div>
              <span className="store-eyebrow">THE TRYFIRST EDIT</span>
              <h1>Find your next<br /><em>everyday favorite.</em></h1>
              <p>Thoughtful pieces, made easier to choose. Browse the edit and find the one that feels like you.</p>
            </div>
            <div className="catalog-intro-note"><span>01 / 03</span><span>Watches · bags · footwear</span></div>
          </div>
        </section>

        <section className="catalog-content" aria-label="Product discovery">
          <div className="catalog-toolbar">
            <div className="catalog-search-wrap">
              <Search size={19} aria-hidden="true" />
              <label className="visually-hidden" htmlFor="catalog-search">Search products</label>
              <input
                id="catalog-search"
                type="search"
                value={query}
                onChange={(event) => { setQuery(event.target.value); setPage(1); }}
                placeholder="Search products, brands, colors..."
              />
              {query && <button className="search-clear" type="button" onClick={() => { setQuery(""); setPage(1); }} aria-label="Clear search"><X size={16} /></button>}
            </div>
            <label className="sort-control">
              <span>Sort by</span>
              <select value={sortOrder} onChange={(event) => { setSortOrder(event.target.value); setPage(1); }}>
                <option value="newest">Newest</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </label>
          </div>

          <nav className="category-tabs" aria-label="Product categories">
            {categories.map((item) => (
              <button key={item} type="button" className={category === item ? "category-tab active" : "category-tab"} aria-pressed={category === item} onClick={() => updateCategory(item)}>
                {item}
                <span>{item === "All pieces" ? products.length : products.filter((product) => product.category === item).length}</span>
              </button>
            ))}
          </nav>

          <div className="catalog-layout">
            <details className="catalog-filters" open>
              <summary><SlidersHorizontal size={17} /> Filters <span className="filter-summary-caret">+</span></summary>
              <div className="filter-groups">
                <label className="filter-group">
                  <span className="filter-label">Category</span>
                  <select value={category} onChange={(event) => updateCategory(event.target.value)}>
                    {categories.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <label className="filter-group">
                  <span className="filter-label">Brand</span>
                  <select value={brand} onChange={(event) => { setBrand(event.target.value); setPage(1); }}>
                    <option>All brands</option>
                    {brands.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <fieldset className="filter-group price-filter">
                  <legend className="filter-label">Price range</legend>
                  <div className="price-inputs">
                    <label><span>$</span><input aria-label="Minimum price" type="number" min="0" placeholder="Min" value={minimumPrice} onChange={(event) => { setMinimumPrice(event.target.value); setPage(1); }} /></label>
                    <span className="price-range-dash">to</span>
                    <label><span>$</span><input aria-label="Maximum price" type="number" min="0" placeholder="Max" value={maximumPrice} onChange={(event) => { setMaximumPrice(event.target.value); setPage(1); }} /></label>
                  </div>
                </fieldset>
                <button className="reset-filters" type="button" onClick={resetFilters}>Reset all filters</button>
              </div>
            </details>

            <div className="catalog-results">
              <div className="results-heading">
                <p><strong>{filteredProducts.length}</strong> pieces <span>{query ? `matching “${query}”` : "selected for you"}</span></p>
                {category !== "All pieces" && <button type="button" onClick={() => updateCategory("All pieces")}>{category} <X size={14} /></button>}
              </div>

              {visibleProducts.length > 0 ? (
                <div className="product-grid">
                  {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
                </div>
              ) : (
                <div className="catalog-empty">
                  <span className="empty-mark">0</span>
                  <h2>No pieces found</h2>
                  <p>Try another search or clear a filter to see more of the collection.</p>
                  <button type="button" className="empty-reset" onClick={resetFilters}>Clear filters</button>
                </div>
              )}

              {filteredProducts.length > PAGE_SIZE && (
                <nav className="pagination" aria-label="Catalog pages">
                  <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} aria-label="Previous page"><ChevronLeft size={18} /></button>
                  <span>Page <strong>{page}</strong> of {pageCount}</span>
                  <button type="button" onClick={() => setPage((current) => Math.min(pageCount, current + 1))} disabled={page === pageCount} aria-label="Next page"><ChevronRight size={18} /></button>
                </nav>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="store-footer"><a href="/" className="home-logo">Try<span>First</span><span className="logo-dot">.</span></a><span>Good choices start with a closer look.</span><a href="/catalog">Back to discovery ↑</a></footer>
    </div>
  );
}

export default Catalog;