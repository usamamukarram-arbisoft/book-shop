import "./Pagination.css";

import { useEffect, useState } from "react";

import type { PaginationProps } from "../../Types/Types";
import { PAGINATION_CONSTANT } from "../../Utility/CommonConstants";
import { pagination } from "../../Utility/CommonFunction";
import { Messages } from "../../Utility/CommonMessages";

const Pagination = ({ sampleProducts, onPageChange }: PaginationProps) => {
  const pageSize = PAGINATION_CONSTANT.ITEMS_PER_PAGE;
  const [currentPage, setCurrentPage] = useState(1);
  const { currentItems, pages } = pagination(
    sampleProducts,
    currentPage,
    pageSize
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
          {Messages.pagination.previous.value}
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
          {Messages.pagination.next.value}
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
