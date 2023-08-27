import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/SearchResultPage.css';
import Header from "../components/Header";
import Filters from "../components/Filters";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";

function SearchResultPage() {
    const [items, setItems] = useState([]);
    const [displayedItems, setDisplayItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [autocompleteItems, setAutocompleteItems] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [searchName, setSearchName] = useState(searchParams.get('name') || '');
    const navigate = useNavigate();

    const handleKkiniChange = (kkini, isChecked) =>{
        // 끼니 또는 끼니 그린 체크리스트 변경 로직
    }
    const handleCategoryChange = async (category, isChecked) => {
        if (isChecked) {
            try {
                const response = await fetch(`${SERVER_URL}/products/categoryChecked?categoryName=${category}`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setItems(data);
                    setDisplayItems(data.slice(0, 10));
                } else {
                    console.error("Expected an array but received:", data);
                    setItems([]);
                }
            } catch (error) {
                console.error("Error fetching products by category:", error);
            }
        }
    };

    const handleFilterChange = (filter, isChecked) => {
        // 필터 변경 로직
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search-results?name=${searchTerm}`);
    };

    const SERVER_URL = "http://localhost:8080";

    useEffect(() => {
        if (searchName) {
            fetch(`${SERVER_URL}/search/products?name=${searchName}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (Array.isArray(data)) {
                        setItems(data);
                        setDisplayItems(data.slice(0, 10));
                    } else {
                        console.error("Expected an array but received:", data);
                        setItems([]);
                    }
                })
                .catch(error => {
                    console.error("Error fetching products:", error);
                });
        }
    }, [searchName]);


    const handleLoadMore = () => {
        const nextItems = items.slice(displayedItems.length, displayedItems.length + 10);
        setDisplayItems([...displayedItems, ...nextItems]);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        fetch(`${SERVER_URL}/search/autocomplete?name=${value}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const uniqueItems = [...new Set(data)];
                    setAutocompleteItems(uniqueItems);
                } else {
                    setAutocompleteItems([]);
                }
            });
    };

    return (
        <div className="search-result-page">
            <Header
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                autocompleteItems={autocompleteItems}
                setAutocompleteItems={setAutocompleteItems}
                handleSearchSubmit={handleSearchSubmit}
                handleInputChange={handleInputChange}
            />
            <div className="content-wrapper">
                <Filters
                    onCategoryChange={handleCategoryChange}
                    onFilterChange={handleFilterChange}
                    onKkiniChange={handleKkiniChange}
                />
                <ProductList items={displayedItems} />
                {items && displayedItems.length < items.length && (
                    <button onClick={handleLoadMore} className="load-more">더보기</button>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default SearchResultPage;
