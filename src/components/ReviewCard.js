import React, { useState } from 'react';
import profile from "../assets/images/profile.png";
import IcStar from "../assets/images/star_on.png";
import IcStarOff from "../assets/images/star_off.png";
import { Link } from 'react-router-dom';
import ReviewModal from './ReviewModal';

const ReviewCard = ({review}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    const rating = parseInt(review.rating);

    const starImages = [];

    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            starImages.push(<img key={i} src={IcStar} alt={`star-on-${i}`}/>);
        } else {
            starImages.push(<img key={i} src={IcStarOff} alt={`star-off-${i}`}/>);
        }
    }

    return (
        <div className="review-card">
            <div className="review-header">
                <div className="user-profile">
                    <div className="user-img">
                        <img src={profile} alt="프로필 이미지"/>
                    </div>
                    <div>
                        <span className="user-name">{review.user.nickname}</span>
                        <div className="review-rating">
                            {starImages.map((star, index) => (
                                <span key={index}>{star}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <Link to={`/products/${review.product.productId}`} className="product-name">{review.product.productName}</Link>
            </div>
            <div className="review-content">{review.content}</div>
            <div className="review-image-wrap">
                {/* 이미지가 있다면 띄워주기 */}
                {review.image1 && (
                    <div
                    className="img-wrapper review-image"
                    onClick={openModal}
                    >
                    <img src={review.image1} />
                    </div>
                )}
                {review.image2 && (
                    <div
                    className="img-wrapper review-image"
                    onClick={openModal}
                    >
                    <img src={review.image2}/>
                    </div>
                )}
                {review.image3 && (
                    <div
                    className="img-wrapper review-image"
                    onClick={openModal}
                    >
                    <img src={review.image3}/>
                    </div>
                )}
                {review.image4 && (
                    <div
                    className="img-wrapper review-image"
                    onClick={openModal}
                    >
                    <img src={review.image4}/>
                    </div>
                )}
                {isModalOpen && (
                    <ReviewModal
                        images={[
                        review.image1,
                        review.image2,
                        review.image3,
                        review.image4,
                        ]}
                        userNickname={review.user.nickname}
                        starImages={starImages}
                        productName={review.product.productName}
                        content={review.content}
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                    />
                    )}
            </div>
        </div>
    );
};

export default ReviewCard;
