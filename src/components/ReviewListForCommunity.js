import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ReviewCard from './ReviewCard';

const SERVER_URL = "http://223.130.138.156:8080";

const ReviewListForCommunity = () => {
        const [reviews, setReviews] = useState([]);
        const [page, setPage] = useState(0);
        const [error, setError] = useState(null);

        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/reviews?page=${page}`);
                setReviews([...reviews, ...response.data]);
                setPage(page + 1);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError(error.message || "Error fetching reviews.");
            }
        };

        useEffect(() => {
            fetchReviews();
        }, []);

        useEffect(() => {
            const handleScroll = () => {
                if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                    fetchReviews();
                }
            };
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }, [reviews]);

        return (
            <div className="review-list content-max pt0">
                {error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    reviews.map((review, index) => (
                        <ReviewCard key={index} review={review}/>
                    ))
                )}
            </div>
        );
    }
;

export default ReviewListForCommunity;
