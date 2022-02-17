import React from "react";
import PropTypes from "prop-types";
import cash from "../../utils/pipes/cash";
import "./Grid.styles.css";
function Grid({ items, title, onClickFunction }) {
  return (
    <div className="container">
      <label className="grid-title">{title}</label>
      <div className="grid">
        {items.map((item) => {
          return (
            <div onClick={() => onClickFunction(item)} key={item.id} className="grid-thing">
              <img className="grid-item" src={item.data.mainimage.url} alt="" />
              <p>{item.data.name}</p>
              <p className="cat-text">{item.data.category.slug}</p>
              <p>{cash(item.data.price)}</p>
              <button className="cart-btn">Add to cart</button>
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
