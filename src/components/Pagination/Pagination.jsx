import React from "react";
import PropTypes from "prop-types";
import "./Pagination.styles.css";

function Pagination({ page, setPage, totalPages }) {
  const isActive = (index) => (index + 1 === page ? "active" : "");

  const goToNexPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  const goToPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  return (
    <div className="pagination-container">
      <div className="pagination">
        <div onClick={goToPrevPage}>&laquo;</div>
        {[...Array(totalPages)].map((p, i) => {
          return (
            <div key={i} className={isActive(i)} onClick={() => setPage(i + 1)}>
              {i + 1}
            </div>
          );
        })}
        <div onClick={goToNexPage}>&raquo;</div>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
  totalPages: PropTypes.number,
};

export default Pagination;
