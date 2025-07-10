import React from "react";

import type { Books, SimilarProductsProps } from "../../Types/Types";
import { Messages } from "../../Utility/CommonMessages";
import ProductCard from "../ProductCard/ProductCard";

const SimilarProducts = ({
  similarProducts,
  setOpenDialog,
}: SimilarProductsProps) => {
  return (
    <div className="container mt-5 ">
      <h2 className="mb-4">{Messages.productDetails.similarBooks.value}</h2>
      <div className="row justify-content-center">
        {similarProducts.slice(0, 3).map((product: Books) => (
          <ProductCard
            key={product.bookId}
            product={product}
            setOpenDialog={setOpenDialog}
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
