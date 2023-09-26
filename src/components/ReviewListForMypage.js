import React from 'react';
import { useUser } from './UserContext';
import IcStar from "../assets/images/star_on.png";
import IcStarOff from "../assets/images/star_off.png";
import {useUserReviews} from "./UseUserReviews";
import {Link} from "react-router-dom";

function UserReviews() {
    const { user } = useUser();
    const PAGE_GROUP_SIZE = 10;
    const { reviewsData, page, setPage , deleteAndFetchAgain} = useUserReviews(user.userId);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className="my-page-con content-max">
            {reviewsData.content.length === 0 ? (
                <p className='no-data'>현재 작성된 리뷰가 없습니다.</p>
            ) : (
                <>
                    <ul className="review-list">
                        {reviewsData.content.map(review => (
                            <li className="review-card" key={review.reviewId}>
                                <div className="img-wrapper">
                                    <img src={review.product.image} alt={review.product.productName} />
                                </div>
                                <div className='con-wrapper'>
                                    <Link to={`/products/${review.product.productId}`} className="product-name">
                                    {review.product.productName}
                                    </Link>
                                    <div className='my-review'>
                                        <div className="rating-display">
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <img
                                                    src={i < review.product.averageRating ? IcStar : IcStarOff}
                                                    key={i}
                                                />
                                            ))}
                                        </div>
                                        <button className='ic-like ic-delete-like' onClick={() => deleteAndFetchAgain(review.reviewId)}>리뷰 삭제</button>
                                    </div>
                                    <p>{review.content}</p>
                                    <div className="review-image-wrap">
                                        {/* 이미지가 있다면 띄워주기 */}
                                        {review.image1 && (
                                            <div className="img-wrapper review-image">
                                                <img src={review.image1}/>
                                            </div>
                                        )}
                                        {review.image2 && (
                                            <div className="img-wrapper review-image">
                                                <img src={review.image2}/>
                                            </div>
                                        )}
                                        {review.image3 && (
                                            <div className="img-wrapper review-image">
                                                <img src={review.image3}/>
                                            </div>
                                        )}
                                        {review.image4 && (
                                            <div className="img-wrapper review-image">
                                                <img src={review.image4}/>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className='pagination'>
                        {page > 0 && <button onClick={() => handlePageChange(page - 1)}>이전</button>}
                        <div className='pages'>
                            {Array.from({ length: PAGE_GROUP_SIZE }, (_, i) => {
                                const pageNumber = Math.floor(page / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + i;
                                if (pageNumber >= reviewsData.totalPages) return null;
                                return (
                                    <button key={i} onClick={() => handlePageChange(pageNumber)} disabled={page === pageNumber}>
                                        {pageNumber + 1}
                                    </button>
                                );
                            })}
                        </div>
                        {(page + 1) !== reviewsData.totalPages &&
                            (<button onClick={() => handlePageChange(page + 1)}>다음</button>)}
                    </div>
                </>
            )}
        </div>
    );
}

export default UserReviews;

