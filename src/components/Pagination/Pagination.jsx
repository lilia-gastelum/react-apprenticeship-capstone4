import React from "react";
import "./Pagination.styles.css";

function Pagination({ page, totalPages }) {
  const isActive = (index) => {
    if (index + 1 === page) {
      return "active";
    } else {
      return "";
    }
  };

  return (
    <div className="pagination-container">
      <div className="pagination">
        <div>&laquo;</div>
        {[...Array(totalPages)].map((p, i) => {
          return (
            <div key={i} className={isActive(i)}>
              {i + 1}
            </div>
          );
        })}
        <div>&raquo;</div>
      </div>
    </div>
  );
}

export default Pagination;
