import React from 'react';
import { Link } from 'react-router-dom';
import IcStar from "../assets/images/star_on.png";
import IcLikeOn from "../assets/images/ic_like_on.png";

function LikedProductItem({ productLike, handleRemoveClick }) {
  return (
    <div className="product-item" key={`${productLike.product.productId}-${productLike.users.userId}`}>
        <div className="img-wrapper">
        <img src={productLike.product.image} alt={productLike.product.productName} />
        </div>
      <Link to={`/products/${productLike.product.productId}`}>
        {productLike.product.productName}
      </Link>
        <p className="rating-display">
        <img src={IcStar} alt="별점" />5.0 (리뷰  개)
        </p>
      <button className="ic-like" onClick={() => handleRemoveClick(productLike.product.productId)}>
            <img src={IcLikeOn} alt="찜 취소하기" />
      </button>
    </div>
  );
}

export default LikedProductItem;
