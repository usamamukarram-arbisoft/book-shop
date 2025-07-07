import "@testing-library/jest-dom";

import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { Messages } from "../../Utility/CommonMessages";
import { addToCart } from "../AddToCart/AddtoCartslice";
import NotFound from "../NotFound/NotFound";
import BookDetail from "./Bookdetail";

jest.mock("../AddToCart/AddtoCartslice", () => ({
  addToCart: jest.fn((product) => ({ type: "ADD_TO_CART", payload: product })),
}));

const getMockStore = () => configureStore({ reducer: (state = {}) => state });
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockBook = {
  bookId: 1,
  title: "Mock Book Title",
  author: "Mock Author",
  category: "Mock Genre",
  price_usd: 25,
  available_books: 7,
  description: "Mock book description.",
  image_url: "https://example.com/image.jpg",
};

describe("BookDetail component", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = getMockStore();
    store.dispatch = jest.fn();
  });

  const renderWithRouterAndState = (book = mockBook) =>
    render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/books/1", state: { product: book } }]}
        >
          <Routes>
            <Route path="/books/1" element={<BookDetail />} />
            <Route path="/notfound" element={<div>404 Not Found</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

  test("renders book details correctly", () => {
    renderWithRouterAndState();

    expect(screen.getByText(mockBook.title)).toBeInTheDocument();
    expect(screen.getByText(mockBook.author)).toBeInTheDocument();
    expect(screen.getByText(mockBook.category)).toBeInTheDocument();
    expect(screen.getByText(`$${mockBook.price_usd}`)).toBeInTheDocument();
    expect(screen.getByText(mockBook.description)).toBeInTheDocument();
  });

  test("calls navigate('/') when back button is clicked", async () => {
    renderWithRouterAndState();

    const backButton = screen.getByText(Messages.productDetails.back.value);
    await userEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("dispatches addToCart when 'Add to Cart' button is clicked", async () => {
    renderWithRouterAndState();

    const addButton = screen.getByText(Messages.productCard.addToCart.value);
    await userEvent.click(addButton);

    expect(store.dispatch).toHaveBeenCalledWith(addToCart(mockBook));
  });
  test("render NotFound component when book is not found", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/books/999"]}>
          <Routes>
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/notfound" element={<NotFound />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(Messages.notFound.title.value)).toBeInTheDocument();
    expect(
      screen.getByText(Messages.notFound.message.value)
    ).toBeInTheDocument();
  });
});
