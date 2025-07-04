import { render, screen, waitFor } from "@testing-library/react";
import React, { useEffect } from "react";

import { fetchBooks } from "../../Utility/Api/Api";
import Products from "./Products";

jest.mock(
  "../ProductCard/ProductCard",
  () =>
    ({
      product,
      setOpenDialog,
    }: {
      product: { title: string; available_books: number };
      setOpenDialog: (open: boolean) => void;
    }) =>
      (
        <div data-testid="product-card">
          {product.title}
          <button
            data-testid="add-to-cart"
            onClick={() => {
              if (product.available_books === 0) setOpenDialog(true);
            }}
          >
            Add to Cart
          </button>
        </div>
      )
);

jest.mock(
  "../Pagination/Pagination",
  () =>
    ({
      sampleProducts,
      onPageChange,
    }: {
      sampleProducts: Array<{ [key: string]: unknown }>;
      onPageChange: (products: Array<{ [key: string]: unknown }>) => void;
    }) => {
      useEffect(() => {
        if (sampleProducts?.length) {
          onPageChange(sampleProducts.slice(0, 2));
        }
      }, [sampleProducts, onPageChange]);

      return <div data-testid="pagination">Pagination Component</div>;
    }
);

jest.mock(
  "../CommonConfirmationModal/CommonConfirmation",
  () =>
    ({ openDialog }: { openDialog: boolean }) =>
      openDialog ? <div data-testid="confirmation-modal">Modal Open</div> : null
);

jest.mock("../../Utility/Api/Api", () => ({
  fetchBooks: jest.fn(),
}));

describe("Products component", () => {
  const mockBooks = [
    { bookId: "1", title: "Book One", available_books: 5 },
    { bookId: "2", title: "Book Two", available_books: 3 },
    { bookId: "3", title: "Book Three", available_books: 0 },
  ];

  beforeEach(() => {
    (fetchBooks as jest.Mock).mockResolvedValue(mockBooks);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("calls fetchBooks on mount and renders product cards and pagination", async () => {
    render(<Products />);

    await waitFor(() => {
      expect(fetchBooks).toHaveBeenCalledTimes(1);
    });

    const cards = await screen.findAllByTestId("product-card");
    expect(cards).toHaveLength(2);

    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });
});
