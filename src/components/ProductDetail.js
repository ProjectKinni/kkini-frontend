import React from 'react';
import ProductNutrition from "./ProductNutrition";

const ProductDetail = ({ product }) => {
    return product ? (
        <div className="product-detail">
            <div className="info">
                <div className="product-header">
                    <h2>{product.productName}</h2>
                    <button className="wishlist-button">♥</button>
                </div>
                <h4>제조사: {product.makerName}</h4>
                <h2>평점: ⭐{product.averageRating}  +리뷰개수</h2>
                <input type="submit" value="리뷰적기" />
                <h3>카테고리: {product.categoryName}</h3>
                <h3>중량: {product.servingSize}g</h3>

                <ProductNutrition nutrition={product} />
            </div>
            <img src={product.image} alt={product.productName} />
        </div>
    ) : (
        <p>Loading...</p>
    );
}
export default ProductDetail;
