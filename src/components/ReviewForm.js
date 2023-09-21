import React, {useState} from 'react';
import StarRating from "./StarRating";

const ReviewForm = ({onSubmit}) => {

    const [rating, setRating] = useState(5);
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    const handleSubmit = () => {
        onSubmit(rating, content, images);
        setRating(5);
        setContent('');
        setImages([]);
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
                    placeholder="내용을 입력하세요."
                    onChange={(e) => setContent(e.target.value)}
                />
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                    />
                    <button onClick={handleSubmit}>리뷰 작성</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;
