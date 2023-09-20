import React, { useEffect, useState } from 'react';
import IcStar from "../assets/images/star_on.png";
import IcLikeOn from "../assets/images/ic_like_on.png";
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
          <div className="img-wrapper">
            <img src={product.image} alt={product.productName} />
          </div>
          <div className="info">
              <div className="product-header">
                  <h2>{product.productName}</h2>
                  {user && (
                      <ProductLikeButton userId={user.userId} productId={product.productId} />
                  )}
                  <button>
                    <img src={IcLikeOn} alt="찜 취소하기" />
                  </button>
              </div>
            <div className="product-content">
          <dl>
            <dt>평점</dt>
            <dd className="product-review">
              <div className="rating-display">
                <img src={IcStar} alt="별점" />
                {product.averageRating}
                <span>리뷰 개</span>
              </div>
              <button className="ic-review">리뷰 작성하기</button>
            </dd>

          </dl>
          <dl>
            <dt>상품번호</dt>
            <dd>{product.productId}</dd>
          </dl>
          <dl>
            <dt>조회수</dt>
            <dd>{viewCount || '0'}</dd>
          </dl>
          <dl>
            <dt>랭킹</dt>
            <dd></dd>
          </dl>
          <dl>
            <dt>중량</dt>
            <dd>{product.servingSize}g</dd>
          </dl>
          <dl>
            <dt>영양정보</dt>
            <dd>열량 {product.kcal}kcal</dd>
          </dl>
              </div>
              <ProductNutrition nutrition={product} />
          </div>
        </div>
    ) : (
        <p>Loading...</p>
    );
}

export default ProductDetail;