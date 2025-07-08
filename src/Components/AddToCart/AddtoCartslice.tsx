import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../../Store/Store";
import type { AddToCartState } from "../../Types/Types";

const initialState: AddToCartState = {
  items: [],
  openDrawer: false,
  error: "",
};

const AddToCartSlice = createSlice({
  name: "addToCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (items) => items.bookId == newItem.bookId
      );
      if (action.payload.available_books === 0) {
        return;
      }
      if (existingItem) {
        if (existingItem.quantity < existingItem.available_books) {
          existingItem.quantity += 1;
          existingItem.totalPrice =
            existingItem.price_usd * existingItem.quantity;
        }
      } else {
        // newItem.totalPrice = newItem.price_usd;
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price_usd,
        });
      }
    },
    openDrawer: (state) => {
      state.openDrawer = true;
    },
    closeDrawer: (state) => {
      state.openDrawer = false;
    },
    decrementQuantity: (state, action) => {
      const bookId = action.payload.bookId;
      const existingItem = state.items.find((item) => item.bookId === bookId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          existingItem.totalPrice =
            existingItem.price_usd * existingItem.quantity;
        } else {
          state.items = state.items.filter((item) => item.bookId !== bookId);
        }
      }
    },
    incrementQuantity: (state, action) => {
      const bookId = action.payload.bookId;
      const existingItem = state.items.find((item) => item.bookId === bookId);
      if (existingItem) {
        if (existingItem.quantity < existingItem.available_books) {
          existingItem.quantity += 1;
          existingItem.totalPrice =
            existingItem.price_usd * existingItem.quantity;
        }
      }
    },
    deleteItem: (state, action) => {
      const bookId = action.payload.bookId;
      state.items = state.items.filter((item) => item.bookId !== bookId);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  openDrawer,
  closeDrawer,
  addToCart,
  incrementQuantity,
  decrementQuantity,
  deleteItem,
  clearCart,
} = AddToCartSlice.actions;
export const selectTotalItems = (state: RootState) =>
  state.drawer.items.reduce((total, item) => total + item.quantity, 0);
export default AddToCartSlice.reducer;
