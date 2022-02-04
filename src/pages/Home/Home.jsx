import React from "react";
import Carousel from "../../components/Carousel";
import Grid from "../../components/Grid/Grid";
import { useMocks } from "../../utils/hooks/useMocks";
import Categories from "../Categories";

function Home() {
  const { banners, categories, products } = useMocks();

  return (
    <div>
      <Carousel banners={banners} />
      <Categories categories={categories} />
      <Grid title={"Our Products"} items={products} />
    </div>
  );
}

export default Home;
