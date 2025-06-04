import React from "react";
import "./navbar.css";
const Navbar = () => {
  const menus = [
    { name: "Home", link: "#" },
    { name: "Products", link: "#" },
  ];
  return (
    <ul className="nav justify-content-end">
      {menus.map((menu, index) => (
        <li className="nav-item" key={index}>
          <a className="nav-link active" aria-current="page" href={menu.link}>
            {menu.name}
          </a>
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
