import React, { useEffect, useState } from "react";
import type { Books, PaginationProps } from "../../Types/Types";
import { pagination } from "../../Utility/CommonFunction";
import { Messages } from "../../Utility/CommonMessages";

const Pagination = ({ sampleProducts, onPageChange }: PaginationProps) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const { currentItems, pages } = pagination<Books>(
    sampleProducts,
    currentPage,
    itemsPerPage
  );
  useEffect(() => {
    if (sampleProducts.length > 0) {
      onPageChange(currentItems);
    }
  }, [currentPage, sampleProducts]);

  return (
    <ul className="pagination justify-content-center mt-3">
      <li className={`page-item ${currentPage === 1 && "disabled"}`}>
        <a
          className="page-link"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {Messages.pagination.Previous.value}
        </a>
      </li>

      {[...Array(pages)].map((_, index) => (
        <li
          key={`page-item-${index}`}
          className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
        >
          <a className="page-link" onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </a>
        </li>
      ))}

      <li className={`page-item ${currentPage === pages && "disabled"}`}>
        <a
          className="page-link"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {Messages.pagination.Next.value}
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
