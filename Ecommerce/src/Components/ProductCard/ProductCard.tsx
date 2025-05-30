import React from "react";
import "./ProductCard.css";
function ProductCard({ product }: any) {
  return (
    <div>
      <div className="card card-width">
        <img src={product.image_url} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title"> {product.title}</h5>
          <p className="card-text">{product.description}</p>
          <div className="checkout">
            <a href="#" className="btn btn-primary">
              View Details
            </a>
            <a href="#" className="btn btn-primary">
              Add to Cart
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
