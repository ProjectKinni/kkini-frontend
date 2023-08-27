import React from 'react';

function ProductList({ items }) {
    return (
        <main className="product-list">
            {items.map(item => (
                <div key={item.itemId} className="product-item">
                    <img src={item.productImage} alt={item.name} width="100" />
                    <h4>{item.name}</h4>
                    <p className="rating-display">
                        <span className="fa fa-star"></span>
                        {item.averageRating.toFixed(2)} ({item.reviewCount} reviews)
                    </p>
                </div>
            ))}
        </main>
    );
}

export default ProductList;
