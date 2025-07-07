import "./products.css";

import { useEffect, useState } from "react";
import React from "react";

import type { Books } from "../../Types/Types";
import { fetchBooks } from "../../Utility/Api/Api";
import { Messages } from "../../Utility/CommonMessages";
import CommonConfirmation from "../CommonConfirmationModal/CommonConfirmation";
import Pagination from "../Pagination/Pagination";
import ProductCard from "../ProductCard/ProductCard";
const Products = () => {
  const [BooksListing, setBooksListing] = useState<Books[]>([]);
  const [currentItems, setCurrentItems] = useState<Books[]>([]);

  const sampleProducts = BooksListing;

  const [openDialog, setOpenDialog] = useState(false);
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
          <ProductCard
            key={product.bookId}
            product={product}
            setOpenDialog={setOpenDialog}
          />
        ))}
      </div>
      <Pagination
        sampleProducts={sampleProducts}
        onPageChange={handleUpdatedList}
      />
      <CommonConfirmation
        openDialog={openDialog}
        title={Messages.outOfStock.title.value}
        message={Messages.outOfStock.message.value}
        IsDisplayBtn={false}
        handleClose={() => {
          setOpenDialog(false);
        }}
      />
    </div>
  );
};

export default Products;
