import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
  <header>
    <h1>Image Repo</h1>
    <div className="links">
      <NavLink to="/" className="link">
        gallery
      </NavLink>
      <NavLink to="/add" className="link">
        add
      </NavLink>
    </div>
  </header>
);

export default Header;
