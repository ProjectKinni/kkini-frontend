import React, {useEffect, useState} from 'react';
import IcStar from "../assets/images/star_on.png";
import IcLikeOn from "../assets/images/ic_like_on.png";
import ProductNutrition from "./ProductNutrition";
import ProductLikeButton from "./ProductLikeButton";
import LoadingOverlay from './LoadingOverlay';
import {useUser} from "./UserContext";
import {fetchProductDetail} from "../utils/ApiClient";
import {useParams} from 'react-router-dom';
import emtpyImage from "../assets/images/empty_image.png";

const ProductDetail = () => {
    const {productId} = useParams();
    const {user} = useUser();
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

            <div className="img-wrapper">
                <img src={product.image ? product.image : emtpyImage} alt={product.productName}/>
            </div>
            <div className="info">
                <div className="product-header">
                    <h2>{product.productName}</h2>
                    {user && (
                        <ProductLikeButton userId={user.userId} productId={product.productId}/>
                    )}
                </div>
                <div className="product-content">
                    <dl>
                        <dt>평점</dt>
                        <dd className="product-review">
                            <div className="rating-display">
                                <img src={IcStar} alt="별점"/>
                                {(product.averageRating !== null && product.averageRating !== 'n')
                                    ? product.averageRating : "0.0"}
                                <span>리뷰 {product.reviewCount}개</span>
                            </div>
                            {product.productLink ? (
                                <a href={product.productLink} className="btn-text btn-with-icon btn-buy">구매하기</a>
                            ) : null}
                        </dd>
                    </dl>
                    <dl>
                        <dt>단위 중량</dt>
                        <dd>{product.servingSize}g</dd>
                    </dl>
                    <dl>
                        <dt>영양정보</dt>
                        <dd>{product.kcal}kcal</dd>
                    </dl>
                </div>
                <ProductNutrition nutrition={product}/>
            </div>
        </div>
    ) : (
        <LoadingOverlay isLoading={true}/>
    );
}

export default ProductDetail;