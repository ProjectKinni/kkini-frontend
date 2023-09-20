import React, { useEffect, useState } from 'react';
import ProductNutrition from "./ProductNutrition";
import ProductLikeButton from "./ProductLikeButton";
import { useUser } from "./UserContext";
import { fetchProductDetail } from "../utils/ApiClient";
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { productId } = useParams();
    const { user } = useUser();
    const [product, setProduct] = useState(null);
    const [viewCount, setViewCount] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProductDetail = async () => {
            const result = await fetchProductDetail(productId, user?.userId);
            if (result.error) {
                setError(result.error);
            } else {
                setProduct(result.data);
                setViewCount(result.viewCount);
            }
        };

        getProductDetail();
    }, [productId, user]);

    if (error) {
        return <p>{error}</p>;
    }

    return product ? (
        <div className="product-detail">
            <div className="info">
                <div className="product-header">
                    <h2>{product.productName}</h2>
                    {user && (
                        <ProductLikeButton userId={user.userId} productId={product.productId} />
                    )}
                </div>
                <h2>평점: ⭐{product.averageRating}</h2>
                <h3>조회수: {viewCount || '0'}</h3>
                <h3>랭킹: {product.categoryName} 중, ??위</h3>
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