import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favoritesReducer from "./favoritesSlice";
import filterReducer from "./filterSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    filters: filterReducer,
    theme: themeReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem("cart", JSON.stringify(state.cart));
  localStorage.setItem("favorites", JSON.stringify(state.favorites));
  localStorage.setItem("theme", state.theme);
});
