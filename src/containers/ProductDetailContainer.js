import React from 'react';
import ProductDetail from '../components/ProductDetail';
import LoadingOverlay from '../components/LoadingOverlay';
import ProductNutrition from '../components/ProductNutrition';
import {useUser} from "../components/UserContext";

const ProductDetailContainer = ({ product, viewCount }) => {
    const { user } = useUser();
    if (!product) {
        return <LoadingOverlay isLoading={true} />
    }

    return (
        <div className="product-detail-container content-max">
            {product && <ProductDetail product={product} viewCount={viewCount} userId={user?.userId} />}
            <ProductNutrition nutrition={product.nutrition} />
        </div>
    );
};

export default ProductDetailContainer;
