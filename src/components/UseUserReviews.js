import { useState, useEffect } from 'react';
import { fetchReviews, handleDeleteReview, handleUpdateReview } from "../utils/ApiClient";

export function useUserReviews(userId) {
    const [reviewsData, setReviewsData] = useState({ content: [], totalPages: 0 });
    const [page, setPage] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [currentEditId, setCurrentEditId] = useState(null);
    const [editReviewData, setEditReviewData] = useState(null);

    useEffect(() => {
        fetchReviews(userId, page)
            .then(data => setReviewsData(data));
    }, [userId, page]);

    const deleteAndFetchAgain = (reviewId) => {
        handleDeleteReview(reviewId)
            .then(() => fetchReviews(userId, page))
            .then(data => setReviewsData(data));
    };

    const updateAndFetchAgain = (userId, updatedData, reviewId) => {
        console.log("Updating review with data:", updatedData); // 로그 추가

        return handleUpdateReview(userId, updatedData, reviewId)
            .then(() => fetchReviews(userId, page))
            .then(data => setReviewsData(data));
    };

    // 수정 버튼 클릭 시 호출될 함수
    const handleEditClick = (reviewId) => {
        setEditMode(true);
        setCurrentEditId(reviewId);
        const reviewToEdit = reviewsData.content.find(review => review.reviewId === reviewId);
        setEditReviewData(reviewToEdit || {}); // 리뷰 데이터를 찾을 수 없는 경우 빈 객체로 초기화
    };

    // 확인 버튼 클릭 시 호출될 함수
    const handleConfirmEdit = (updatedReviewData) => {
        setEditMode(false);
        updateAndFetchAgain(currentEditId, updatedReviewData)
            .then(() => {
                alert('리뷰가 수정되었습니다.');
            });
    };

    // 취소 버튼 클릭 시 호출될 함수
    const handleCancelEdit = () => {
        setEditMode(false);
        // 수정을 취소하고 원래 리뷰 데이터로 복원하는 로직은, 기본적으로 리뷰 목록을 다시 가져오는 것으로 처리됩니다.
    };

    return {
        reviewsData,
        page,
        setPage,
        deleteAndFetchAgain,
        updateAndFetchAgain,
        editMode,
        setEditMode,
        currentEditId,
        setCurrentEditId,
        editReviewData,
        setEditReviewData,
        handleEditClick,
        handleConfirmEdit,
        handleCancelEdit
    };
}
