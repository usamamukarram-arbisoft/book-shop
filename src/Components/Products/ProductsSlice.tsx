import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const ProductSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    setProducts(state, Action) {
      state.items = Action.payload;
    },
  },
});

export const { setProducts } = ProductSlice.actions;
export default ProductSlice.reducer;
