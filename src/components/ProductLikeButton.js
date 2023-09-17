// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//
// const SERVER_URL = 'http://localhost:8080';
//
// function ProductLikeButton({ userId, productId }) {
//     const [isLiked, setIsLiked] = useState(false);
//
//     useEffect(() => {
//         // 서버에서 현재 좋아요 상태를 가져와 설정
//         axios.get(`${SERVER_URL}/like/${userId}/${productId}`)
//             .then(response => {
//                 setIsLiked(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching like status:', error);
//             });
//     }, [userId, productId]);
//
//     const handleToggleLike = () => {
//         if (userId) {
//             // 유저가 로그인한 경우에만 좋아요 토글 요청을 서버로 보냄
//             axios.post(`${SERVER_URL}/like/${userId}/${productId}/toggle`)
//                 .then(response => {
//                     setIsLiked(response.data);
//                 })
//                 .catch(error => {
//                     console.error('Error toggling like:', error);
//                 });
//         }
//     };
//
//     // 유저가 로그인하지 않은 경우에는 아무것도 렌더링하지 않음
//     if (!userId) {
//         return null;
//     }
//
//     return (
//         <div>
//             <span onClick={handleToggleLike} style={{ cursor: 'pointer' }}>
//                 {isLiked ? '★' : '☆'}
//             </span>
//         </div>
//     );
// }
//
// export default ProductLikeButton;

// ProductLikeButton.js
// import React, { useState, useEffect } from 'react';
// import { toggleLike } from './ToggleLike'; // toggleLike.js 파일 경로에 맞게 수정
// import axios from 'axios';
// const SERVER_URL = 'http://localhost:8080';
//
// function ProductLikeButton({ userId, productId }) {
//     const [isLiked, setIsLiked] = useState(false);
//
//     useEffect(() => {
//         // 서버에서 현재 좋아요 상태를 가져와 설정
//         axios.get(`${SERVER_URL}/like/${userId}/${productId}`)
//             .then(response => {
//                 setIsLiked(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching like status:', error);
//             });
//     }, [userId, productId]);
//
//     const handleToggleLike = () => {
//         toggleLike(userId, productId, setIsLiked);
//     };
//
//     // 유저가 로그인하지 않은 경우에는 아무것도 렌더링하지 않음
//     if (!userId) {
//         return null;
//     }
//
//     return (
//         <div>
//             <span onClick={handleToggleLike} style={{ cursor: 'pointer' }}>
//                 {isLiked ? '★' : '☆'}
//             </span>
//         </div>
//     );
// }
//
// export default ProductLikeButton;

import React, { useState, useEffect } from 'react';
import { toggleLike } from './ToggleLike'; // toggleLike.js 파일 경로에 맞게 수정
import axios from 'axios';
const SERVER_URL = 'http://localhost:8080';

function ProductLikeButton({ userId, productId }) {
    const [isLiked, setIsLiked] = useState(false);

    // useEffect(() => {
    //     // 서버에서 현재 좋아요 상태를 가져와 설정
    //     if (userId) {
    //         axios.get(`${SERVER_URL}/like/${userId}/${productId}`)
    //             .then(response => {
    //                 setIsLiked(response.data);
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching like status:', error);
    //             });
    //     }
    // }, [userId, productId]);

    useEffect(() => {
        // 서버에서 현재 좋아요 상태를 가져와 설정
        const fetchLikeStatus = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/like/${userId}/${productId}`);
                setIsLiked(response.data);
            } catch (error) {
                console.error('Error fetching like status:', error);
            }
        };

        if (userId) {
            fetchLikeStatus();
        } else {
            // 유저가 로그인하지 않은 경우 좋아요 상태를 false로 설정
            setIsLiked(false);
        }
    }, [userId, productId]);


    const handleToggleLike = () => {
        if (userId) {
            toggleLike(userId, productId, setIsLiked);
        }
    };

    // 유저가 로그인하지 않은 경우에는 아무것도 렌더링하지 않음
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


