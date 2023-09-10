import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import "../styles/ProductDetail.css"
import NavigationBarContainer from "../containers/NavigationBarContainer";

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
        fetch(`${SERVER_URL}/api/search/products/${productId}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => {
                console.error('Error fetching product:', error);
                setError(error.message || "Error fetching product.");
            });
    }, [productId]);

    return (
        <div className="product-detail-page">

            <NavigationBarContainer/>
            <ProductDetail product={product} />
            <h1>제품설명&상세정보</h1>
            <h1>리뷰~!</h1>
            </div>
    );
}

export default ProductDetailPage;
