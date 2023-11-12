import React from "react";
import { useNavigate } from "react-router-dom";
import IcStar from "../assets/images/star_on.png";
import { incrementViewCount } from "../utils/ApiClient";
import { useUser } from "./UserContext";
import ProductLikeButton from "./ProductLikeButton";

function ProductList({ categoryGroups, noProductsFound, searchTerm }) {
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
    console.log("카테고리 그룹", categoryGroups); // 로깅 추가
    console.log("검색 결과 없음:", noProductsFound); // 로깅 추가
    console.log("검색어:", searchTerm); // 로깅 추가

    if (noProductsFound || searchTerm === "") {
        return <p className="no-data">해당 상품이 없습니다.</p>;
    }

    if (!allProducts.length) {
        return <p className="no-data">상품을 찾을 수 없습니다. 검색 조건을 확인해주세요.</p>;
    }

    return (
        <main className="product-list">
            {allProducts.map((item) => (
                <div
                    key={item.productId}
                    className="product-item"
                    onClick={() => handleProductClick(item.productId)}
                >
                    {user && (
                        <ProductLikeButton
                            userId={user.userId}
                            productId={item.productId}
                        />
                    )}
                    <div className="img-wrapper">
                        <img src={item.image} alt={item.productName} />
                    </div>
                    <h4>{item.productName}</h4>
                    <p className="rating-display">
                        <img src={IcStar} alt="별점" />
                        {(item.averageRating !== null && item.averageRating !== 'n')
                            ? item.averageRating.toFixed(1) // 평점 표시를 위한 toFixed(1) 추가
                            : "0.0"} (리뷰 {item.reviewCount ? item.reviewCount : 0}개)
                    </p>
                </div>
            ))}
        </main>
    );
}

export default ProductList;
