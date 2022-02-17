import React from "react";
import { useHistory } from "react-router-dom";
import Carousel from "../../components/Carousel";
import Grid from "../../components/Grid/Grid";
import { useFeaturedBanners } from "../../utils/hooks/useFeaturedBanners";
import { useFeaturedProducts } from "../../utils/hooks/useFeaturedProducts";
import { useProductCategories } from "../../utils/hooks/useProductCategories";
import Categories from "../Categories";
import Loader from "../../components/Loader";
import "./Home.styles.css";
function Home() {
  const history = useHistory();
  const { data: featuredBanners, isLoading: loadingBanners } = useFeaturedBanners();
  const { data: productCategories, isLoading: loadingCategories } = useProductCategories();
  const { data: featuredProducts, isLoading: loadingProducts } = useFeaturedProducts();
  const redirectToProductList = () => history.push("/products");
  const redirectDetail = (product) => {
    history.push(`/product/${product.id}`, { productId: product.id });
  };

  if(loadingBanners || loadingCategories || loadingProducts){
    return <Loader/>
  }

  return (
    <div className="home">
      <Carousel banners={featuredBanners} />
      <Categories categories={productCategories} />
      <Grid title={"Our Products"} items={featuredProducts} onClickFunction={redirectDetail} />
      <button className="list-button" onClick={redirectToProductList}>
        View all products
      </button>
    </div>
  );
}

export default Home;
