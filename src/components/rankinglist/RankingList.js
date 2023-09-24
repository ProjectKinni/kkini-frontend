import React, {useEffect, useState} from "react";
import ProductCard from "./ProductCard"

import { incrementViewCount } from "../../utils/ApiClient";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

function RankingList({ fetchFunction }){

    //제품클릭 했을 때 나오는 동작수행 할 hook
    const navigate = useNavigate();
    const { user } = useUser();

    //해당 API call 로 해당 제품 정보 얻어오기
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFunction()
            .then(data => setProducts(data))
            .catch(err => setError(err));
    }, [fetchFunction]);

    if (error) {
        return <div className="no-data">상품정보를 얻어오지 못했습니다.</div>;
    }

    const handleProductClick = async (productId) => {
        if (user && user.userId) {
            try {
                await incrementViewCount(productId, user.userId);
            } catch (error) {
                console.error("Error incrementing view count:", error);
            }
        }
        navigate(`/products/${productId}`);
    };

    return (
        <div className="product-list">
            {products.map(product => (
                <ProductCard
                    key = {product.productId}
                    productLink = {product.productLink}
                    imgSrc = {product.image}
                    productName = {product.productName}
                    onProductClick={()=>handleProductClick(product.productId)}
                    averageRating={product.averageRating}
                    reviewCount = {product.reviewCount}
                    // filter = {?}
                    category = {product.category}
                    isGreen = {product.isGreen}
                />
            ))}
        </div>
    );
}

export default RankingList;