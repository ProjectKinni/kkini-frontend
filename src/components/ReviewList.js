import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import '../styles/ReviewList.css';

const SERVER_URL = "http://localhost:8080";

const ReviewList = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${SERVER_URL}/reviews/${productId}`)
            .then(response => response.json())
            .then(data => setReviews(data))
            .catch(error => {
                console.error('Error fetching reviews:', error);
                setError(error.message || "Error fetching reviews.");
            });
    }, [productId]);

    return (
        <div className="review-list">
            {error ? (
                <div className="error-message">{error}</div>
            ) : (
                reviews.map((review, index) => (
                    <ReviewCard key={index} review={review} />
                ))
            )}
        </div>
    );
};

export default ReviewList;
