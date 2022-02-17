import { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants";
import { useLatestAPI } from "./useLatestAPI";

export function useProductsList(ids, page, term = "") {
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
  const [products, setProducts] = useState(() => ({
    data: [],
    isLoading: true,
    page: 1,
    totalPages: 1,
  }));

  useEffect(() => {
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const controller = new AbortController();

    async function getProducts() {
      try {
        setProducts({ data: [], isLoading: true });

        const response = await fetch(
          `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
            `[[at(document.type, "product")][any(my.product.category, ${JSON.stringify(
              ids
            )})]
            [fulltext(my.product.name, "${term}")]
          ]`
          )}&lang=en-us&page=${page}&pageSize=12`,
          {
            signal: controller.signal,
          }
        );
        const data = await response.json();

        setProducts({
          data: data.results,
          page: data.page,
          totalPages: data.total_pages,
          isLoading: false,
        });
      } catch (err) {
        setProducts({ data: [], isLoading: false });
        console.error(err);
      }
    }

    getProducts();

    return () => {
      controller.abort();
    };
  }, [apiRef, isApiMetadataLoading, ids, page, term]);

  return products;
}
