import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/SearchResultPage.css';
import Header from "../components/Header";
import Filters from "../components/Filters";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";

const SERVER_URL = "http://localhost:8080";

function SearchResultPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [autocompleteItems, setAutocompleteItems] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchName = searchParams.get('name') || '';
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [displayedItems, setDisplayItems] = useState([]);

    const categoryName = searchParams.get('categoryName') || '';

    useEffect(() => {
        let endpoint = `${SERVER_URL}/search/products?`;
        if (searchName) {
            endpoint += `productName=${searchName}&`;  // '&' 추가
        }
        if (categoryName) {
            endpoint += `categoryName=${categoryName}&`;
        }

        fetch(endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.message) { // 메시지가 있는 경우
                    console.warn(data.message); // 경고 메시지 출력
                    setItems([]);
                    setDisplayItems([]);
                } else if (Array.isArray(data)) { // 배열인 경우
                    const transformedData = data.map(item => ({
                        ...item,
                        isKkini: !!item.isKkini
                    }));
                    setItems(transformedData);
                    setDisplayItems(transformedData);
                } else {
                    console.error("Unexpected response format:", data);
                    setItems([]);
                    setDisplayItems([]);
                }
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    }, [searchName, categoryName]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`${SERVER_URL}/search-results?name=${searchTerm}`);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    return (
        <div className="search-result-page">
            <Header
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                autocompleteItems={autocompleteItems}
                setAutocompleteItems={setAutocompleteItems}
            />
            <div className="content-wrapper">
                <Filters
                    items={items}
                    setDisplayItems={setDisplayItems}
                    searchName={searchName}
                    setItems={setItems}
                />
                <ProductList items={displayedItems} />
            </div>
            <Footer />
        </div>
    );
}

export default SearchResultPage;
