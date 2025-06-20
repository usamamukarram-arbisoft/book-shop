import React from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { Messages } from "../../Utility/CommonMessages";
const Navbar = () => {
  const menus = [
    { name: Messages.menu.home.value, link: "/" },
    { name: Messages.menu.books.value, link: "/books" },
  ];
  const location = useLocation().pathname;
  return (
    <ul className="nav justify-content-end">
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
        <a className="nav-link" href="#">
          <i className="bi bi-cart-plus"></i>
        </a>
      </li>
    </ul>
  );
};

export default Navbar;
