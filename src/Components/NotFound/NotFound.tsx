import "./NotFound.css";
import { Messages } from "../../Utility/CommonMessages";

const NotFound = () => {
  return (
    <div className="custom-bg text-dark">
      <div className="d-flex align-items-center justify-content-center min-vh-100 px-2">
        <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-2 fw-medium mt-4">{Messages.notFound.title.value}</p>
          <p className="mt-4 mb-5">{Messages.notFound.message.value}</p>
          <a
            href="/"
            className="btn btn-light fw-semibold rounded px-4 py-2 custom-btn"
          >
            {Messages.productDetails.back.value}
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
