import "./BookDetails.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import type { RootState } from "../../Store/Store";
import { ROUTES } from "../../Utility/CommonConstants";
import { Messages } from "../../Utility/CommonMessages";
import { addToCart } from "../AddToCart/AddtoCartslice";
import CommonConfirmation from "../CommonConfirmationModal/CommonConfirmation";
import { filterProducts } from "../Products/ProductsSlice";
import SimilarProducts from "../SimilarProducts/SimilarProducts";

const BookDetail = () => {
  const location = useLocation().state;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (location?.product) {
      dispatch(filterProducts(location.product));
    }
  }, [location?.product]);

  const similarBooks = useSelector(
    (state: RootState) => state.product.filterItems
  );

  const handleBack = () => {
    navigate(ROUTES.HOME);
  };

  const book = location?.product;
  const handleAddToCart = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    if (book.available_books === 0) {
      setOpenDialog(true);
    } else {
      dispatch(addToCart(book));
    }
  };

  if (!book) return <Navigate to="/notfound" />;

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mb-4 h-400px">
            <div className="card img-card ">
              <img
                src={book.image_url}
                className="card-img-top h-100"
                alt="Product Image"
              />
            </div>
          </div>

          <div className="col-md-6">
            <h2 className="mb-3">{book.title}</h2>
            <h6 className=" mb-2 text-body-secondary">
              <strong>{Messages.productDetails.author.value}: </strong>
              {book.author}
            </h6>
            <h6 className=" mb-2 text-body-secondary">
              <strong>{Messages.productDetails.genre.value}: </strong>
              {book.category}
            </h6>
            <div className="mb-3">
              <span className="h4 me-2">
                {Messages.productDetails.price.value}:
              </span>
              <span className="text-muted">${book.price_usd}</span>
            </div>
            <div className="mb-3">
              <span className="me-2">
                <strong>{Messages.productDetails.quantity.value}:</strong>
              </span>
              <span className="text-muted">{book.available_books}</span>
            </div>
            <p className="mb-1">
              <strong>{Messages.productDetails.description.value}:</strong>
            </p>
            <p className="ms-3 mb-4">{book.description}</p>

            <div className="checkout">
              <a className="btn btn-primary me-5" onClick={handleBack}>
                {Messages.productDetails.back.value}
              </a>
              <a className="btn btn-primary" onClick={handleAddToCart}>
                <i className="bi bi-cart-plus" />
                {Messages.productCard.addToCart.value}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <SimilarProducts
          similarProducts={similarBooks}
          setOpenDialog={setOpenDialog}
        />
      </div>
      <CommonConfirmation
        openDialog={openDialog}
        title={Messages.outOfStock.title.value}
        message={Messages.outOfStock.message.value}
        IsDisplayBtn={false}
        handleClose={() => {
          setOpenDialog(false);
        }}
      />
    </>
  );
};

export default BookDetail;
