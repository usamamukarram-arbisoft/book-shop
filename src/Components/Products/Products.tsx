import "./products.css";

import { useEffect, useState } from "react";

import type { Books } from "../../Types/Types";
import { fetchBooks } from "../../Utility/Api";
import Pagination from "../Pagination/Pagination";
import ProductCard from "../ProductCard/ProductCard";
const Products = () => {
  const [BooksListing, setBooksListing] = useState<Books[]>([]);
  const [currentItems, setCurrentItems] = useState<Books[]>([]);

  const sampleProducts = BooksListing;
  useEffect(() => {
    fetchBooks().then((data) => {
      setBooksListing(data);
    });
  }, []);
  const handleUpdatedList = (updatedList: Books[]) => {
    setCurrentItems(updatedList);
  };

  return (
    <div className="container flex-wrap mt-4">
      <div className="row justify-content-center">
        {currentItems.map((product) => (
          <ProductCard key={product.bookId} product={product} />
        ))}
      </div>
      <Pagination
        sampleProducts={sampleProducts}
        onPageChange={handleUpdatedList}
      />
    </div>
  );
};

export default Products;
