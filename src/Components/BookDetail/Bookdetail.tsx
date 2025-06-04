import { useLocation, useNavigate, useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import "./BookDetails.css";

const BookDetail = () => {
  const location = useLocation().state;
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(`/`);
  };

  let book = location?.product;
  if (!book) return <NotFound></NotFound>;

  return (
    <div className="container mt-5">
      <div className="row">
        {/* <div className="col-md-6 mb-4">
          <div className="product-image"></div>
          <img
            src={book.image_url}
            alt="Product"
            className="img-fluid rounded  mb-3"
          ></img>
        </div> */}
        <div className="col-md-6 mb-4">
          <div className="card img-card ">
            <img
              src={book.image_url}
              className="card-img-top h-100"
              alt="Product Image"
            ></img>
          </div>
        </div>

        <div className="col-md-6">
          <h2 className="mb-3">{book.title}</h2>
          <h6 className=" mb-2 text-body-secondary">
            {" "}
            <strong>Author: </strong> {book.author}
          </h6>
          <h6 className=" mb-2 text-body-secondary">
            <strong>Genre: </strong> {book.category}
          </h6>
          <div className="mb-3">
            <span className="h4 me-2">Price:</span>
            <span className="text-muted">${book.price_usd}</span>
          </div>
          <p className="mb-1">
            <strong>Description:</strong>
          </p>
          <p className="ms-3 mb-4">{book.description}</p>

          <div className="checkout">
            <a className="btn btn-primary me-5" onClick={handleBack}>
              Back
            </a>
            <a href="#" className="btn btn-primary">
              <i className="bi bi-cart-plus"></i> Add to Cart
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
