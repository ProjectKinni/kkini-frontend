import React from 'react';
import "../../styles/MainPage.css";

function ProductSlide({ imgSrc, productName }) {
    return (
        <div className="slider-slide">
            <img src={imgSrc} className="product-image" />
            <div className="product-name">
                <a href="#"> {productName} </a>
            </div>
        </div>
    );
}

export default ProductSlide;
