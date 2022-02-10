import React from "react";
import { useHistory } from "react-router-dom";
import Carousel from "../../components/Carousel";
import Grid from "../../components/Grid/Grid";
import { useMocks } from "../../utils/hooks/useMocks";
import Categories from "../Categories";
import './Home.styles.css';
function Home() {
  const history = useHistory();
  const { banners, categories, products } = useMocks();

  const redirectToProductList = () => history.push("/product-list")
  return (
    <div className="home">
      <Carousel banners={banners} />
      <Categories categories={categories} />
      <Grid title={"Our Products"} items={products} />
      <button className="list-button" onClick={redirectToProductList}>
        View all products
      </button>
    </div>
  );
}

export default Home;
