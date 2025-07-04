import React from "react";
import { useDispatch } from "react-redux";

import type { cartItemProps } from "../../../Types/Types";
import { Messages } from "../../../Utility/CommonMessages";
import {
  decrementQuantity,
  deleteItem,
  incrementQuantity,
} from "../AddtoCartslice";

const CardProduct = (product: cartItemProps) => {
  const dispatch = useDispatch();

  return (
    <div key={product.item.bookId} className="row cart-item mb-3">
      <div className="col-md-3">
        <img
          src={product.item.image_url}
          alt={product.item.title}
          className="img-fluid rounded"
        />
      </div>
      <div className="col-md-4">
        <h5 className="card-title">{product.item.title}</h5>
        <p className="text-muted">
          {Messages.checkOutPage.itemCategory.value}: {product.item.category}
        </p>
      </div>
      <div className="col-md-3">
        <div className="input-group">
          <button
            className="btn btn-outline-secondary btn-sm"
            type="button"
            onClick={() =>
              dispatch(decrementQuantity({ bookId: product.item.bookId }))
            }
          >
            -
          </button>
          <input
            type="text"
            className="form-control  form-control-sm text-center quantity-input"
            value={product.item.quantity}
            readOnly
          />
          <button
            className="btn btn-outline-secondary btn-sm"
            type="button"
            onClick={() => {
              dispatch(incrementQuantity({ bookId: product.item.bookId }));
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className="col-md-2 text-end">
        <p className="fw-bold">${product.item.totalPrice.toFixed(2)}</p>
        <button className="btn btn-sm btn-outline-danger">
          <i
            className="bi bi-trash"
            data-testid="remove-from-cart"
            onClick={() =>
              dispatch(deleteItem({ bookId: product.item.bookId }))
            }
          ></i>
        </button>
      </div>
      <div className="border-bottom mt-3"></div>
    </div>
  );
};

export default CardProduct;
