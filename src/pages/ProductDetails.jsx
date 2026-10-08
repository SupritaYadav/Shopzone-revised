import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toggleFavorite } from "../store/favoritesSlice";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedMessage, setAddedMessage] = useState(false);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const addProductToCart = () => {
    dispatch(addToCart(product));
    setAddedMessage(true);

    setTimeout(() => {
      setAddedMessage(false);
    }, 3000);
  };

  const favorite = favorites.some((item) => item.id === product?.id);

  if (loading) {
    return <h2 className="loading-text">Loading Product...</h2>;
  }

  if (!product) {
    return <h2 className="loading-text">Product not Found</h2>;
  }

  return (
    <div className="product-details">
      <img src={product.thumbnail} alt={product.title} />

      <div className="product-info">
        <button
          className="details-favorite"
          onClick={() => dispatch(toggleFavorite(product))}
        >
          {favorite ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
        </button>

        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <h2>${product.price}</h2>
        <p>Rating : ⭐{product.rating}</p>
        <p>Category : {product.category}</p>
        <p>Brand : {product.brand}</p>

        <button onClick={addProductToCart}>🛒 Add to Cart</button>

        {addedMessage && (
          <div className="cart-success-message">
            🎉 Product added to cart!
          </div>
        )}

        <Link to="/shop" className="back-to-shop">
          ⬅ Back to Shop
        </Link>
      </div>
    </div>
  );
}

export default ProductDetails;
