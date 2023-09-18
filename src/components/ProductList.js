import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductList({ categoryGroups, noProductsFound }) {
    const navigate = useNavigate();

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    const allProducts = Object.values(categoryGroups).flat();

    if (noProductsFound) {
        return <p>해당 상품이 없습니다</p>;
    }

    return (
        <main className="product-list">
            {allProducts.map(item => (
                <div key={item.productId} className="product-item"
                     onClick={() => handleProductClick(item.productId)}>
                    <img src={item.image} alt={item.productName} width="100" />
                    <h4>{item.productName}</h4>
                    <p className="rating-display">
                        <span>⭐</span>
                        {item.averageRating ? item.averageRating.toFixed(2) : "0.00"} ({item.reviewCount} reviews)
                    </p>
                </div>
            ))}
        </main>
    );
}

export default ProductList;
