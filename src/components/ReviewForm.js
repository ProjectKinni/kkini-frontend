import React, {useState, useEffect} from 'react';
import StarRating from "./StarRating";
import {useParams} from "react-router-dom";
import {useUser} from "./UserContext";
import {checkUserReviewedProduct} from "../utils/ApiClient";
import IcDelete from "../assets/images/ic_close.png";

const ReviewForm = ({onSubmit}) => {
    const [rating, setRating] = useState(5);
    const [tasteRating, setTasteRating] = useState(5);
    const [priceRating, setPriceRating] = useState(5);
    const [ecoRating, setEcoRating] = useState(5);
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [hasReviewed, setHasReviewed] = useState(false);
    const {productId} = useParams();
    const {user} = useUser();
    const userId = user.userId;

    useEffect(() => {
        async function fetchReviewStatus() {
            try {
                const data = await checkUserReviewedProduct(productId, user.userId);
                setHasReviewed(data);
            } catch (error) {
                console.error('Error fetching review status:', error);
            }
        }

        fetchReviewStatus();
    }, [productId, user.userId]);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleTasteRatingChange = (newRating) => {
        setTasteRating(newRating);
    };

    const handlePriceRatingChange = (newRating) => {
        setPriceRating(newRating);
    };

    const handleEcoRatingChange = (newRating) => {
        setEcoRating(newRating);
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
        onSubmit(rating, tasteRating, priceRating, ecoRating, content, images);
        setHasReviewed(true);
    };

    return (
        <div className="review-form content-max">

            {!hasReviewed && (
                <>
                    <h3>리뷰 작성하기</h3>
                    <div className="form-review rating rating-top">
                        <span className="tit">상품 만족도</span>
                        <StarRating value={rating} onChange={handleRatingChange}/>
                    </div>
                    <div className="form-review rating rating-sub">
                        <span className="tit">맛</span>
                        <StarRating value={tasteRating} onChange={handleTasteRatingChange}/>
                    </div>
                    <div className="form-review rating rating-sub">
                        <span className="tit">가성비</span>
                        <StarRating value={priceRating} onChange={handlePriceRatingChange}/>
                    </div>
                    <div className="form-review rating rating-sub rating-last">
                        <span className="tit">친환경 포장</span>
                        <StarRating value={ecoRating} onChange={handleEcoRatingChange}/>
                    </div>
                    <div className="form-review text">
                        <div className="review-write">
                        <textarea
                            value={content}
                            placeholder="내용을 입력하세요."
                            onChange={(e) => setContent(e.target.value)}
                        />
                            <input type="file" onChange={handleImageChange}/>
                            <button onClick={handleSubmit}>리뷰 작성</button>
                        </div>
                    </div>
                    <div id="imagePreviews">
                        {imagePreviews.map((image, index) => (
                            <div className="img-wrapper" key={index}>
                                <img src={image} alt={`preview-${index}`} width="100"/>
                                <button className="btn-close" onClick={() => removeImage(index)}>
                                    <img src={IcDelete} alt="이미지 삭제" />
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ReviewForm;
