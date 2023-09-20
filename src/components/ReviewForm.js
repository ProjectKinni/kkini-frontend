import React, { useState } from 'react';

<<<<<<< HEAD
const ReviewForm = ({ onSubmit }) => {

    const [rating, setRating] = useState(5);
    const [content, setContent] = useState('');

      const handleSubmit = () => {
        onSubmit(rating, content);
        setRating(5);
        setContent('');
      };

    return (
        <div className="review-form">
            <h2>리뷰 작성하기</h2>
            <div className="form-group">
                <label>평점</label>
                <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
            </div>
            <div className="form-group">
                <label>내용</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <button onClick={ handleSubmit }>리뷰 작성</button>
        </div>
    );
};

export default ReviewForm;
