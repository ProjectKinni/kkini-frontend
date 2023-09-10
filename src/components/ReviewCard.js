import React from 'react';

const ReviewCard = ({ review }) => {
    return (
        <div className="review-card">
            <div className="review-header">
                <span className="review-user">{review.user}</span>
                <span className="review-rating">{review.rating}⭐</span>
            </div>
            <div className="review-content">
                {review.content}
            </div>
            {/* 이미지가 있다면 띄워주기 */}
            {review.images && (
                <div className="review-images">
                    {review.images.map((image, index) => (
                        <img key={index} src={image} alt={`review-image-${index}`} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewCard;
