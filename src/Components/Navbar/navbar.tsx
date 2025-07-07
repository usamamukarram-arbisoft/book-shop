import "./navbar.css";

import React from "react";
import Badge from "react-bootstrap/Badge";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import type { RootState } from "../../Store/Store";
import type { MenuItem } from "../../Types/Types";
import { menus } from "../../Utility/CommonConstants";
import { Messages } from "../../Utility/CommonMessages";
import { openDrawer, selectTotalItems } from "../AddToCart/AddtoCartslice";
import { logout } from "../SignIn/SinginSlice";
const Navbar = () => {
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const itemCounts = useSelector(selectTotalItems);
  const user = useSelector((state: RootState) => state.auth.user);
  const cartDetails = () => {
    dispatch(openDrawer());
  };
  const renderLinks = (menu: MenuItem, index: number) => {
    return (
      <li
        className={`nav-item ${location === menu.link ? "active" : ""}`}
        key={`nav-${index}`}
      >
        <Link className="nav-link active" aria-current="page" to={menu.link}>
          {menu.name}
        </Link>
      </li>
    );
  };
  return (
    <ul className="nav justify-content-end align-items-center">
      {menus.map((menu, index) => {
        if (menu.link === "/login" && !user) {
          return renderLinks(menu, index);
        }
        if (menu.link !== "/login") {
          return renderLinks(menu, index);
        }
      })}

      <li className="nav-item">
        <a
          href="#"
          aria-label="Cart"
          className="nav-link d-flex"
          onClick={cartDetails}
        >
          <i className="bi bi-cart-plus icon-size" />
          <Badge className="badge-size" bg="danger">
            {itemCounts}
          </Badge>
        </a>
      </li>
      {user && (
        <li className="nav-item">
          <a
            href="#"
            aria-label="Sign Out"
            className="nav-link d-flex"
            onClick={() => {
              dispatch(logout());
            }}
          >
            {Messages.menu.Hi.value} {user?.username}
          </a>
        </li>
      )}
    </ul>
  );
};

export default Navbar;
