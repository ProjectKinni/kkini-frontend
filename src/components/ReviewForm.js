import React, {useEffect, useState} from 'react';
import StarRating from "./StarRating";
import {getProductWithReviewStatus} from "../utils/ApiClient";
import {useUser} from "./UserContext";
import {useParams} from "react-router-dom";

const ReviewForm = ({onSubmit}) => {

    const [rating, setRating] = useState(5);
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [hasReviewed, setHasReviewed] = useState(false);
    const {productId} = useParams();
    const { user } = useUser();
    const userId = user.userId;


    useEffect(() => {
        getProductWithReviewStatus(productId, userId)
            .then(response => {
                const { product, hasReviewed } = response.data;
                setHasReviewed(hasReviewed);
            })
            .catch(error => {
                console.error('Error fetching product review status:', error);
            });
    }, []);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleImageChange = (e) => {
        const newFiles = Array.from(e.target.files);
        if (images.length + newFiles.length > 4) {
            alert("최대 4개의 이미지만 업로드 가능합니다.");
            return;
        }
        const newImages = [...images, ...newFiles];
        setImages(newImages);

        const newImageUrls = newFiles.map((file) => URL.createObjectURL(file));
        const allImagePreviews = [...imagePreviews, ...newImageUrls];
        setImagePreviews(allImagePreviews);
    };


    const removeImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);

        const newImagePreviews = [...imagePreviews];
        newImagePreviews.splice(index, 1);
        setImagePreviews(newImagePreviews);
    };

    const handleSubmit = () => {
        onSubmit(rating, content, images);
        setRating(5);
        setContent('');
        setImages([]);
        setImagePreviews([]);
    };

    return (
        <div className="review-form content-max">
            <h3>리뷰 작성하기</h3>
            <div className="form-review rating">
                <span className="tit">평점</span>
                <StarRating value={rating} onChange={handleRatingChange}/>
            </div>
            <div className="form-review text">
                <div className="review-write">
                <textarea
                    value={content}
                    placeholder={hasReviewed ? "이미 작성되었습니다" : "내용을 입력하세요"}
                    onChange={(e) => setContent(e.target.value)}
                />
                    {!hasReviewed ? (
                        <>
                            <input type="file" onChange={handleImageChange} />
                            <button onClick={handleSubmit}>리뷰 작성</button>
                        </>
                    ) : null}
                </div>
                </div>
            <div id="imagePreviews">
                {imagePreviews.map((image, index) => (
                    <div className="img-container" key={index}>
                        <img src={image} alt={`preview-${index}`} width="100" />
                        <button onClick={() => removeImage(index)}>삭제</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewForm;
