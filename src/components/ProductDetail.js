import React from 'react';
import ProductNutrition from "./ProductNutrition";

const SERVER_URL = "http://223.130.138.156:8080"; // 서버 URL을 정의합니다.

const ProductDetail = ({ product, viewCount }) => {

    return product ? (
        <div className="product-detail">
            <div className="info">
                <div className="product-header">
                    <h2>{product.productName}</h2>
                    <button className="wishlist-button">♥</button>
                </div>
                <h2>평점: ⭐{product.averageRating}</h2>
                <h2>상품번호: {product.productId}</h2>
                <h3>조회수: {viewCount || '0'}</h3>
                <h3>랭킹: </h3>
                <input type="submit" value="리뷰적기" />
                <h3>중량: {product.servingSize}g</h3>
                <h2>열량: {product.kcal}kcal</h2>

                <ProductNutrition nutrition={product} />
            </div>
            <img src={product.image} alt={product.productName} />
        </div>
    ) : (
        <p>Loading...</p>
    );
}
export default ProductDetail;
