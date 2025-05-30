import React from "react";
import "./navbar.css";
function Navbar() {
  return (
    <ul className="nav justify-content-end">
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#">
          Home
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Products
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          <i className="fa-solid fa-cart-plus"></i>
        </a>
      </li>
    </ul>
  );
}

export default Navbar;
