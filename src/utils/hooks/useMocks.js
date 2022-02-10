import { useEffect, useState } from "react";
const featuredBanners = require("../../mocks/en-us/featured-banners.json");
const productCategories = require("../../mocks/en-us/product-categories.json");
const featuredProducts = require("../../mocks/en-us/featured-products.json");
function useMocks() {
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setBanners(
      featuredBanners.results.map((image) => {
        return image.data.main_image;
      })
    );
    setCategories(
      productCategories.results.map((category) => {
        return {
          id: category.id,
          name: category.data.name,
          ...category.data.main_image,
        };
      })
    );
    setProducts(featuredProducts.results);
  }, []);

  return { banners, categories, products };
}

export { useMocks };
