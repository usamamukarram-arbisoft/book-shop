import React, { useEffect, useState } from "react";
import type { Books } from "../../Types/Types";
import { pagination } from "../../Utility/CommonFunction";

interface PaginationProps {
  sampleProducts: Books[];
  onPageChange: (updatedBooks: Books[]) => void;
}
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
    <div>
      <ul className="pagination justify-content-center mt-3">
        <li className={`page-item ${currentPage === 1 && "disabled"}`}>
          <a
            className="page-link"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </a>
        </li>

        {[...Array(pages)].map((_, index) => (
          <li
            key={index}
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
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
