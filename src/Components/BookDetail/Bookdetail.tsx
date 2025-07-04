import "./BookDetails.css";

import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { Messages } from "../../Utility/CommonMessages";
import { addToCart } from "../AddToCart/AddtoCartslice";

const BookDetail = () => {
  const location = useLocation().state;
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(`/`);
  };
  const dispatch = useDispatch();

  const book = location?.product;
  const handleAddToCart = () => {
    dispatch(addToCart(book));
  };
  if (!book) return <Navigate to="/notfound" />;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card img-card ">
            <img
              src={book.image_url}
              className="card-img-top h-100"
              alt="Product Image"
            />
          </div>
        </div>

        <div className="col-md-6">
          <h2 className="mb-3">{book.title}</h2>
          <h6 className=" mb-2 text-body-secondary">
            <strong>{Messages.productDetails.author.value}: </strong>
            {book.author}
          </h6>
          <h6 className=" mb-2 text-body-secondary">
            <strong>{Messages.productDetails.genre.value}: </strong>
            {book.category}
          </h6>
          <div className="mb-3">
            <span className="h4 me-2">
              {Messages.productDetails.price.value}:
            </span>
            <span className="text-muted">${book.price_usd}</span>
          </div>
          <div className="mb-3">
            <span className="me-2">
              <strong>{Messages.productDetails.quantity.value}:</strong>
            </span>
            <span className="text-muted">{book.available_books}</span>
          </div>
          <p className="mb-1">
            <strong>{Messages.productDetails.description.value}:</strong>
          </p>
          <p className="ms-3 mb-4">{book.description}</p>

          <div className="checkout">
            <a className="btn btn-primary me-5" onClick={handleBack}>
              {Messages.productDetails.back.value}
            </a>
            <a className="btn btn-primary" onClick={handleAddToCart}>
              <i className="bi bi-cart-plus" data-testid="add-to-cart"></i>
              {Messages.productCard.addToCart.value}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
