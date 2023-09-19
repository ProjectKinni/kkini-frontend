import React from 'react';
import { Link } from 'react-router-dom';

function LikedProductItem({ productLike, handleRemoveClick }) {
    return (
        <li key={`${productLike.product.productId}-${productLike.users.userId}`}>
            <img src={productLike.product.image} alt={productLike.product.productName} />
            <Link to={`/products/${productLike.product.productId}`}>
                <div>
                    <h3>{productLike.product.productName}</h3>
                </div>
            </Link>
            <button onClick={() => handleRemoveClick(productLike.product.productId)}>삭제</button>
        </li>
    );
}

export default LikedProductItem;
