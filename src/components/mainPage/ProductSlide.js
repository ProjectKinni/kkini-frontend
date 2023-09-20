import React from "react";
import "../../styles/MainPage.css";

function ProductSlide({ imgSrc, productName }) {
  return (
    <div className="slider-slide">
      <div className="img-wrapper">
        <img src={imgSrc} className="product-image" />
      </div>
      <div className="product-name">
        <a href="#"> {productName} </a>
      </div>
    </div>
  );
}

export default ProductSlide;
