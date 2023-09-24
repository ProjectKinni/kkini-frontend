import React from "react";
import { useNavigate } from "react-router-dom";
import IcStar from "../assets/images/star_on.png";
import { incrementViewCount } from "../utils/ApiClient";
import { useUser } from "./UserContext";
import ProductLikeButton from "./ProductLikeButton";

function ProductList({ categoryGroups, noProductsFound }) {
    const navigate = useNavigate();
    const { user } = useUser();

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

    const allProducts = Object.values(categoryGroups).flat();

    if (noProductsFound) {
        return <p className="no-data">해당 상품이 없습니다.</p>;
    }

    return (
        <main className="product-list">
            {allProducts.map((item) => (
                <div
                    key={item.productId}
                    className="product-item"
                >
                    {user && (
                        <ProductLikeButton
                            userId={user.userId}
                            productId={item.productId}
                        />
                    )}
                    <div onClick={() => handleProductClick(item.productId)}>
                        <div className="img-wrapper">
                            <img src={item.image} alt={item.productName} />
                        </div>
                        <h4>{item.productName}</h4>
                        <p className="rating-display">
                            <img src={IcStar} alt="별점" />
                            {item.averageRating
                                ? item.averageRating
                                : "0.00"} (리뷰 {item.reviewCount}개)
                        </p>
                    </div>
                </div>
            ))}
        </main>
    );
}

export default ProductList;