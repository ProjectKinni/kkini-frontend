import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import IcStar from "../assets/images/star_on.png";
import IcArrow from "../assets/images/arrow_right.png";
import {fetchLikedProducts, removeLikedProduct} from '../utils/ApiClient';
import { Link } from 'react-router-dom';

function LikeList() {
    const { user } = useUser();
    const [likedProducts, setLikedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0); // 현재 페이지
    const [pageSize, setPageSize] = useState(20); // 페이지 크기
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
        <div className="my-page-con content-max">
            {likedProducts.length === 0 ? (
            <p className="no-data">현재 찜한 상품이 없습니다.</p>
            ) : (
            <>
            <div>
                <ul className="product-list">
                    {likedProducts.map(product => (
                        <li className="product-item" key={`${product.product.productId}-${product.users.userId}`}>
                            <div className="img-wrapper">
                                <img src={product.product.image} alt={product.product.productName} />
                            </div>
                            <Link to={`/products/${product.product.productId}`}>
                                <h4>{product.product.productName}</h4>
                            </Link>
                            <p className="rating-display">
                                <img src={IcStar} alt="별점" />
                                {product.product.averageRating ? product.product.averageRating.toFixed(1) : `0.0`}</p>
                            <button className='ic-like ic-delete-like' onClick={() => handleRemoveProduct(product.product.productId)}>삭제</button>
                        </li>
                    ))}
                </ul>
                <div className='pagination'>
                    {page > 0 && (
                        <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
                            <img src={IcArrow} alt="이전" style={{ transform: "rotate(180deg)" }}  />
                        </button>
                    )}
                    <div className='pages'>
                        {Array.from({ length: PAGE_GROUP_SIZE }, (_, i) => {
                            const pageNumber = Math.floor(page / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + i;
                            if (pageNumber >= totalPages) return null;
                            return (
                                <button key={i} onClick={() => handlePageChange(pageNumber)} disabled={page === pageNumber} >
                                    {pageNumber + 1}
                                </button>
                            );
                        })}
                    </div>
                    {page < totalPages - 1 && (
                        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>
                            <img src={IcArrow} alt="다음" />
                        </button>
                    )}
                </div>
            </div>
            </>
        )}
        </div>
    );
}

export default LikeList;

