import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";

import Navbar from "./navbar";
import SignInReducer, { logout } from "../SignIn/SinginSlice";
import addtocardreducer from "../AddToCart/AddtoCartslice";

jest.mock("../SignIn/SinginSlice", () => {
  const actual = jest.requireActual("../SignIn/SinginSlice");
  return {
    __esModule: true,
    default: actual.default,
    ...actual,
    logout: jest.fn(() => ({ type: "SignIn/logout" })),
  };
});

const renderWithStore = (store: any) =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </Provider>
  );

describe("Navbar Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders user greeting and no login when logged in", () => {
    const mockStore = configureStore({
      reducer: { auth: SignInReducer, drawer: addtocardreducer },
      preloadedState: {
        auth: {
          user: {
            email: "test@example.com",
            password: "password",
            username: "testuser",
          },
          isLoggedIn: true,
        },
        drawer: {
          items: [
            {
              bookId: 1,
              title: "The Goldfinch",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              author: "Margaret Atwood, Neil Gaiman",
              category: "Historical Fiction",
              image_url: "https://picsum.photos/seed/book1/200/300",
              available_books: 7,
              price_usd: 33.86,
              pages: 330,
              quantity: 1,
              totalPrice: 33.86,
            },
            {
              bookId: 2,
              title: "Talking to Strangers",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              author: "J.R.R. Tolkien",
              category: "Adventure",
              image_url: "https://picsum.photos/seed/book2/200/300",
              available_books: 0,
              price_usd: 40.0,
              pages: 636,
              quantity: 2,
              totalPrice: 80.0,
            },
          ],
          openDrawer: false,
          error: "",
        },
      },
    });

    renderWithStore(mockStore);

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cart/i })).toBeInTheDocument();

    expect(screen.getByText(/hi testuser/i)).toBeInTheDocument();

    expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
  });

  test("renders user greeting and no login when logged in", () => {
    const mockStore = configureStore({
      reducer: { auth: SignInReducer, drawer: addtocardreducer },
      preloadedState: {
        auth: {
          user: {
            email: "test@example.com",
            password: "password",
            username: "testuser",
          },
          isLoggedIn: true,
        },
        drawer: {
          items: [
            {
              bookId: 1,
              title: "The Goldfinch",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              author: "Margaret Atwood, Neil Gaiman",
              category: "Historical Fiction",
              image_url: "https://picsum.photos/seed/book1/200/300",
              available_books: 7,
              price_usd: 33.86,
              pages: 330,
              quantity: 1,
              totalPrice: 33.86,
            },
            {
              bookId: 2,
              title: "Talking to Strangers",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              author: "J.R.R. Tolkien",
              category: "Adventure",
              image_url: "https://picsum.photos/seed/book2/200/300",
              available_books: 0,
              price_usd: 40.0,
              pages: 636,
              quantity: 2,
              totalPrice: 80.0,
            },
          ],
          openDrawer: true,
          error: "",
        },
      },
    });

    renderWithStore(mockStore);
    expect(screen.getByText(/hi testuser/i)).toBeInTheDocument();
    expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
  });

  test("user name calls logout action", async () => {
    const mockStore = configureStore({
      reducer: { auth: SignInReducer, drawer: addtocardreducer },
      preloadedState: {
        auth: {
          user: {
            email: "test@example.com",
            password: "password",
            username: "testuser",
          },
          isLoggedIn: true,
        },
        drawer: {
          items: [
            {
              bookId: 1,
              title: "The Goldfinch",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              author: "Margaret Atwood, Neil Gaiman",
              category: "Historical Fiction",
              image_url: "https://picsum.photos/seed/book1/200/300",
              available_books: 7,
              price_usd: 33.86,
              pages: 330,
              quantity: 1,
              totalPrice: 33.86,
            },
            {
              bookId: 2,
              title: "Talking to Strangers",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              author: "J.R.R. Tolkien",
              category: "Adventure",
              image_url: "https://picsum.photos/seed/book2/200/300",
              available_books: 0,
              price_usd: 40.0,
              pages: 636,
              quantity: 2,
              totalPrice: 80.0,
            },
          ],
          openDrawer: true,
          error: "",
        },
      },
    });

    renderWithStore(mockStore);
    expect(screen.getByText(/hi testuser/i)).toBeInTheDocument();
    expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByText(/hi testuser/i));

    await waitFor(() => {
      expect(logout).toHaveBeenCalled();
    });
  });
  test("open drawer on cart icon click", () => {
    // const dispatchSpy = jest.spyOn(store, "dispatch");
    const mockStore = configureStore({
      reducer: { auth: SignInReducer, drawer: addtocardreducer },
      preloadedState: {
        drawer: {
          items: [],
          openDrawer: true,
          error: "",
        },
      },
    });

    renderWithStore(mockStore);
    const cartIcon = screen.getByRole("link", { name: /cart/i });
    fireEvent.click(cartIcon);

    expect(mockStore.getState().drawer.openDrawer).toBe(true);
  });
});
