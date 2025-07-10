import { createSlice } from "@reduxjs/toolkit";

import type { Books } from "../../Types/Types";

const initialState = {
  items: [],
  filterItems: [],
};

const ProductSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    setProducts(state, Action) {
      state.items = Action.payload;
    },
    filterProducts(state, action) {
      state.filterItems = state.items.filter(
        (book: Books) =>
          book.category === action?.payload?.category &&
          book.bookId !== action?.payload?.bookId
      );
    },
  },
});

export const { setProducts, filterProducts } = ProductSlice.actions;
export default ProductSlice.reducer;
