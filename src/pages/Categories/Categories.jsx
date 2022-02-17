import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import "./Categories.styles.css";
function Categories({ categories }) {
  const history = useHistory();

  const handleClick = (category) => {
    history.push(`/products?category=${category.name}`, {
      category: category.id,
    });
  };

  return (
    <div className="categories">
      <label className="cat-title">Categories</label>
      <ul className="main-nav">
        {categories.map((category, i) => {
          return (
            <li key={category.id} className={`item${i + 1}`}>
              <div
                className="bg"
                style={{ background: `url(${category.url})` }}
                onClick={() => handleClick(category)}
              >
                <label className="category-name">{category.name}</label>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Categories.propTypes = {
  categories: PropTypes.array,
};


export default Categories;
