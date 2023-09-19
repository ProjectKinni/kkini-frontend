import React, { useState, useEffect } from 'react';
import { toggleLike } from './ToggleLike'; // toggleLike.js 파일 경로에 맞게 수정
import axios from 'axios';
const SERVER_URL = 'http://localhost:8080';

function ProductLikeButton({ userId, productId }) {
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        // 서버에서 현재 좋아요 상태를 가져와 설정
        if (userId) {
            axios.get(`${SERVER_URL}/like/${userId}/${productId}`)
                .then(response => {
                    setIsLiked(response.data);
                })
                .catch(error => {
                    console.error('Error fetching like status:', error);
                });
        } else {
            setIsLiked(false); // Add this line
        }
    }, [userId, productId]);


    const handleToggleLike = () => {
        if (userId) {
            toggleLike(userId, productId, setIsLiked);
        }
    };

    if (!userId) {
        return null;
    }

    return (
        <div>
            <span onClick={handleToggleLike} style={{ cursor: 'pointer' }}>
                {isLiked ? '★' : '☆'}
            </span>
        </div>
    );
}

export default ProductLikeButton;


