import React from "react";
import { useNavigate } from "react-router-dom";

import { Messages } from "../../../Utility/CommonMessages";

function EmptyCart() {
  const navigate = useNavigate();
  return (
    <div className="custom-bg text-dark">
      <div className="d-flex align-items-center justify-content-center min-vh-100 px-2">
        <div className="text-center">
          <i className="display-1 fw-bold bi bi-cart-x-fill"></i>
          <p className="fs-2 fw-medium mt-4">
            {Messages.emptyCart.emptyCartTitle.value}
          </p>
          <p className="mt-4 mb-5">{Messages.emptyCart.emptyCartTexy.value}</p>
          <a
            onClick={() => {
              navigate("/books");
            }}
            className="btn btn-light fw-semibold rounded px-4 py-2 custom-btn"
          >
            {Messages.productDetails.back.value}
          </a>
        </div>
      </div>
    </div>
  );
}

export default EmptyCart;
