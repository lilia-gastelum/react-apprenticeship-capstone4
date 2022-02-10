import React from "react";
import "./Header.styles.css";

function Header() {


  return (
    <div className="header">
      <label className="logo">Wize Home</label>
      <input
        className="search"
        placeholder="Search..."
      />
      <img className="cart" alt="cart" src="/icons/shopping-cart.png" />
    </div>
  );
}

export default Header;
