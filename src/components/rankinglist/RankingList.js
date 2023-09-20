import React, {useEffect, useState} from "react";
import ProductCard from "./ProductCard"
// import "../../styles/RankingPage.css"

function RankingList({ fetchFunction }){

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFunction()
            .then(data => setProducts(data))
            .catch(err => setError(err));
    }, [fetchFunction]);

    if (error) {
        return <div className="no-data">상품정보를 얻어오지 못했습니다.</div>;
    }
    
    return (
        <div className="product-list">
            {products.map(product => (
                <ProductCard
                    key = {product.productId}
                    productLink = {product.productLink}
                    imgSrc = {product.image}
                    productName = {product.productName}
                    // 얘네 두개는 어떻게 받아오죠..?
                    // reviewCount = {?}
                    // filter = {?}
                    category = {product.category}
                    isGreen = {product.isGreen}
                />
            ))}
        </div>
    );
}

export default RankingList;