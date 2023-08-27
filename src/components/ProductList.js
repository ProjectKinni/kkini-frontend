import React from 'react';

function ProductList({ items }) {
    return (
        <main className="product-list">
            {items.map(item => (
                <div key={item.productId} className="product-item">
                    <img src={item.productImage} alt={item.productName} width="100" />
                    <h4>{item.productName}</h4>
                    <p className="rating-display">
                        <span>⭐</span>
                        {item.averageRating.toFixed(2)} ({item.reviewCount} reviews)
                    </p>
                </div>
            ))}
        </main>
    );
}

export default ProductList;
