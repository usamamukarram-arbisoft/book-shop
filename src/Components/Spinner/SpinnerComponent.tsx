import React from "react";
import Spinner from "react-bootstrap/esm/Spinner";

const SpinnerComponent = () => {
  return (
    <div>
      <Spinner
        animation="border"
        role="status"
        className="justify-content-center d-flex align-items-center"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default SpinnerComponent;
