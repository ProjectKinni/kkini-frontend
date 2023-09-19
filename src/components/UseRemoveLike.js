import { useCallback } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:8080';

function useRemoveLike(user, setLikedProducts) {
    return useCallback((productId) => {
        axios.delete(`${SERVER_URL}/like/${user.userId}/${productId}`)
            .then(() => {
                axios.get(`${SERVER_URL}/like/liked-products/${user.userId}`)
                    .then((response) => {
                        setLikedProducts(response.data);
                    })
                    .catch((error) => {
                        console.error('찜한 상품 목록 가져오기 실패', error);
                    });
            })
            .catch((error) => {
                console.error('찜한 상품 삭제 실패', error);
            });
    }, [user, setLikedProducts]);
}

export default useRemoveLike;

