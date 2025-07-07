import { AddToCartState } from "../../Types/Types";
import reducer, { addToCart, closeDrawer, openDrawer } from "./AddtoCartslice";

describe("AddToCartSlice Component", () => {
  const initialState: AddToCartState = {
    items: [],
    openDrawer: false,
    error: "",
  };

  const book = {
    id: 1,
    bookId: 1,
    title: "Test Product",
    price: 99.99,
    description: "A test product description.",
    author: "Test Author",
    category: "Test Category",
    image_url: "https://example.com/image.jpg",
    available_books: 10,
    price_usd: 99.99,
    pages: 300,
    publisher: "Test Publisher",
    publication_date: "2024-01-01",
    quantity: 1,
    totalPrice: 99.99,
  };

  test("return initial state", () => {
    const state = initialState;
    expect(state).toEqual({
      items: [],
      openDrawer: false,
      error: "",
    });
  });

  test("handle open Drawer", () => {
    const newState = reducer(initialState, openDrawer());
    expect(newState.openDrawer).toBe(true);
  });
  test("handle close Drawer", () => {
    const state = { ...initialState, openDrawer: true };
    const newState = reducer(state, closeDrawer());
    expect(newState.openDrawer).toBe(false);
  });

  test("handle AddTo cart action", () => {
    const newState = reducer(initialState, addToCart(book));
    expect(newState.items).toContainEqual(book);
  });

  test("handle AddTo cart action with existing item", () => {
    const stateWithItem = {
      ...initialState,
      items: [book],
    };
    const newState = reducer(stateWithItem, addToCart(book));
    expect(newState.items[0].quantity).toBe(2);
    expect(newState.items[0].totalPrice).toBe(book.price_usd * 2);
  });

  test("handle AddTo cart action with available books 0", () => {
    const bookWithNoStock = { ...book, available_books: 0 };
    const newState = reducer(initialState, addToCart(bookWithNoStock));
    expect(newState.items).toEqual([]);
  });
  test("handle AddTo cart action with existing item and quantity less than available books", () => {
    const existingItem = {
      ...book,
      quantity: 1,
      available_books: 5,
      totalPrice: book.price_usd * 1,
    };
    const stateWithExistingItem = {
      ...initialState,
      items: [existingItem],
    };
    const newState = reducer(stateWithExistingItem, addToCart(book));
    expect(newState.items[0].quantity).toBe(2);
    expect(newState.items[0].totalPrice).toBe(book.price_usd * 2);
  });

  test("handle incrementQuantity action", () => {
    const stateWithItem = {
      ...initialState,
      items: [book],
    };
    const newState = reducer(stateWithItem, {
      type: "addToCart/incrementQuantity",
      payload: { bookId: book.bookId },
    });
    expect(newState.items[0].quantity).toBe(2);
    expect(newState.items[0].totalPrice).toBe(book.price_usd * 2);
  });
  test("handle decrementQuantity action when quantity > 1", () => {
    const stateWithItem = {
      ...initialState,
      items: [{ ...book, quantity: 2, totalPrice: book.price_usd * 2 }],
    };
    const newState = reducer(stateWithItem, {
      type: "addToCart/decrementQuantity",
      payload: { bookId: book.bookId },
    });
    expect(newState.items[0].quantity).toBe(1);
    expect(newState.items[0].totalPrice).toBe(book.price_usd * 1);
  });

  test("handle decrementQuantity action when quantity === 1", () => {
    const stateWithItem = {
      ...initialState,
      items: [{ ...book, quantity: 1, totalPrice: book.price_usd * 1 }],
    };
    const newState = reducer(stateWithItem, {
      type: "addToCart/decrementQuantity",
      payload: { bookId: book.bookId },
    });
    expect(newState.items).toEqual([]);
  });

  test("handle decrementQuantity action when item does not exist", () => {
    const stateWithNoItem = {
      ...initialState,
      items: [],
    };
    const newState = reducer(stateWithNoItem, {
      type: "addToCart/decrementQuantity",
      payload: { bookId: book.bookId },
    });
    expect(newState.items).toEqual([]);
  });

  test("handle delete item action", () => {
    const stateWithItem = {
      ...initialState,
      items: [book],
    };
    const newState = reducer(stateWithItem, {
      type: "addToCart/deleteItem",
      payload: { bookId: book.bookId },
    });
    expect(newState.items).toEqual([]);
  });
  test("handle clear cart action", () => {
    const stateWithItems = {
      ...initialState,
      items: [book],
    };
    const newState = reducer(stateWithItems, {
      type: "addToCart/clearCart",
    });
    expect(newState.items).toEqual([]);
  });
});
