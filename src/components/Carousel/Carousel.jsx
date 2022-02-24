import React from "react";
import PropTypes from "prop-types";
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
              alt={`slide-${i + 1}`}
              tabIndex="0"
              src={banner.url}
            />
          );
        })}
      </div>
      <div className="carousel-nav">
        {banners.map((banner, i) => {
          return (
            <a
              className="slider-nav"
              key={`slide-${i + 1}`}
              href={`#slide-${i + 1}`}
            >
              &nbsp;
            </a>
          );
        })}
      </div>
    </section>
  );
}

Carousel.propTypes = {
  banners: PropTypes.array,
};

export default Carousel;
