import "./products.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../Store/Store";
import type { Books } from "../../Types/Types";
import { fetchBooks } from "../../Utility/Api";
import { Messages } from "../../Utility/CommonMessages";
import CommonConfirmation from "../CommonConfirmationModal/CommonConfirmation";
import Pagination from "../Pagination/Pagination";
import ProductCard from "../ProductCard/ProductCard";
import SpinnerComponent from "../Spinner/SpinnerComponent";
import { setProducts } from "./ProductsSlice";
const Products = () => {
  const [BooksListing, setBooksListing] = useState<Books[]>([]);
  const [currentItems, setCurrentItems] = useState<Books[]>([]);

  const searchQuery = useSelector(
    (state: RootState) => state.search.searchQuery
  );
  const dispatch = useDispatch();

  const sampleProducts = BooksListing;

  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    fetchBooks().then((data) => {
      dispatch(setProducts(data));
      if (searchQuery) {
        const filterdBooks = data.filter((books) =>
          books.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setBooksListing(filterdBooks);
      } else {
        setBooksListing(data);
      }
    });
  }, [searchQuery]);
  const handleUpdatedList = (updatedList: Books[]) => {
    setCurrentItems(updatedList);
  };

  return (
    <div className="container flex-wrap mt-4">
      {BooksListing.length !== 0 ? (
        <>
          <div className="row justify-content-center">
            {currentItems.map((product) => (
              <ProductCard
                key={product.bookId}
                product={product}
                setOpenDialog={setOpenDialog}
              />
            ))}
          </div>

          <Pagination
            sampleProducts={sampleProducts}
            onPageChange={handleUpdatedList}
          />
        </>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "700px" }}
        >
          <SpinnerComponent />
        </div>
      )}
      <CommonConfirmation
        openDialog={openDialog}
        title={Messages.outOfStock.title.value}
        message={Messages.outOfStock.message.value}
        IsDisplayBtn={false}
        handleClose={() => {
          setOpenDialog(false);
        }}
      />
    </div>
  );
};

export default Products;
