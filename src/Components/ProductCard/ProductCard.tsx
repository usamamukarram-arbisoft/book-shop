import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import type { ProductCardProps } from "../../Types/Types";
import { Messages } from "../../Utility/CommonMessages";

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleGoToDetails = () => {
    navigate(`/books/${product.bookId}`, { state: { product } });
  };
  return (
    <div className="col-md-4 mb-4">
      <div className="featured-product-card">
        <img className="featured-product-image" src={product.image_url}></img>

        <div className="featured-product-details">
          <h3 className="mb-3 text-truncate">{product.title}</h3>
          <h6 className="card-subtitle text-truncate mb-2 text-body-secondary">
            {product.author}
          </h6>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {product.category}
          </h6>
          <p className="mb-3">{product.description}</p>
          <div className="d-flex justify-content-between  checkout align-items-center">
            <a className="btn btn-primary me-3" onClick={handleGoToDetails}>
              {Messages.productCard.viewDetails.value}
            </a>
            <a className="btn btn-primary" onClick={handleGoToDetails}>
              {Messages.productCard.addToCart.value}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
