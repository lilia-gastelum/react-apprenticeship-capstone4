import React from "react";
import cash from "../../utils/pipes/cash";
import "./Grid.styles.css";
function Grid({ items, title }) {
  return (
    <div className="container">
      <label className="grid-title">{title}</label>
      <div className="grid">
        {items.map((item) => {
          return (
            <div key={item.id} className="grid-thing">
              <img className="grid-item" src={item.data.mainimage.url} alt="" />
              <p>{item.data.name}</p>
              <p className="cat-text">{item.data.category.slug}</p>
              <p>{cash(item.data.price)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Grid;
