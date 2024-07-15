import axios from 'axios';

const SERVER_URL = "https://kkini.net";

export const fetchLikedProducts = (user, setLikedProducts) => {
    if (user) {
        axios.get(`${SERVER_URL}/like/liked-products/${user.userId}`)
            .then((response) => {
                setLikedProducts(response.data);
            })
            .catch((error) => {
                console.error('찜한 상품 가져오기 실패', error);
            });
    }
};

