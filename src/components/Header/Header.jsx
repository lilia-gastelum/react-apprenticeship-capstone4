import React from "react";
import { useHistory } from "react-router-dom";
import { useTermContext } from "../../utils/contexts/TermContext";
import Badge from "./Badge";
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
      <Badge/>
    </div>
  );
}

export default Header;
