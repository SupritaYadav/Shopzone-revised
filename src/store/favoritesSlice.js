import { createSlice } from "@reduxjs/toolkit";

const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: savedFavorites,
  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload;
      const alreadySaved = state.some((item) => item.id === product.id);

      if (alreadySaved) {
        return state.filter((item) => item.id !== product.id);
      }

      state.push(product);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
