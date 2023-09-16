import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewCard from './ReviewCard';

const SERVER_URL = "http://223.130.138.156:8080";

const ReviewList = ({ productId, refreshReviews }) => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${SERVER_URL}/reviews/${productId}`)
            .then(response => {
                setReviews(response.data);
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
                setError(error.message || "Error fetching reviews.");
            });
    }, [productId, refreshReviews]);

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
