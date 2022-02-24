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
        <div
          onClick={goToPrevPage}
          className={page === 1 ? "disabled" : ""}
          data-testid={"prev"}
        >
          &laquo;
        </div>
        {[...Array(totalPages)].map((p, i) => {
          return (
            <div
              data-testid={"page" + (i+1)}
              key={i}
              className={isActive(i)}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </div>
          );
        })}
        <div
          onClick={goToNexPage}
          className={page === totalPages ? "disabled" : ""}
          data-testid={"next"}
        >
          &raquo;
        </div>
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
