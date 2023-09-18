import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductSlide from "./ProductSlide";

// fetchFunction에 product 가져오는 방법 설정
// fetchGreenProducts, fetchRankingProducts, fetchKkiniPickProducts
function ProductSlickSlider({ fetchFunction }){

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFunction()
            .then(data => setProducts(data))
            .catch(err => setError(err));
    }, [fetchFunction]);

    if (error) {
        return <div>상품 리스트를 얻어오지 못했습니다.</div>;
    }

    const settings = {
        arrows: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '30px'
    }

    return(
        <div>
            <Slider {...settings}>

                {/*<ProductSlide imgSrc="#" productName="고구마" />*/}
                {/*<ProductSlide imgSrc="#" productName="고구마" />*/}
                {/*<ProductSlide imgSrc="#" productName="고구마" />*/}
                {/*<ProductSlide imgSrc="#" productName="고구마" />*/}
                {/*<ProductSlide imgSrc="#" productName="고구마" />*/}
                {/*<ProductSlide imgSrc="#" productName="고구마" />*/}
                {/*<ProductSlide imgSrc="#" productName="고구마" />*/}
                {/*<ProductSlide imgSrc="#" productName="고구마" />*/}

                {products.map(product => (
                    <ProductSlide
                        key = {product.productId}
                        imgSrc = {product.image}
                        productName = {product.productName}
                    />
                ))}

            </Slider>
        </div>
    );
}

export default ProductSlickSlider;