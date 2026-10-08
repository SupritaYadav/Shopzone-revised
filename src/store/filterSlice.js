import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  category: "all",
  minPrice: 0,
  maxPrice: 1000,
  minRating: 0,
  sortBy: "default",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setMinRating: (state, action) => {
      state.minRating = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setSearch,
  setCategory,
  setMinPrice,
  setMaxPrice,
  setMinRating,
  setSortBy,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
