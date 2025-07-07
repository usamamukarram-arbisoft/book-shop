import { pagination } from "./CommonFunction";

describe("pagination", () => {
  test(" correct items and total pages", () => {
    const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);
    const currentPage = 2;
    const pageSize = 10;

    const { currentItems, pages } = pagination(items, currentPage, pageSize);

    expect(currentItems).toEqual([
      "Item 11",
      "Item 12",
      "Item 13",
      "Item 14",
      "Item 15",
      "Item 16",
      "Item 17",
      "Item 18",
      "Item 19",
      "Item 20",
    ]);
    expect(pages).toBe(5);
  });
});
