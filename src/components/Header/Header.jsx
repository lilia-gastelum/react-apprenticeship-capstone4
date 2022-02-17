import React from "react";
import { useHistory } from "react-router-dom";
import { useTermContext } from "../../utils/contexts/TermContext";
import "./Header.styles.css";

function Header() {
  const history = useHistory();
  const { setTerm } = useTermContext();

  const redirectToHome = () => history.push("/home");

  const handleKeyPressed = (event) => {
    const term = event.target.value;
    if (event.key === "Enter" && term.trim() !== "") {
      setTerm(term);
      history.push(`/search?q=${term}`);
    }
  };

  return (
    <div className="header">
      <label onClick={redirectToHome} className="logo">
        Wize Home
      </label>
      <input
        className="search"
        onKeyPress={(e) => handleKeyPressed(e)}
        placeholder="Search..."
      />
      <img className="cart" alt="cart" src="/icons/shopping-cart.png" />
    </div>
  );
}

export default Header;
