import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import {fetchLikedProducts, removeLikedProduct} from '../utils/ApiClient';
import { Link } from 'react-router-dom';

function LikeList() {
    const { user } = useUser();
    const [likedProducts, setLikedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0); // 현재 페이지
    const [pageSize, setPageSize] = useState(3); // 페이지 크기
    const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
    const PAGE_GROUP_SIZE = 10;  // 페이지 그룹 크기

    useEffect(() => {
        if (user) {
            // 사용자 ID와 현재 페이지, 페이지 크기를 사용하여 찜 목록을 가져옵니다.
            fetchLikedProducts(user.userId, page, pageSize)
                .then(data => {
                    setLikedProducts(data.content);
                    setTotalPages(data.totalPages);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching liked products:', error);
                    setLoading(false);
                });
        }
    }, [user, page, pageSize]);

    // 페이지 변경 함수
    const handlePageChange = newPage => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    const handleRemoveProduct = productId => {
        removeLikedProduct(user.userId, productId)
            .then(() => {
                fetchLikedProducts(user.userId, page, pageSize)
                    .then(data => {
                        setLikedProducts(data.content);
                        setTotalPages(data.totalPages);

                        if (page === totalPages - 1 && data.content.length === 0 && page > 0) {
                            setPage(page - 1);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching liked products:', error);
                    });
            })
            .catch(error => {
                console.error('Error removing liked product:', error);
            });
    };

    return (
        <div>
            <div>
                <ul>
                    {likedProducts.map(product => (
                        <li key={`${product.product.productId}-${product.users.userId}`}>
                            <img src={product.product.image} alt={product.product.productName} />
                            <Link to={`/products/${product.product.productId}`}>
                                <div>
                                    <h3>상품명 : {product.product.productName}</h3>
                                </div>
                            </Link>
                            <h3>평점 : {product.product.averageRating}</h3>
                            <button onClick={() => handleRemoveProduct(product.product.productId)}>찜 삭제</button>
                        </li>
                    ))}
                </ul>
                <div>
                    {page > 0 && (
                        <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
                            이전
                        </button>
                    )}
                    <ul>
                        {Array.from({ length: PAGE_GROUP_SIZE }, (_, i) => {
                            const pageNumber = Math.floor(page / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + i;
                            if (pageNumber >= totalPages) return null;
                            return (
                                <button key={i} onClick={() => handlePageChange(pageNumber)} disabled={page === pageNumber} >
                                    {pageNumber + 1}
                                </button>
                            );
                        })}
                    </ul>
                    {page < totalPages - 1 && (
                        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>
                            다음
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LikeList;

