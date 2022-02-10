import React, { useState } from "react";
import Grid from "../../components/Grid/Grid";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import SideBar from "../../components/SideBar";
import { useProducts } from "../../utils/hooks/useProducts";

function ProductList() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { products, loading } = useProducts(selectedOptions);

  return (
    <div>
      <SideBar
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      >
        {loading ? (
          <Loader/>
        ) : (
          <>
          <Grid title={"This is the Product List Page"} items={products} />
          <Pagination page={2} totalPages={8}/>
          </>
        )}
      </SideBar>
    </div>
  );
}

export default ProductList;
