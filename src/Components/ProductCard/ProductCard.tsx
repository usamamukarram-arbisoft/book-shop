import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ProductCard.css";
function ProductCard({ product }: any) {
  const navigate = useNavigate();

  const handleGoToDetails = () => {
    navigate(`/books/${product.bookId}`, { state: { product } });
  };
  return (
    <div>
      <div className="card card-width">
        <img src={product.image_url} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title text-truncate"> {product.title}</h5>
          <h6 className="card-subtitle text-truncate mb-2 text-body-secondary">
            {product.author}
          </h6>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {product.category}
          </h6>

          <p className="card-text">{product.description}</p>
          <div className="checkout">
            <a className="btn btn-primary" onClick={handleGoToDetails}>
              View Details
            </a>
            <a className="btn btn-primary" onClick={handleGoToDetails}>
              Add to Cart
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
