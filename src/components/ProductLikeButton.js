import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:8080';

function ProductLikeButton({ userId, productId }) {
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        // 서버에서 현재 좋아요 상태를 가져와 설정
        axios.get(`${SERVER_URL}/like/${userId}/${productId}`)
            .then(response => {
                setIsLiked(response.data);
            })
            .catch(error => {
                console.error('Error fetching like status:', error);
            });
    }, [userId, productId]);

    const handleToggleLike = () => {
        // 좋아요 토글 요청을 서버로 보냄
        axios.post(`${SERVER_URL}/like/${userId}/${productId}/toggle`)
            .then(response => {
                setIsLiked(response.data);
            })
            .catch(error => {
                console.error('Error toggling like:', error);
            });
    };

    return (
        <div>
            <span onClick={handleToggleLike} style={{ cursor: 'pointer' }}>
                {isLiked ? '★' : '☆'}
            </span>
        </div>
    );
}

export default ProductLikeButton;