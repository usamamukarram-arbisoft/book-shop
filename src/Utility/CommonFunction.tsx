export function pagination<T>(
  items: T[],
  currentPage: number,
  pageSize: number
): { currentItems: T[]; pages: number } {
  const startingIndex = currentPage * pageSize;
  const endingIndex = startingIndex + pageSize;
  const displayItemsPerPage = items.slice(startingIndex, endingIndex);

  const totalPages = Math.ceil(items.length / pageSize);

  return {
    currentItems: displayItemsPerPage,
    pages: totalPages,
  };
}
