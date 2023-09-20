import React from 'react';
import ProductDetail from '../components/ProductDetail';
import ProductNutrition from '../components/ProductNutrition';
import {useUser} from "../components/UserContext";

const ProductDetailContainer = ({ product, viewCount }) => {
    const { user } = useUser();
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail-container">
            {product && <ProductDetail product={product} viewCount={viewCount} userId={user?.userId} />}
            <ProductNutrition nutrition={product.nutrition} />
        </div>
    );
};

export default ProductDetailContainer;
