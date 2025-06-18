import Offcanvas from "react-bootstrap/Offcanvas";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Store/Store";
import {
  closeDrawer,
  decrementQuantity,
  deleteItem,
  IncrementQuantity,
} from "./AddtoCartslice";
import "./AddToCart.css";
import { Messages } from "../../Utility/CommonMessages";
import { showDialog } from "../CommonConfirmationModal/confirmationSlice";
import { useNavigate } from "react-router-dom";

const AddToCart = () => {
  const dispatch = useDispatch();
  const openDrawer = useSelector((state: RootState) => state.drawer.openDrawer);
  const cartItems = useSelector((state: RootState) => state.drawer.item);
  useEffect(() => {
    // setState({ right: openDrawer });
  }, [openDrawer]);

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.totalPrice * item.quantity;
  }, 0);
  const shipping = Math.random() * (15 - 10) + 10;
  const tax = (subtotal * 16) / 100;
  const grandTotal = subtotal + shipping + tax;
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const goToCheckout = () => {
    if (!isLoggedIn) {
      navigate("/login");
      dispatch(closeDrawer());
      return;
    }
    dispatch(
      showDialog({
        title: Messages.confirmDialog.title.value,
        message: Messages.confirmDialog.message.value,
        displayBtn: true,
      })
    );
  };
  return (
    <Offcanvas
      className="drawer"
      show={openDrawer}
      onHide={() => {
        dispatch(closeDrawer());
      }}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {Messages.checkOutPage.cartTitle.value}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="container py-5">
          <h1 className="mb-5">{Messages.checkOutPage.cartHeading.value}</h1>
          <div className="row">
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  {cartItems.map((item) => (
                    <div key={item.bookId} className="row cart-item mb-3">
                      <div className="col-md-3">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="img-fluid rounded"
                        ></img>
                      </div>
                      <div className="col-md-4">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="text-muted">
                          {Messages.checkOutPage.itemCategory.value}:{" "}
                          {item.category}
                        </p>
                      </div>
                      <div className="col-md-3">
                        <div className="input-group">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            type="button"
                            onClick={() =>
                              dispatch(
                                decrementQuantity({ bookId: item.bookId })
                              )
                            }
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="form-control  form-control-sm text-center quantity-input"
                            value={item.quantity}
                            readOnly
                          ></input>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            type="button"
                            onClick={() => {
                              dispatch(
                                IncrementQuantity({ bookId: item.bookId })
                              );
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2 text-end">
                        <p className="fw-bold">${item.totalPrice.toFixed(2)}</p>
                        <button className="btn btn-sm btn-outline-danger">
                          <i
                            className="bi bi-trash"
                            onClick={() =>
                              dispatch(deleteItem({ bookId: item.bookId }))
                            }
                          ></i>
                        </button>
                      </div>
                      <div className="border-bottom mt-3"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-start mb-4">
                <a
                  className="btn btn-outline-brown"
                  onClick={() => {
                    navigate("/books");
                  }}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  {Messages.checkOutPage.continueShoppingBtn.value}
                </a>
              </div>
            </div>
            <div className="col-lg-4">
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
            </div>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AddToCart;
