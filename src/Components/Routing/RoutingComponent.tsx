import { Route, Routes } from "react-router-dom";

import { ROUTES } from "../../Utility/CommonConstants";
import BookDetail from "../BookDetail/Bookdetail";
import Dashboard from "../Dashboard/Dashboard";
import NotFound from "../NotFound/NotFound";
import Products from "../Products/Products";
import SignIn from "../SignIn/SignIn";
import Thankyou from "../ThankyouPage/Thankyou";

function RoutingComponent() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Dashboard />} />
      <Route path={ROUTES.BOOKS} element={<Products />} />
      <Route path={`${ROUTES.BOOK_DETAIL}/:id`} element={<BookDetail />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      <Route path={ROUTES.LOGIN} element={<SignIn />} />
      <Route path={ROUTES.THANK_YOU} element={<Thankyou />} />
    </Routes>
  );
}

export default RoutingComponent;
