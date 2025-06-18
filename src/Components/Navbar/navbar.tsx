import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { Messages } from "../../Utility/CommonMessages";
import Badge from "react-bootstrap/Badge";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer, selectTotalItems } from "../AddToCart/AddtoCartslice";
const Navbar = () => {
  const menus = [
    { name: Messages.menu.home.value, link: "/" },
    { name: Messages.menu.books.value, link: "/books" },
    { name: Messages.menu.login.value, link: "/login" },
  ];
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const itemCounts = useSelector(selectTotalItems);
  const cartDetails = () => {
    dispatch(openDrawer());
  };
  return (
    <ul className="nav justify-content-end align-items-center">
      {menus.map((menu, index) => (
        <li
          className={`nav-item ${location === menu.link ? "active" : ""}`}
          key={`nav-${index}`}
        >
          <Link className="nav-link active" aria-current="page" to={menu.link}>
            {menu.name}
          </Link>
        </li>
      ))}

      <li className="nav-item">
        <a className="nav-link d-flex" href="#">
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
    </ul>
  );
};

export default Navbar;
