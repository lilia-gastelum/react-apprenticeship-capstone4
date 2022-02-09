import React from "react";
import { useHistory } from "react-router-dom";
import "./Header.styles.css";

function Header() {
  const history = useHistory();

  const redirectToHome = () => history.push("/home");
  
  return (
    <div className="header">
      <label onClick={redirectToHome} className="logo">
        Wize Home
      </label>
      <input className="search" placeholder="Search..." />
      <img className="cart" alt="cart" src="/icons/shopping-cart.png" />
    </div>
  );
}

export default Header;
