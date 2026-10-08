import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearch,
  setCategory,
  setMinPrice,
  setMaxPrice,
  setMinRating,
  setSortBy,
  resetFilters,
} from "../store/filterSlice";
import { toggleFavorite } from "../store/favoritesSlice";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))].sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const searchText = filters.search.trim().toLowerCase();

      const matchesSearch =
        !searchText ||
        product.title.toLowerCase().includes(searchText) ||
        product.brand?.toLowerCase().includes(searchText);

      const matchesCategory =
        filters.category === "all" || product.category === filters.category;

      const matchesPrice =
        product.price >= Number(filters.minPrice) &&
        product.price <= Number(filters.maxPrice);

      const matchesRating = product.rating >= Number(filters.minRating);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesRating
      );
    });

    if (filters.sortBy === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (filters.sortBy === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (filters.sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    if (filters.sortBy === "name") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [products, filters]);

  const isFavorite = (id) => {
    return favorites.some((item) => item.id === id);
  };

  if (loading) {
    return <h2 className="loading-text">Loading Products...</h2>;
  }

  return (
    <div className="shop-page">
      <h1>ShopZone Products</h1>

      <div className="shop-layout">
        <aside className="filter-sidebar">
          <div className="filter-heading">
            <h2>Filters</h2>
            <button onClick={() => dispatch(resetFilters())}>Reset</button>
          </div>

          <label>Search</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            placeholder="Search products..."
          />

          <label>Category</label>
          <select
            value={filters.category}
            onChange={(e) => dispatch(setCategory(e.target.value))}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>

          <label>Price Range</label>
          <div className="price-inputs">
            <input
              type="number"
              min="0"
              value={filters.minPrice}
              onChange={(e) => dispatch(setMinPrice(e.target.value))}
              placeholder="Min"
            />
            <input
              type="number"
              min="0"
              value={filters.maxPrice}
              onChange={(e) => dispatch(setMaxPrice(e.target.value))}
              placeholder="Max"
            />
          </div>

          <label>Minimum Rating</label>
          <select
            value={filters.minRating}
            onChange={(e) => dispatch(setMinRating(e.target.value))}
          >
            <option value="0">All Ratings</option>
            <option value="4">4+ ⭐</option>
            <option value="4.5">4.5+ ⭐</option>
          </select>

          <label>Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name</option>
          </select>
        </aside>

        <section className="products-section">
          <div className="results-row">
            <p>{filteredProducts.length} products found</p>
            <span>Filters are stored in global Redux state</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <h2>No products found</h2>
              <p>Try changing the filters or search text.</p>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <div className="product-card" key={product.id}>
                  <button
                    className={`favorite-btn ${
                      isFavorite(product.id) ? "active" : ""
                    }`}
                    onClick={() => dispatch(toggleFavorite(product))}
                    title="Add to favorites"
                  >
                    {isFavorite(product.id) ? "♥" : "♡"}
                  </button>

                  <img src={product.thumbnail} alt={product.title} />
                  <h3>{product.title}</h3>
                  <p>${product.price}</p>
                  <small>⭐ {product.rating}</small>

                  <Link to={`/product/${product.id}`}>View Details</Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Shop;
