import React from 'react';
import ProductDetail from '../components/ProductDetail';
import ProductNutrition from '../components/ProductNutrition';

const ProductDetailContainer = ({ product, viewCount }) => {
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail-container">
            <ProductDetail product={product} productId={product.productId} viewCount={viewCount}/>
            <ProductNutrition nutrition={product.nutrition} />
        </div>
    );
};

export default ProductDetailContainer;

