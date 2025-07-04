import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import type { confirmationProps } from "../../Types/Types";
import { Messages } from "../../Utility/CommonMessages";

const CommonConfirmation = ({
  openDialog,
  title,
  message,
  IsDisplayBtn,
  handleConfirm,
  handleClose,
}: confirmationProps) => {
  return (
    <Modal show={openDialog} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      {IsDisplayBtn && (
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {Messages.confirmDialog.no.value}
          </Button>
          <Button
            variant="primary"
            className="btn-color"
            onClick={handleConfirm}
          >
            {Messages.confirmDialog.yes.value}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CommonConfirmation;
