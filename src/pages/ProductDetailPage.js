import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import "../styles/ProductDetail.css";
import NavigationBarContainer from "../containers/NavigationBarContainer";
import { fetchProductDetail } from '../utils/ApiClient';
import ProductDetailContainer from '../containers/ProductDetailContainer'; // 여기에 컴포넌트를 임포트합니다.

const SERVER_URL = "http://localhost:8080";

const ProductDetailPage = () => {
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

    useEffect(() => {
        const fetchProductData = async () => {
            const { data, error } = await fetchProductDetail(productId);
            if (error) {
                setError(error);
            } else {
                setProduct(data);
            }
        };

        fetchProductData();
    }, [productId]);

    return (
        <div className="product-detail-page">
            <NavigationBarContainer/>
            <ProductDetailContainer product={product} />
        </div>
    );
}

export default ProductDetailPage;
