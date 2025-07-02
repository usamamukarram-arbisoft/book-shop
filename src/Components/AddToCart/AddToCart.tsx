import "./AddToCart.css";

import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { RootState } from "../../Store/Store";
import { Messages } from "../../Utility/CommonMessages";
import CommonConfirmation from "../CommonConfirmationModal/CommonConfirmation";
import { clearCart, closeDrawer } from "./AddtoCartslice";
import CartProduct from "./CartProduct/CartProduct";
import CartSummary from "./CartSummary/CartSummary";
import EmptyCart from "./EmptyCart/EmptyCart";

const AddToCart = () => {
  const dispatch = useDispatch();
  const openDrawer = useSelector((state: RootState) => state.drawer.openDrawer);
  const cartItems = useSelector((state: RootState) => state.drawer.items);
  const taxPercent = 16;
  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price_usd * item.quantity;
  }, 0);
  const shipping = Math.random() * (15 - 10) + 10;
  const tax = (subtotal * taxPercent) / 100;
  const grandTotal = subtotal + shipping + tax;
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [openDialog, setOpenDialog] = useState(false);

  const handleConfirmation = () => {
    dispatch(closeDrawer());
    dispatch(clearCart());
    setOpenDialog(false);
    navigate(`/thankyou`);
  };
  const goToCheckout = () => {
    if (!isLoggedIn) {
      navigate("/login");
      dispatch(closeDrawer());
      return;
    }

    setOpenDialog(true);
  };
  const closeDialog = () => {
    setOpenDialog(false);
  };
  return (
    <>
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
          {cartItems.length ? (
            <div className="container py-5">
              <h1 className="mb-5">
                {Messages.checkOutPage.cartHeading.value}
              </h1>
              <div className="row">
                <div className="col-lg-8">
                  <div className="card mb-4">
                    <div className="card-body">
                      {cartItems.map((item) => (
                        <CartProduct key={item.bookId} item={item} />
                      ))}
                    </div>
                  </div>

                  <div className="text-start mb-4">
                    <a
                      className="btn btn-outline-brown"
                      onClick={() => {
                        navigate("/books");
                        dispatch(closeDrawer());
                      }}
                    >
                      <i className="bi bi-arrow-left me-2" />
                      {Messages.checkOutPage.continueShoppingBtn.value}
                    </a>
                  </div>
                </div>
                <div className="col-lg-4">
                  <CartSummary
                    subtotal={subtotal}
                    grandTotal={grandTotal}
                    tax={tax}
                    shipping={shipping}
                    goToCheckout={goToCheckout}
                  />
                </div>
              </div>
            </div>
          ) : (
            <EmptyCart />
          )}
        </Offcanvas.Body>
      </Offcanvas>
      <CommonConfirmation
        openDialog={openDialog}
        title={Messages.confirmDialog.title.value}
        message={Messages.confirmDialog.message.value}
        IsDisplayBtn={true}
        handleConfirm={handleConfirmation}
        handleClose={closeDialog}
      />
    </>
  );
};

export default AddToCart;
