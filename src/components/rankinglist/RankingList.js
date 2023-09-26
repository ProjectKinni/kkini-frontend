import React, {useEffect, useState} from "react";
import ProductCard from "./ProductCard"

import {incrementViewCount, fetchGreenProducts} from "../../utils/ApiClient";
import {useNavigate} from "react-router-dom";
import {useUser} from "../UserContext";

function RankingList({fetchFunction}) {

    //제품클릭 했을 때 나오는 동작수행 할 hook
    const navigate = useNavigate();
    const {user} = useUser();

    //해당 API call 로 해당 제품 정보 얻어오기
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [error, setError] = useState(null);

    const loadMore = async () => {
        try {
            const response = await fetchFunction(page) // 페이지 번호를 인자로 전달
            setProducts([...products, ...response])
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setError(error.message || "Error fetching reviews.");
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 10
            ) {
                setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        loadMore();
    }, [page]);

    if (error) {
        return <div className="no-data">상품정보를 얻어오지 못했습니다.</div>;
    }

    const handleProductClick = async (productId) => {
        if (user && user.userId) {
            try {
                await incrementViewCount(productId, user.userId);
            } catch (error) {
                console.error("Error incrementing view count:", error);
            }
        }
        navigate(`/products/${productId}`);
    };

    return (
        <div className="product-list">
            { products && products.map(product => (
                <ProductCard
                    key={product.productId}
                    productLink={product.productLink}
                    imgSrc={product.image}
                    productName={product.productName}
                    onProductClick={() => handleProductClick(product.productId)}
                    averageRating={product.averageRating}
                    //reviewCount 가지고 오는 것은 Back에서 dto를 통해서 가지고 오고 있음. 실제 reviewCount 컬럼이 있는 것은 아님.
                    reviewCount={product.reviewCount}
                    // filter = {?}
                    category={product.category}
                    isGreen={product.isGreen}
                />
            ))}
        </div>
    );
}

export default RankingList;