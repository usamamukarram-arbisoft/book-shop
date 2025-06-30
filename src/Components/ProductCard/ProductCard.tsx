import "./ProductCard.css";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { ProductCardProps } from "../../Types/Types";
import { Messages } from "../../Utility/CommonMessages";
import { addToCart } from "../AddToCart/AddtoCartslice";
import CommonConfirmation from "../CommonConfirmationModal/CommonConfirmation";

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const handleGoToDetails = () => {
    navigate(`/books/${product.bookId}`, { state: { product } });
  };
  const handleAddToCart = () => {
    if (product.available_books === 0) {
      setOpenDialog(true);
    } else {
      dispatch(addToCart(product));
    }
  };
  return (
    <>
      <div className="col-md-4 mb-4">
        <div className="featured-product-card">
          <img className="featured-product-image" src={product.image_url} />

          <div className="featured-product-details">
            <h3 className="mb-3 text-truncate">{product.title}</h3>
            <h6 className="card-subtitle text-truncate mb-2 text-body-secondary">
              {product.author}
            </h6>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {product.category}
            </h6>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {Messages.productDetails.quantity.value}:{product.available_books}
            </h6>
            <p className="mb-3">{product.description}</p>
            <div className="d-flex justify-content-between  checkout align-items-center">
              <a className="btn btn-primary me-3" onClick={handleGoToDetails}>
                {Messages.productCard.viewDetails.value}
              </a>
              <a className="btn btn-primary" onClick={handleAddToCart}>
                {Messages.productCard.addToCart.value}
              </a>
            </div>
          </div>
        </div>
      </div>
      <CommonConfirmation
        openDialog={openDialog}
        title={Messages.outOfStock.title.value}
        message={Messages.outOfStock.message.value}
        IsDisplayBtn={false}
        handleClose={() => {
          setOpenDialog(false);
        }}
      />
    </>
  );
};

export default ProductCard;
