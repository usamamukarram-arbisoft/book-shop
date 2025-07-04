import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { deleteItem } from "../AddtoCartslice";
import CartProduct from "./CartProduct";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));
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

describe("CartProduct", () => {
  test("renders product details", () => {
    render(<CartProduct item={mockProduct} />);

    expect(
      screen.getByText((_, element) => element?.textContent === "Test Product")
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        (_, element) => element?.textContent?.replace(/\s/g, "") === "$99.99"
      ).length
    ).toBeGreaterThan(0);
  });

  test("dispatches removeFromCart action on button click", () => {
    render(<CartProduct item={mockProduct} />);

    const removeButton = screen.getByTestId("remove-from-cart");
    fireEvent.click(removeButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      deleteItem({ bookId: mockProduct.bookId })
    );
  });
  test("increments and decrements quantity", () => {
    render(<CartProduct item={mockProduct} />);

    const incrementButton = screen.getByText("+");
    const decrementButton = screen.getByText("-");

    fireEvent.click(incrementButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "addToCart/incrementQuantity",
      payload: { bookId: mockProduct.bookId },
    });

    fireEvent.click(decrementButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "addToCart/decrementQuantity",
      payload: { bookId: mockProduct.bookId },
    });
  });
});
