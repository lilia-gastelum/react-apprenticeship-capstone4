import React from "react";

import "./Carousel.styles.css";

function Carousel({ banners }) {
  return (
    <section className="carousel" aria-label="carousel" tabIndex="0">
      <div className="slides">
        {banners.map((banner, i) => {
          return (
            <img
              className={`slides-item`}
              id={`slide-${i + 1}`}
              key={`slide-${i + 1}`}
              alt={banner.alt}
              tabIndex="0"
              src={banner.url}
            />
          );
        })}
      </div>
      <div className="carousel-nav">
        {banners.map((banner, i) => {
          return (
            <a className="slider-nav" key={`slide-${i + 1}`} href={`#slide-${i + 1}`}>
              &nbsp;
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default Carousel;
