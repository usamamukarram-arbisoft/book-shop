import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./products.css";
import type { Books } from "../../Types/Types";
import { fetchBooks } from "../../Utility/Api";
import Pagination from "../Pagination/Pagination";
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
          <div className="col-md-4 mb-4" key={product.bookId}>
            <ProductCard product={product} />
          </div>
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
