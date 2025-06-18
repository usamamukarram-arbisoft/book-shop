import type { RootState } from "../../Store/Store";
import React, { use } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { hideDialog } from "./confirmationSlice";
import { clearCart, closeDrawer } from "../AddToCart/AddtoCartslice";
import { useNavigate } from "react-router-dom";

const CommonConfirmation = () => {
  const dispatch = useDispatch();
  const openDialog = useSelector((state: RootState) => state.confirmation.show);
  const title = useSelector((state: RootState) => state.confirmation.title);
  const message = useSelector((state: RootState) => state.confirmation.message);
  const IsDisplayBtn = useSelector(
    (state: RootState) => state.confirmation.displayBtn
  );
  const navigate = useNavigate();
  const confirmed = () => {
    dispatch(hideDialog());
    dispatch(closeDrawer());
    dispatch(clearCart());
    navigate(`/thankyou`);
  };
  return (
    <Modal
      show={openDialog}
      onHide={() => {
        dispatch(hideDialog());
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      {IsDisplayBtn && (
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              dispatch(hideDialog());
            }}
          >
            No
          </Button>
          <Button variant="primary" className="btn-color" onClick={confirmed}>
            Yes
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CommonConfirmation;
