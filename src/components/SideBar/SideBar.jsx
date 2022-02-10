import React from "react";
import { useMocks } from "../../utils/hooks/useMocks";
import "./SideBar.styles.css";

function SideBar({ children, selectedOptions, setSelectedOptions }) {
  const { categories } = useMocks();

  const isSelected = id => selectedOptions.includes(id)

  const selectOption = (id) => {
    setSelectedOptions(
      isSelected(id)
        ? selectedOptions.filter((option) => option !== id)
        : [...selectedOptions, id]
    );
  };

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
      </div>
      <div className="content">
        {children}
      </div>
    </>
  );
}

export default SideBar;
