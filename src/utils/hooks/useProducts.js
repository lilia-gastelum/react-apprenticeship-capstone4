import { useEffect, useState } from "react";
const productsJson = require("../../mocks/en-us/products.json");
function useProducts(ids) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const filteredProducts =
      ids.length > 0
        ? productsJson.results.filter((p) => ids.includes(p.data.category.id))
        : productsJson.results;
    setTimeout(() => {
      setProducts(filteredProducts);
      setLoading(false);
    }, 2000);
  }, [ids]);

  return { products, loading };
}

export { useProducts };
