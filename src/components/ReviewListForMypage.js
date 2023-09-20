import React from 'react';
import { useUser } from './UserContext';
import {useUserReviews} from "./UseUserReviews";

function UserReviews() {
    const { user } = useUser();
    const PAGE_GROUP_SIZE = 10;
    const { reviewsData, page, setPage , deleteAndFetchAgain} = useUserReviews(user.userId);


    return (
        <div>
            {reviewsData.content.length === 0 ? (
                <p>현재 작성된 리뷰가 없습니다.</p>
            ) : (
                <>
                    <ul>
                        {reviewsData.content.map(review => (
                            <li key={review.reviewId}>
                                <br/>
                                <p>작성자: {review.user.nickname}</p>
                                <p>리뷰 내용: {review.content}</p>
                                {/*<img src={review.product.image} alt={review.product.productName} />*/}
                                <p>상품 이름: {review.product.productName}</p>
                                <button onClick={() => deleteAndFetchAgain(review.reviewId)}>리뷰 삭제</button>
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {page > 0 && <button onClick={() => setPage(page - 1)}>이전</button>}

                        {Array.from({ length: PAGE_GROUP_SIZE }, (_, i) => {
                            const pageNumber = Math.floor(page / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + i;
                            if (pageNumber >= reviewsData.totalPages) return null;
                            return (
                                <button key={i} onClick={() => setPage(pageNumber)} disabled={page === pageNumber}>
                                    {pageNumber + 1}
                                </button>
                            );
                        })}

                        {(page + 1) !== reviewsData.totalPages &&
                            (<button onClick={() => setPage(page + 1)}>다음</button>)}
                    </ul>
                </>
            )}
        </div>
    );
}

export default UserReviews;

