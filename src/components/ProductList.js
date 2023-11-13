import React from "react";
import { useNavigate } from "react-router-dom";
import IcStar from "../assets/images/star_on.png";
import { incrementViewCount } from "../utils/ApiClient";
import StarRatingForProductCard from './rankinglist/StarRatingForProductCard';
import { useUser } from "./UserContext";
import ProductLikeButton from "./ProductLikeButton";

function ProductList({ categoryGroups, noProductsFound, searchTerm, onReviewPosted }) {
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
            {allProducts.map((product) => {
                // averageRating이 숫자가 아닌 경우를 대비하여 parseFloat을 사용하여 변환을 시도합니다.
                // 이것은 null, undefined, 또는 숫자가 아닌 값을 걸러내고, 0을 기본값으로 제공합니다.
                const averageRating = parseFloat(product.averageRating) || 0;
                const averageTasteRating = parseFloat(product.averageTasteRating) || 0;
                const averagePriceRating = parseFloat(product.averagePriceRating) || 0;
                const averageEcoRating = parseFloat(product.averageEcoRating) || 0;

                return (
                <div key={product.productId} className="product-item" onClick={() => handleProductClick(product.productId)}>
                    <div className="img-wrapper">
                        <img src={product.imgSrc} alt={product.productName} className="product-img" />
                    </div>
                    <div className="con-wrapper">
                        <div className="item-title">
                            <p className="company">{product.makerName}</p>
                            <h4>{product.productName}</h4>
                            <p className="rating-display">
                                <img src={IcStar} alt="별점" />
                                {averageRating.toFixed(1)} 리뷰 {product.reviewCount}개
                            </p>
                            {user && <ProductLikeButton userId={user.userId} productId={product.productId} />}
                            <div className="tag-container">
                            </div>
                        </div>
                        <div className="item-info">
                            <ul className="nutrients">
                                <li>탄수화물 : {product.carbohydrate}g</li>
                                <li>단백질 : {product.protein}g</li>
                                <li>지방 : {product.fat}g</li>
                            </ul>
                            <ul className="rating-wrap">
                                <li>
                                    <span className="rating-name">맛</span>
                                    <div className="star-wrap">
                                        <StarRatingForProductCard rating={product.averageTasteRating} />
                                        <span className="num-rating">{product.averageTasteRating ? product.averageTasteRating.toFixed(1) : "0.0"}</span>
                                    </div>
                                </li>
                                <li>
                                    <span className="rating-name">가성비</span>
                                    <div className="star-wrap">
                                        <StarRatingForProductCard rating={product.averagePriceRating} />
                                        <span className="num-rating">{product.averagePriceRating ? product.averagePriceRating.toFixed(1) : "0.0"}</span>
                                    </div>
                                </li>
                                <li>
                                    <span className="rating-name">친환경 포장</span>
                                    <div className="star-wrap">
                                        <StarRatingForProductCard rating={product.averageEcoRating} />
                                        <span className="num-rating">{product.averageEcoRating ? product.averageEcoRating.toFixed(1) : "0.0"}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                );
            })}
        </main>
    );
}

export default ProductList;
