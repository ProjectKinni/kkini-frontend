import React, { useState } from 'react';
import StarRating from "./StarRating";

const ReviewForm = ({ onSubmit }) => {

    const [rating, setRating] = useState(5);
    const [content, setContent] = useState('');

    const handleRatingChange = (newRating) => {
        setRating(newRating);
      };
      
      const handleSubmit = () => {
        onSubmit(rating, content);
        setRating(5);
        setContent('');
      };

    return (
        <div className="review-form content-max">
            <h3>리뷰 작성하기</h3>
            <div className="form-review rating">
                <span className="tit">평점</span>
                <StarRating value={rating} onChange={handleRatingChange} />
            </div>
            <div className="form-review text">
                <div className="review-write">
                <textarea
                    value={content}
                    placeholder="내용을 입력하세요."
                    onChange={(e) => setContent(e.target.value)}
                />
                <button onClick={handleSubmit}>리뷰 작성</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;
