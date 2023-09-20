import React, { useEffect, useState } from 'react';
import { useUser } from './UserContext';
import axios from 'axios';

const SERVER_URL = "http://localhost:8080";

function UserReviews() {
    const { user } = useUser();
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {

        // 유저 ID와 페이지 번호를 사용하여 리뷰 목록을 가져옵니다.
        axios.get(`${SERVER_URL}/reviews/users/${user.userId}?page=${page}`)
            .then(response => {
                setReviews(response.data);
            })
            .catch(error => {
                console.error('Error fetching user reviews:', error);

            });
    }, [user, page]);

    const handleDeleteReview = (reviewId) => {
        // 리뷰 삭제 요청을 서버에 보냅니다.
        axios.delete(`${SERVER_URL}/reviews/${reviewId}`)
            .then(response => {
                // 삭제 성공한 경우, 삭제한 리뷰를 화면에서도 제거합니다.
                setReviews(prevReviews => prevReviews.filter(review => review.reviewId !== reviewId));
            })
            .catch(error => {
                console.error('Error deleting review:', error);
            });
    };

    return (
        <div>
            {reviews.length === 0 ? (
                <p>현재 작성된 리뷰가 없습니다.</p>
            ) : (
                <ul>
                    {reviews.map(review => (
                        <li key={review.reviewId}>
                            <br/>
                            <p>작성자: {review.user.nickname}</p>
                            <p>리뷰 내용: {review.content}</p>
                            <p>상품 이미지: <img src={review.product.image} alt={review.product.productName} /></p>
                            <p>상품 이름: {review.product.productName}</p>
                            <button onClick={() => handleDeleteReview(review.reviewId)}>리뷰 삭제 </button>
                        </li>
                    ))}
                </ul>
            )}
            {/* 페이지 이동 버튼 등을 추가하여 페이지를 변경할 수 있도록 함 */}
            <button onClick={() => setPage(page - 1)}>이전</button>
            <button onClick={() => setPage(page + 1)}>다음</button>
        </div>
    );
}

export default UserReviews;
