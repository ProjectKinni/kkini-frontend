import React from 'react';
import ProductNutrition from "./ProductNutrition";
import ProductLikeButton from "./ProductLikeButton";
import { useUser } from "./UserContext";

const ProductDetail = ({ product }) => {
    const { user, setUser } = useUser();

    return product ? (
        <div className="product-detail">
            <div className="info">
                <div className="product-header">
                    <h2>{product.productName}</h2>
                    {user && user.userId && ( // user가 로그인한 경우에만 ProductLikeButton 렌더링
                        <ProductLikeButton userId={user.userId} productId={product.productId} />
                    )}
                </div>
                <h2>평점: ⭐{product.averageRating}  +리뷰개수</h2>
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