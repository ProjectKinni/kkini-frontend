import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductSlide from "./ProductSlide";

// fetchFunction에 product 가져오는 방법 설정
// fetchGreenProducts, fetchRankingProducts, fetchKkiniPickProducts
function ProductSlickSlider({ fetchFunction }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFunction()
      .then((data) => setProducts(data))
      .catch((err) => setError(err));
  }, [fetchFunction]);

  if (error) {
    return <div className="no-data">상품 리스트를 얻어오지 못했습니다.</div>;
  }

  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 768, // 화면 너비 768px 미만일 때
        settings: {
          slidesToShow: 2, // 슬라이드 2개 보이도록 설정
        },
      },
    ],
  };

  return (
    <div className="slider-wrap">
      <Slider {...settings}>
        {/*<ProductSlide imgSrc="#" productName="고구마" />*/}
        {/*<ProductSlide imgSrc="#" productName="고구마" />*/}
        {/*<ProductSlide imgSrc="#" productName="고구마" />*/}
        {/*<ProductSlide imgSrc="#" productName="고구마" />*/}
        {/*<ProductSlide imgSrc="#" productName="고구마" />*/}
        {/*<ProductSlide imgSrc="#" productName="고구마" />*/}
        {/*<ProductSlide imgSrc="#" productName="고구마" />*/}
        {/*<ProductSlide imgSrc="#" productName="고구마" />*/}

        {products.map((product) => (
          <ProductSlide
            key={product.productId}
            imgSrc={product.image}
            productName={product.productName}
          />
        ))}
      </Slider>
    </div>
  );
}

export default ProductSlickSlider;
