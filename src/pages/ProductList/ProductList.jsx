import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Grid from "../../components/Grid/Grid";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import SideBar from "../../components/SideBar";
import { useProductsList } from "../../utils/hooks/useProductsList";

function ProductList() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [page, setPage] = useState(1);
  const {
    data: products,
    totalPages,
    isLoading,
  } = useProductsList(selectedOptions, page);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.state) {
      setSelectedOptions([location.state.category]);
    }
  }, [location.state]);

  const redirectDetail = (product) => {
    history.push(`/product/${product.id}`, {productId: product.id})
  };

  return (
    <div>
      <SideBar
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Grid
              items={products}
              onClickFunction={redirectDetail}
            />
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          </>
        )}
      </SideBar>
    </div>
  );
}

export default ProductList;
