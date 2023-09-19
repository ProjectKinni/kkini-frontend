import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import "../styles/ProductDetail.css";
import NavigationBarContainer from "../containers/NavigationBarContainer";
import { fetchProductDetail } from '../utils/ApiClient';
import ProductDetailContainer from '../containers/ProductDetailContainer';
import ReviewList from '../components/ReviewList';
import getUserInfo from '../components/GetUserInfo';
import ReviewForm from '../components/ReviewForm';

const SERVER_URL = "http://223.130.138.156:8080";

const ProductDetailPage = ({ setSearchTerm: initialSetSearchTerm }) => {
    const { productId } = useParams();
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
            if (user) {
                const { data, error, viewCount: fetchedViewCount } = await fetchProductDetail(productId, user.userId);
                if (error) {
                    setError(error);
                } else {
                    setProduct(data);
                    setViewCount(fetchedViewCount); // 조회수 상태를 업데이트
                }
            }
        };

        fetchProductData();
        setRefreshReviews(false);
    }, [productId, refreshReviews, user]);


    const handleReviewSubmit = () => {
        setRefreshReviews(true);
    };

    useEffect(() => {
        getUserInfo().then(userData => setUser(userData));
    }, []);

    return (
        <div className="product-detail-page">
            <NavigationBarContainer
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                autocompleteItems={autocompleteItems}
                setAutocompleteItems={setAutocompleteItems}
            />
            {product && <ProductDetailContainer productId={product.productId} product={product} viewCount={viewCount} // 수정된 조회수 상태를 전달
                                                userId={user ? user.userId : null}/>}
            {user && <ReviewForm userId={user.userId} productId={productId} onSubmit={handleReviewSubmit} />}
            <ReviewList productId={productId} refreshReviews={refreshReviews} />
        </div>
    );
};

export default ProductDetailPage;