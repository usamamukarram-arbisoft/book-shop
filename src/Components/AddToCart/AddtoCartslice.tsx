import { createSlice } from "@reduxjs/toolkit";
import type { Books } from "../../Types/Types";
import type { RootState } from "../../Store/Store";

type CartItem = {
  books: Books;
};

interface AddToCartState {
  item: CartItem["books"][];
  openDrawer: boolean;
}

const initialState: AddToCartState = {
  item: [],
  openDrawer: false,
};

const AddToCartSlice = createSlice({
  name: "addToCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.item.find(
        (item) => item.bookId == newItem.bookId
      );
      if (action.payload.available_books === 0) {
        alert("This book is out of stock.");
        return;
      }
      if (existingItem) {
        if (existingItem.quantity < existingItem.available_books) {
          existingItem.quantity += 1;
          existingItem.totalPrice =
            existingItem.price_usd * existingItem.quantity;
        }
      } else {
        newItem.totalPrice = newItem.price_usd;
        state.item.push({ ...newItem, quantity: 1 });
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
      const existingItem = state.item.find((item) => item.bookId === bookId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          existingItem.totalPrice =
            existingItem.price_usd * existingItem.quantity;
        } else {
          state.item = state.item.filter((item) => item.bookId !== bookId);
        }
      }
    },
    IncrementQuantity: (state, action) => {
      const bookId = action.payload.bookId;
      const existingItem = state.item.find((item) => item.bookId === bookId);
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
      state.item = state.item.filter((item) => item.bookId !== bookId);
    },
    clearCart: (state) => {
      state.item = [];
    },
  },
});

export const {
  openDrawer,
  closeDrawer,
  addToCart,
  IncrementQuantity,
  decrementQuantity,
  deleteItem,
  clearCart,
} = AddToCartSlice.actions;
export const selectTotalItems = (state: RootState) =>
  state.drawer.item.reduce((total, item) => total + item.quantity, 0);
export default AddToCartSlice.reducer;
