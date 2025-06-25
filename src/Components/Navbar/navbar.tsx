import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { Messages } from "../../Utility/CommonMessages";
import Badge from "react-bootstrap/Badge";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer, selectTotalItems } from "../AddToCart/AddtoCartslice";
import type { RootState } from "../../Store/Store";
import { logout } from "../SignIn/SinginSlice";
import { useCart } from "../../Context/cartContext";
const Navbar = () => {
  const menus = [
    { name: Messages.menu.home.value, link: "/" },
    { name: Messages.menu.books.value, link: "/books" },
    { name: Messages.menu.login.value, link: "/login" },
  ];
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const { cart } = useCart();
  const itemCounts = cart.reduce((total, item) => total + item.quantity, 0);
  const user = useSelector((state: RootState) => state.auth.user);
  const cartDetails = () => {
    dispatch(openDrawer());
  };
  return (
    <ul className="nav justify-content-end align-items-center">
      {menus.map((menu, index) => {
        if (menu.link === "/login" && !user) {
          return (
            <li
              className={`nav-item ${location === menu.link ? "active" : ""}`}
              key={`nav-${index}`}
            >
              <Link
                className="nav-link active"
                aria-current="page"
                to={menu.link}
              >
                {menu.name}
              </Link>
            </li>
          );
        }
        if (menu.link !== "/login") {
          return (
            <li
              className={`nav-item ${location === menu.link ? "active" : ""}`}
              key={`nav-${index}`}
            >
              <Link
                className="nav-link active"
                aria-current="page"
                to={menu.link}
              >
                {menu.name}
              </Link>
            </li>
          );
        }
        return null;
      })}

      <li className="nav-item">
        <a className="nav-link d-flex">
          <i className="bi bi-cart-plus icon-size" onClick={cartDetails}></i>
          <Badge
            className="badge-size"
            bg="danger
            "
          >
            {itemCounts}
          </Badge>
        </a>
      </li>
      {user && (
        <li className="nav-item">
          <a
            className="nav-link d-flex"
            onClick={() => {
              dispatch(logout());
            }}
          >
            Hi {user?.username}
          </a>
        </li>
      )}
    </ul>
  );
};

export default Navbar;
