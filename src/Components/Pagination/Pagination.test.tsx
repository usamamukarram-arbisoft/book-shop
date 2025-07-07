import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import { PAGINATION_CONSTANT } from "../../Utility/CommonConstants";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  test("navigates pages properly when multiple pages exist", async () => {
    const onPageChange = jest.fn();

    const sampleProducts = Array.from({ length: 15 }, (_, i) => ({
      bookId: i + 1,
      title: `Book ${i + 1}`,
      description: `Description for Book ${i + 1}`,
      author: `Author ${i + 1}`,
      category: `Category ${i + 1}`,
      image_url: `https://example.com/book${i + 1}.jpg`,
      price: 10 + i,
      rating: 4.5,
      stock: 20 - i,
      publisher: `Publisher ${i + 1}`,
      available_books: 5 + i,
      price_usd: (10 + i) * 1.1,
      pages: 100 + i * 10,
      quantity: 1,
      totalPrice: 10 + i,
    }));

    render(
      <Pagination sampleProducts={sampleProducts} onPageChange={onPageChange} />
    );

    const totalPages = Math.ceil(
      sampleProducts.length / PAGINATION_CONSTANT.ITEMS_PER_PAGE
    );

    expect(totalPages).toBeGreaterThan(1);

    const page2 = await screen.findByText("2");
    await userEvent.click(page2);

    expect(onPageChange).toHaveBeenCalledTimes(2);
    expect(onPageChange.mock.calls[1][0][0].title).toBe("Book 11");

    const prevButton = screen.getByText("Previous");
    await userEvent.click(prevButton);
    expect(onPageChange).toHaveBeenCalledTimes(3);
    expect(onPageChange.mock.calls[2][0][0].title).toBe("Book 1");

    const nextButton = screen.getByText("Next");
    await userEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledTimes(4);
    expect(onPageChange.mock.calls[3][0][0].title).toBe("Book 11");
  });
});
