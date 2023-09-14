import React, {useState, useEffect} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import "../styles/ProductDetail.css";
import NavigationBarContainer from "../containers/NavigationBarContainer";
import {fetchProductDetail} from '../utils/ApiClient';
import ProductDetailContainer from '../containers/ProductDetailContainer';
import ReviewList from '../components/ReviewList'
import getUserInfo from '../components/GetUserInfo'
import ReviewForm from '../components/ReviewForm'

const SERVER_URL = "http://localhost:8080";

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

    useEffect(() => {
        const fetchProductData = async () => {
            const {data, error} = await fetchProductDetail(productId);
            if (error) {
                setError(error);
            } else {
                setProduct(data);
            }
        };

        fetchProductData();
    }, [productId]);

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
            <ProductDetailContainer product={product}/>
            {user && <ReviewForm userId={user.userId} productId={productId}/>}
            <ReviewList productId={productId}/>
        </div>
    );
}

export default ProductDetailPage;
