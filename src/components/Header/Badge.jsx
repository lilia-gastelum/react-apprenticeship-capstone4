import React from "react";
import { useHistory } from "react-router-dom";
import { useCartContext } from "../../utils/contexts/CartContext";

function Badge() {
  const history = useHistory();
  const { cartItems } = useCartContext();

  const goToCart = () => {
    history.push("/cart");
  };

  return (
    <div className="icon-container" onClick={goToCart}>
      <label className="badge">{cartItems.length}</label>
      <img className="cart" alt="cart" src="/icons/shopping-cart.png" />
    </div>
  );
}

export default Badge;
