import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "../../components/Grid/Grid";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import { useTermContext } from "../../utils/contexts/TermContext";
import { useProductsList } from "../../utils/hooks/useProductsList";

function SearchResults() {
  const [selectedOptions] = useState([]);
  const {term} = useTermContext();
  const [page, setPage] = useState(1);
  const {
    data: products,
    totalPages,
    isLoading,
  } = useProductsList(selectedOptions, page, term);
  const history = useHistory();

  const redirectDetail = (product) => {
    history.push(`/product/${product.id}`, { productId: product.id });
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px" }}>
              No results found for "{term}". Try something else.
            </div>
          ) : (
            <>
              <Grid
                title={`Results for "${term}"`}
                items={products}
                onClickFunction={redirectDetail}
              />
              <Pagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default SearchResults;
