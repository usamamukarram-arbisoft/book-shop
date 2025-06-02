import { useLocation, useNavigate, useParams } from "react-router-dom";
// import books from '../data/books.json';
// import { Button } from '@/components/ui/button';

const BookDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(`/`);
  };

  let book = state?.product;

  if (!book) return <div className="p-4">Book not found.</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mb-4">
          <img
            src={book.image_url}
            alt="Product"
            className="img-fluid rounded mb-3 product-image"
          ></img>
        </div>

        <div className="col-md-6">
          <h2 className="mb-3">{book.title}</h2>
          <div className="mb-3">
            <span className="h4 me-2"></span>
            <span className="text-muted">${book.price_usd}</span>
          </div>
          <p className="mb-4">{book.description}</p>
          <div className="mb-4">
            <h5>Color:</h5>
            <div
              className="btn-group"
              role="group"
              aria-label="Color selection"
            >
              <input
                type="radio"
                className="btn-check"
                name="color"
                id="black"
              ></input>
              <label className="btn btn-outline-dark">Black</label>
              <input
                type="radio"
                className="btn-check"
                name="color"
                id="silver"
              ></input>
              <label className="btn btn-outline-secondary">Silver</label>
              <input
                type="radio"
                className="btn-check"
                name="color"
                id="blue"
              ></input>
              <label className="btn btn-outline-primary"> Blue</label>
            </div>
          </div>
          <div className="checkout">
            <a className="btn btn-primary" onClick={handleBack}>
              Back
            </a>
            <a href="#" className="btn btn-primary">
              <i className="bi bi-cart-plus"></i> Add to Cart
            </a>
          </div>

          <div className="mt-4">
            <h5>Key Features:</h5>
            <ul>
              <li>Industry-leading noise cancellation</li>
              <li>30-hour battery life</li>
              <li>Touch sensor controls</li>
              <li>Speak-to-chat technology</li>
            </ul>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
