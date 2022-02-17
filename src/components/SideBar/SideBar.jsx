import React from "react";
import PropTypes from "prop-types";
import { useProductCategories } from "../../utils/hooks/useProductCategories";
import Loader from "../Loader";
import "./SideBar.styles.css";

function SideBar({ children, selectedOptions, setSelectedOptions }) {
  const { data: categories, isLoading } = useProductCategories();

  const isSelected = (id) => selectedOptions.includes(id);

  const selectOption = (id) => {
    setSelectedOptions(
      isSelected(id)
        ? selectedOptions.filter((option) => option !== id)
        : [...selectedOptions, id]
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="sidebar">
        {categories.map((category) => {
          return (
            <div
              className={`option ${isSelected(category.id) ? "active" : ""}`}
              key={category.id}
              onClick={() => selectOption(category.id)}
            >
              {category.name}
            </div>
          );
        })}
        <div className={`remove`} onClick={() => setSelectedOptions([])}>
          Clear all filters
        </div>
      </div>
      <div className="content">{children}</div>
    </>
  );
}

SideBar.propTypes = {
  children: PropTypes.node,
  selectedOptions: PropTypes.array,
  setSelectedOptions: PropTypes.func,
}


export default SideBar;
