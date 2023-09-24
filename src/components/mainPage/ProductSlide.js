import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/MainPage.css";

function ProductSlide({ imgSrc, productName, productId }) {
    const navigate = useNavigate();

    const goToProductDetail = () => {
        navigate(`/products/${productId}`);
    };
  return (
    <div className="slider-slide" onClick={goToProductDetail}>
      <div className="img-wrapper">
        <img src={imgSrc} className="product-image" />
      </div>
      <div className="product-name">
          <h4 className="product-name">{productName}</h4>
      </div>
    </div>
  );
}

export default ProductSlide;
