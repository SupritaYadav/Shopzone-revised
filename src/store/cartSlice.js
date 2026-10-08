import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: savedCart,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const item = state.find((item) => item.id === product.id);

      if (item) {
        item.quantity = (item.quantity || 1) + 1;
      } else {
        state.push({ ...product, quantity: 1 });
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        item.quantity = (item.quantity || 1) + 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);

      if (item) {
        item.quantity = (item.quantity || 1) - 1;
      }

      return state.filter((item) => item.quantity > 0);
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    clearCart: () => [],
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
