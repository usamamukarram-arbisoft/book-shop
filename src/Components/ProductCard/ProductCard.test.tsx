import "@testing-library/jest-dom";

import { fireEvent,render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";

import { store } from "../../Store/Store";
import { Messages } from "../../Utility/CommonMessages";
import { addToCart } from "../AddToCart/AddtoCartslice";
import ProductCard from "./ProductCard";

const mockProduct = {
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
const mockSetOpenDialog = jest.fn();
const mockNavigate = jest.fn();
const mockDispatch = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("ProductCard Component", () => {
  test("renders product details", () => {
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} setOpenDialog={mockSetOpenDialog} />
      </Provider>
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Author")).toBeInTheDocument();
    expect(screen.getByText("Test Category")).toBeInTheDocument();
    expect(screen.getByText(/A test product description./)).toBeInTheDocument();
  });

  test("navigates to product details page on click", () => {
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} setOpenDialog={mockSetOpenDialog} />
      </Provider>
    );
    const detailButton = screen.getByText(
      Messages.productCard.viewDetails.value
    );

    fireEvent.click(detailButton);
    expect(mockNavigate).toHaveBeenCalledWith(`/books/${mockProduct.bookId}`, {
      state: { product: mockProduct },
    });
  });

  test("opens dialog when available_books is 0", async () => {
    const zeroProduct = { ...mockProduct, available_books: 0 };
    render(
      <Provider store={store}>
        <ProductCard product={zeroProduct} setOpenDialog={mockSetOpenDialog} />
      </Provider>
    );
    const cartBtn = screen.getByTestId("add-to-cart");
    await userEvent.click(cartBtn);
    expect(mockSetOpenDialog).toHaveBeenCalledWith(true);
  });
  test("adds product to cart when available_books is greater than 0", async () => {
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} setOpenDialog={mockSetOpenDialog} />
      </Provider>
    );
    const cartBtn = screen.getByTestId("add-to-cart");
    await userEvent.click(cartBtn);
    expect(mockDispatch).toHaveBeenCalledWith(addToCart(mockProduct));
  });
});
