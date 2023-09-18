import React, { useState } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:8080';

const ReviewForm = ({ userId, productId, onSubmit }) => {
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/reviews/${userId}`, {
                productId,
                rating,
                content,
            });
            console.log('리뷰 작성 성공:', response.data);
            onSubmit();
            setRating(5);
            setContent('');
        } catch (error) {
            console.error('리뷰 작성 실패:', error);
        }
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
            <button onClick={handleSubmit}>리뷰 작성</button>
        </div>
    );
};

export default ReviewForm;
