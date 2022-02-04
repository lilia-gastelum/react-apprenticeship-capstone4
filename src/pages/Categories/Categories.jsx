/* eslint-disable max-len */
import React from "react";
import "./Categories.styles.css";
function Categories({categories}) {
  return (
    <div className="categories">
      <label className="cat-title">Categories</label>
      <ul className="main-nav">
          {categories.map((category, i) => {
              return(
                <li key={category.id} className={`item${i+1}`}>
                <div className="bg" style={{background: `url(${category.url})`}}>
                    <label className="category-name">{category.name}</label>
                </div>
              </li>
              )
          })}
      </ul>
    </div>
  );
}

export default Categories;
