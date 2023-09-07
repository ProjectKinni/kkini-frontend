import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductList({ categoryGroups }) {
    const navigate = useNavigate();

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    return (
        <>
            {Object.keys(categoryGroups).map(category => (
                <div key={category}>
                    <h2>{category}</h2>
                    <main className="product-list">
                        {categoryGroups[category].map(item => (
                            <div key={item.productId} className="product-item"
                                 onClick={() => handleProductClick(item.productId)}>
                                <img src={item.image} alt={item.productName} width="100" />
                                <h4>{item.productName}</h4>
                                <p className="rating-display">
                                    <span>⭐</span>
                                    {item.averageRating.toFixed(2)} ({item.reviewCount} reviews)
                                </p>
                            </div>
                        ))}
                    </main>
                </div>
            ))}
        </>
    );
}

export default ProductList;
