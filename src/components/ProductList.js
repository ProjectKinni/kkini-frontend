import React from "react";
import { useNavigate } from "react-router-dom";
import { incrementViewCount } from "../utils/ApiClient";
import { useUser } from "./UserContext";
import { useProductClick } from "./hooks/useProductClick"
import ProductCard from "../components/rankinglist/ProductCard"

function ProductList({ categoryGroups, noProductsFound }) {

    const navigate = useNavigate();
    const { user } = useUser();
    const handleProductClick = useProductClick();
    const allProducts = Object.values(categoryGroups).flat();

    if (noProductsFound) {
        return <p className="no-data">해당 상품이 없습니다.</p>;
    }

    return (
        <main className="product-list">
            {allProducts.map((item) => (
                <ProductCard
                    key={item.productId}
                    productLink={`/products/${item.productId}`}
                    imgSrc={item.image}
                    productName={item.productName}
                    reviewCount={item.reviewCount}
                    category={item.category} // Assuming 'category' exists on 'item'
                    isGreen={item.isGreen}
                    onProductClick = {()=>handleProductClick(item.productId)}
                />
            ))}
        </main>
    );
}

export default ProductList;