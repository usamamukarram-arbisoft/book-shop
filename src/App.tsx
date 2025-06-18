import Navbar from "./Components/Navbar/navbar";
import Products from "./Components/Products/Products";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import BookDetail from "./Components/BookDetail/BookDetail";
import Dashboard from "./Components/Dashboard/Dashboard";
import NotFound from "./Components/NotFound/NotFound";
import SignIn from "./Components/SignIn/SignIn";
import AddToCart from "./Components/AddToCart/AddToCart";
import { useSelector } from "react-redux";
import type { RootState } from "./Store/Store";
import CommonConfirmation from "./Components/CommonConfirmationModal/CommonConfirmation";
import Thankyou from "./Components/ThankyouPage/Thankyou";

const App = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate("/login");
  //   }
  // }, [isLoggedIn]);
  return (
    <div>
      {location !== "/login" && <Navbar />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/books" element={<Products />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/thankyou" element={<Thankyou />} />
      </Routes>
      <AddToCart />
      <CommonConfirmation />
    </div>
  );
};

export default App;
