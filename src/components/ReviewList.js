import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ReviewCard from './ReviewCard';

const SERVER_URL = "https://223.130.139.40:8080";

const ReviewList = ({productId, refreshReviews}) => {
        const [reviews, setReviews] = useState([]);
        const [page, setPage] = useState(0);
        const [error, setError] = useState(null);

        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/reviews/${productId}?page=${page}`);
                setReviews([...reviews, ...response.data]);
                setPage(page + 1);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError(error.message || "Error fetching reviews.");
            }
        };

        useEffect(() => {
            setPage(0);
            setReviews([]);
            fetchReviews();
        }, [productId, refreshReviews]);

        useEffect(() => {
            const handleScroll = () => {
                if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
                    fetchReviews();
                }
            };
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }, [reviews]);

        return (
            <div className="review-list content-max">
              <div className="review-card-wrap">
                {error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    reviews.map((review, index) => (
                        <ReviewCard key={index} review={review}/>
                    ))
                )}
                </div>
            </div>
        );
    }
;

export default ReviewList;
