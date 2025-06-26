import { Messages } from "../../../Utility/CommonMessages";
import type { cartSummary } from "../../../Types/Types";

const CartSummary = ({
  subtotal,
  shipping,
  tax,
  grandTotal,
  goToCheckout,
}: cartSummary) => {
  return (
    <div className="card cart-summary">
      <div className="card-body">
        <h5 className="card-title mb-4">
          {Messages.checkOutPage.orderSummary.value}
        </h5>
        <div className="d-flex justify-content-between mb-3">
          <span>{Messages.checkOutPage.subtotal.value}</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <span>{Messages.checkOutPage.shipping.value}</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <span>{Messages.checkOutPage.tax.value}</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between mb-4">
          <strong>{Messages.checkOutPage.grandTotal.value}</strong>
          <strong>${grandTotal.toFixed(2)}</strong>
        </div>
        <button
          className="btn btn-primary w-100 btn-color"
          onClick={goToCheckout}
        >
          {Messages.checkOutPage.checkOut.value}
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
