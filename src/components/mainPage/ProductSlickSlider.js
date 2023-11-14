import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductSlide from "./ProductSlide";
import {useUser} from "../UserContext";

function ProductSlickSlider({ fetchFunction }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const {user} = useUser();

  useEffect(() => {
    fetchFunction()
        .then((data) => {
          setProducts(data);
        })
        .catch((err) => setError(err));
  }, [fetchFunction]);

  if (error) {
    return <div className="no-data">{user?.nickname}님의 정보가 부족합니다! 저희 KKINI를 많이 이용해 주세요.</div>;
  }

  const numberOfSlides = products.length <= 4 ? products.length : 4;

  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: numberOfSlides,  // 상품의 개수에 따라 slidesToShow 설정
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
      <div className="slider-wrap">
        <Slider {...settings}>
          {products?.map((product) => (
              <ProductSlide
                  key={product.productId}
                  imgSrc={product.image}
                  productName={product.productName}
                  productId={product.productId}  // productId 추가
              />
          ))}
        </Slider>
      </div>
  );
}

export default ProductSlickSlider;
