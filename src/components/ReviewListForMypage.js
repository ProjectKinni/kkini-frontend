import React, { useState } from 'react';
import { useUser } from './UserContext';
import IcStar from "../assets/images/star_on.png";
import IcStarOff from "../assets/images/star_off.png";
import { useUserReviews } from "./UseUserReviews";
import { Link } from "react-router-dom";
import ReviewUpdateModal from './ReviewUpdateModal';

function UserReviews() {
    const { user } = useUser();
    const PAGE_GROUP_SIZE = 10;
    const {
        reviewsData,
        page,
        setPage,
        deleteAndFetchAgain,
        updateAndFetchAgain,
        editMode,
        setEditMode,
        currentEditId,
        setCurrentEditId,
        editReviewData,
        setEditReviewData,
        handleEditClick,
        handleConfirmEdit,
        handleCancelEdit
    } = useUserReviews(user.userId);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const openEditModal = (review) => {
        setEditReviewData({
            ...review, // review 객체를 전체 복사
            // 필요한 경우, images와 같은 배열 필드를 별도로 처리
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = () => {
        if (editReviewData && currentEditId) {
            updateAndFetchAgain(currentEditId, editReviewData)
                .then(() => {
                    setIsEditModalOpen(false);
                    alert('리뷰가 수정되었습니다.');
                })
                .catch(error => {
                    console.error('Error updating review:', error);
                    alert('리뷰 수정에 실패했습니다.');
                });
        } else {
            console.error('Invalid editReviewData:', editReviewData);
        }
    };

    const handleCancel = () => {
        setIsEditModalOpen(false);
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
                                                <img src={i < review.product.averageRating ? IcStar : IcStarOff} alt={`Star Rating: ${i < review.product.averageRating ? 'Filled' : 'Empty'}`} key={i} />
                                            ))}
                                        </div>
                                        <div className="review-actions">
                                            <button className='review-btn ic-edit-like' onClick={() => openEditModal(review)}>리뷰 수정</button>
                                            <button className='review-btn ic-delete-like' onClick={() => deleteAndFetchAgain(review.reviewId)}>리뷰 삭제</button>
                                        </div>
                                    </div>
                                    <p>{review.content}</p>
                                    <div className="review-image-wrap">
                                        {/* 이미지 표시 */}
                                        {review.image1 && <div className="img-wrapper review-image"><img src={review.image1} alt="Review" /></div>}
                                        {review.image2 && <div className="img-wrapper review-image"><img src={review.image2} alt="Review" /></div>}
                                        {review.image3 && <div className="img-wrapper review-image"><img src={review.image3} alt="Review" /></div>}
                                        {review.image4 && <div className="img-wrapper review-image"><img src={review.image4} alt="Review" /></div>}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <ReviewUpdateModal
                        isOpen={isEditModalOpen}
                        onRequestClose={() => setIsEditModalOpen(false)}
                        review={editReviewData}
                        updateReview={(userId, reviewId, newData) => updateAndFetchAgain(userId, reviewId, newData)}
                    />
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
                        {(page + 1) < reviewsData.totalPages && <button onClick={() => handlePageChange(page + 1)}>다음</button>}
                    </div>
                </>
            )}
        </div>
    );
}

export default UserReviews;
