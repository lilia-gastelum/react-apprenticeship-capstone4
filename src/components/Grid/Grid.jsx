import React from "react";
import PropTypes from "prop-types";
import cash from "../../utils/pipes/cash";
import "./Grid.styles.css";
import { useCartContext } from "../../utils/contexts/CartContext";

function Grid({ items, title, onClickFunction }) {
  const { addProduct } = useCartContext();

  const addToCart = (product) => {
    addProduct({ quantity: 1, product });
  };

  return (
    <div className="container">
      <label className="grid-title">{title}</label>
      <div className="grid">
        {items.map((item) => {
          return (
            <div key={item.id} className="grid-thing">
              <div onClick={() => onClickFunction(item)}>
                <img
                  className="grid-item"
                  src={item.data.mainimage.url}
                  alt=""
                />
                <p>{item.data.name}</p>
                <p className="cat-text">{item.data.category.slug}</p>
                <p>{cash(item.data.price)}</p>
              </div>

              {item.data.stock > 0 && (
                <button className="cart-btn" onClick={() => addToCart(item)}>
                  Add to cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Grid.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string,
  onClickFunction: PropTypes.func.isRequired,
};

export default Grid;
