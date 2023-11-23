import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import Modal from 'react-modal';
import IcStar from "../assets/images/star_on.png";
import IcStarOff from "../assets/images/star_off.png";
import { useNavigate } from 'react-router-dom';
import "../styles/ReviewUpdateModal.css";

const ReviewUpdateModal = ({ review, isOpen, onRequestClose, updateReview, onReviewUpdated }) => {
    const { user } = useUser();
    const initialReviewData = review ? {
        productId: review.product.productId || 0,
        content: review.content || '',
        rating: review.rating || 0,
        tasteRating: review.tasteRating || 0,
        priceRating: review.priceRating || 0,
        ecoRating: review.ecoRating || 0,
        images: review.images || []
    } : {
        productId: 0,
        content: '',
        rating: 0,
        tasteRating: 0,
        priceRating: 0,
        ecoRating: 0,
        images: []
    };
    const [reviewData, setReviewData] = useState(initialReviewData);
    const navigate = useNavigate(); // useNavigate 훅 사용
    useEffect(() => {
        console.log("Review prop:", review); // 로그 추가
        if (review) {
            setReviewData({
                productId: review.product.productId || 0,
                content: review.content || '',
                rating: review.rating || 0,
                tasteRating: review.tasteRating || 0,
                priceRating: review.priceRating || 0,
                ecoRating: review.ecoRating || 0,
                images: review.images || []
            });
        } else {
            setReviewData({
                productId: 0,
                content: '',
                rating: 0,
                tasteRating: 0,
                priceRating: 0,
                ecoRating: 0,
                images: []
            });
        }
    }, [review]);

    const handleRatingChange = (ratingType, value) => {
        setReviewData({ ...reviewData, [ratingType]: value });
    };

    const handleContentChange = (e) => {
        setReviewData({ ...reviewData, content: e.target.value });
    };

    const handleImageChange = (imageNumber, e) => {
        // 기존 이미지 배열이 없는 경우, 빈 배열로 초기화
        const imagesArray = reviewData.images || [];

        // 새 이미지 파일을 리뷰 데이터에 추가
        const newImages = imagesArray.slice(); // 기존 이미지 배열 복사
        newImages[imageNumber - 1] = e.target.files[0]; // 새 이미지 추가
        setReviewData({ ...reviewData, images: newImages });
    };

    // ReviewUpdateModal 컴포넌트 내부
    const handleSubmit = () => {
        const userId = user.userId;
        const reviewId = review.reviewId; // 여기서 reviewId가 올바른 타입인지 확인

        console.log("Sending review update: userId:", userId, "reviewId:", reviewId, "reviewData:", reviewData); // 로그 추가

        if (updateReview && typeof updateReview === "function") {
            updateReview(userId, reviewId, reviewData)
                .then(response => {
                    console.log("Update successful:", response);
                    onRequestClose();
                    onReviewUpdated(); // 리뷰가 수정된 후 리뷰 목록을 다시 불러오는 함수 호출
                    navigate('/user'); // 마이페이지 리뷰 목록으로 이동
                })
                .catch(error => {
                    // ...
                });
        } else {
            console.error("updateReview is not a function or not returning a Promise");
        }
    };


    return (
        <Modal className="review-update-modal" isOpen={isOpen} onRequestClose={onRequestClose}>
            <h3>리뷰 수정</h3>
            <div className="modal-body">
                {/* 내용 */}
                <textarea className="text-area" value={reviewData.content} onChange={handleContentChange} />

                {/* 상품 만족도 */}
                <div className="rating-area">
                    <span>상품 만족도: </span>
                    {[...Array(5)].map((_, index) => (
                        <img
                            key={index}
                            src={index < reviewData.rating ? IcStar : IcStarOff}
                            alt={`Rating ${index + 1}`}
                            onClick={() => handleRatingChange('rating', index + 1)}
                        />
                    ))}
                </div>

                {/* 맛 평가 */}
                <div className="rating-area">
                    <span>맛: </span>
                    {[...Array(5)].map((_, index) => (
                        <img
                            key={index}
                            src={index < reviewData.tasteRating ? IcStar : IcStarOff}
                            alt={`Taste Rating ${index + 1}`}
                            onClick={() => handleRatingChange('tasteRating', index + 1)}
                        />
                    ))}
                </div>

                {/* 가성비 평가 */}
                <div className="rating-area">
                    <span>가성비: </span>
                    {[...Array(5)].map((_, index) => (
                        <img
                            key={index}
                            src={index < reviewData.priceRating ? IcStar : IcStarOff}
                            alt={`Price Rating ${index + 1}`}
                            onClick={() => handleRatingChange('priceRating', index + 1)}
                        />
                    ))}
                </div>

                {/* 친환경 포장 평가 */}
                <div className="rating-area">
                    <span>친환경 포장: </span>
                    {[...Array(5)].map((_, index) => (
                        <img
                            key={index}
                            src={index < reviewData.ecoRating ? IcStar : IcStarOff}
                            alt={`Eco Rating ${index + 1}`}
                            onClick={() => handleRatingChange('ecoRating', index + 1)}
                        />
                    ))}
                </div>

                {/* 이미지 업로드 */}
                <div className="image-upload-area">
                    {[1, 2, 3, 4].map((number) => (
                        <div key={number}>
                            <label htmlFor={`image${number}`}>Image {number}: </label>
                            <input type="file" id={`image${number}`} onChange={(e) => handleImageChange(number, e)} />
                        </div>
                    ))}
                </div>

                <button onClick={handleSubmit}>수정</button>
                <button onClick={onRequestClose}>취소</button>
            </div>
        </Modal>
    );
};

export default ReviewUpdateModal;