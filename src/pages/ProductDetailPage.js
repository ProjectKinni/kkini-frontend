import React, {useState, useEffect} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import "../styles/ProductDetail.css";
import NavigationBarContainer from "../containers/NavigationBarContainer";
import {fetchProductDetail, handleReviewSubmit} from '../utils/ApiClient';
import ProductDetailContainer from '../containers/ProductDetailContainer';
import ReviewList from '../components/ReviewList';
import getUserInfo from '../components/GetUserInfo';
import ReviewForm from '../components/ReviewForm';

const SERVER_URL = "https://kkini.net";

const ProductDetailPage = ({setSearchTerm: initialSetSearchTerm}) => {
        const {productId} = useParams();
        const location = useLocation();
        const searchParams = new URLSearchParams(location.search);
        const searchTermFromParams = searchParams.get('searchTerm') || '';

        const [product, setProduct] = useState(null);
        const [searchTerm, setSearchTerm] = useState('');
        const [autocompleteItems, setAutocompleteItems] = useState([]);
        const [items, setItems] = useState([]);
        const [displayedItems, setDisplayItems] = useState([]);
        const [error, setError] = useState(null);
        const [user, setUser] = useState(null);
        const [refreshReviews, setRefreshReviews] = useState(false);
        const [viewCount, setViewCount] = useState(0); // 추가: viewCount 상태

        useEffect(() => {
            const fetchProductData = async () => {
                const {data, error, viewCount: fetchedViewCount} = await fetchProductDetail(productId, user?.userId);
                if (error) {
                    setError(error);
                } else {
                    setProduct(data);
                    setViewCount(fetchedViewCount);
                }
            };

            fetchProductData();
            setRefreshReviews(false);
        }, [productId, refreshReviews, user]);

        useEffect(() => {
            getUserInfo().then(userData => setUser(userData));
        }, []);

        const handleSubmitReview = async (rating, tasteRating, priceRating, ecoRating, content, images) => {
            const formData = new FormData();
            formData.append('rating', rating);
            formData.append('tasteRating', tasteRating);
            formData.append('priceRating', priceRating);
            formData.append('ecoRating', ecoRating);
            formData.append('content', content);
            images.forEach((image, index) => {
                formData.append(`image${index + 1}`, image);
            });

            const result = await handleReviewSubmit(user?.userId, productId, formData);
            if (!result.error) {
                console.log('리뷰 작성 성공:', result.data);
                setRefreshReviews(!refreshReviews);
            } else {
                console.error('리뷰 작성 실패:', result.error);
            }
        };

        return (
            <div className="product-detail-page">
                {product && <ProductDetailContainer productId={product.productId} product={product} viewCount={viewCount}
                                                    userId={user?.userId}/>}
                {user && <ReviewForm onSubmit={handleSubmitReview}/>}
                <ReviewList productId={productId} refreshReviews={refreshReviews}/>
            </div>
        );
    }
;

export default ProductDetailPage;