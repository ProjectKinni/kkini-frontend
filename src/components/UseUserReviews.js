import { useState, useEffect } from 'react';
import {fetchReviews, handleDeleteReview} from "../utils/ApiClient";

export function useUserReviews(userId) {
    const [reviewsData, setReviewsData] = useState({content: [], totalPages: 0});
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetchReviews(userId, page)
            .then(data => setReviewsData(data));
    }, [userId, page]);

    const deleteAndFetchAgain = (reviewId) => {
        handleDeleteReview(reviewId)
            .then(() => fetchReviews(userId, page))
            .then(data => setReviewsData(data));
    };

    return { reviewsData, page, setPage , deleteAndFetchAgain};
}
