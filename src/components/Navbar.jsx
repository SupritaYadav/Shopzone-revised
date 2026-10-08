import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeSlice";

function Navbar() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const cartCount = useSelector((state) =>
    state.cart.reduce((total, item) => total + (item.quantity || 1), 0)
  );
  const favoriteCount = useSelector((state) => state.favorites.length);

  return (
    <nav className="navbar">
      <div className="logo">ShopZone</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
        <span className="favorite-count">♥ {favoriteCount}</span>
        <button
          className="theme-btn"
          onClick={() => dispatch(toggleTheme())}
          title="Change theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
