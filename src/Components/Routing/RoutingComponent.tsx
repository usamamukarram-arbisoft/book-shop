import { Routes, Route } from "react-router-dom";
import BookDetail from "../BookDetail/BookDetail";
import Dashboard from "../Dashboard/Dashboard";
import NotFound from "../NotFound/NotFound";
import Products from "../Products/Products";
import SignIn from "../SignIn/SignIn";
import Thankyou from "../ThankyouPage/Thankyou";

function RoutingComponent() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/books" element={<Products />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/thankyou" element={<Thankyou />} />
      </Routes>
    </div>
  );
}

export default RoutingComponent;
