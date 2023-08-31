import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/SearchResultPage.css';
import Header from "../components/Header";
import Filters from "../components/Filters";
import ProductList from "../components/ProductList";
import KkiniChecked from "../components/KkiniChecked";
import Footer from "../components/Footer";
import Categories from "../components/Categories";

const SERVER_URL = "http://localhost:8080";

function SearchResultPage(searchResults) {
    const [searchTerm, setSearchTerm] = useState('');
    const [autocompleteItems, setAutocompleteItems] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTermFromParams = searchParams.get('searchTerm') || '';
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [displayedItems, setDisplayItems] = useState([]);
    const [error, setError] = useState(null);
    const [filteredResults, setFilteredResults] = useState(searchResults);
    const [originalItems, setOriginalItems] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setFilteredResults(searchResults);
    }, [searchResults]);

    useEffect(() => {
        let endpoint;

        if (isChecked && selectedCategories.length > 0) {
            endpoint = `${SERVER_URL}/category/categories?isGreen=true&searchTerm=${searchTermFromParams}&categoryName=${selectedCategories.join(",")}`;
        } else if (isChecked) {
            endpoint = `${SERVER_URL}/category/kkini?isGreen=true&searchTerm=${searchTermFromParams}`;
        } else if (selectedCategories.length > 0) {
            endpoint = `${SERVER_URL}/category/categories?searchTerm=${searchTermFromParams}&categoryName=${selectedCategories.join(",")}`;
        } else {
            endpoint = `${SERVER_URL}/api/search/products/?searchTerm=${searchTermFromParams}`;
        }

        fetch(endpoint)
            .then(response => {
                if (!response.ok) {
                    // 서버에서 전송된 오류 메시지를 콘솔에 출력
                    return response.text().then(text => {
                        console.error("Server Error:", text);
                        throw new Error('Network response was not ok');
                    });
                }
                return response.json();
            })
            .then(data => {
                if (data.message) {
                    setError(data.message);
                    setItems([]);
                } else if (Array.isArray(data)) {
                    setItems(data);
                } else {
                    const errorMsg = "Unexpected response format.";
                    setError(errorMsg);
                    setItems([]);
                }
            })
            .catch(error => {
                setError(error.message || "Error fetching products.");
            });
    }, [searchTermFromParams, selectedCategories, isChecked]);

    const handleKkiniChecked = (checkedValue) => {
        setIsChecked(checkedValue);
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    };
    useEffect(() => {
        const categoryNamesFromParams = searchParams.getAll('categoryName');
        if (categoryNamesFromParams.length > 0) {
            setSelectedCategories(categoryNamesFromParams);
        }
    }, [location.search]);

    return (
        <div className="search-result-page">
            <Header
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                autocompleteItems={autocompleteItems}
                setAutocompleteItems={setAutocompleteItems}
            />
            <div className="content-wrapper">
                {error ? (
                    <div className="error-message">
                        {error}
                    </div>
                ) : (
                    <>
                        <div className="left-sidebar">
                            <KkiniChecked onKkiniChecked={handleKkiniChecked}/>
                            <Categories
                                onCategoryChange={setSelectedCategories}
                                selected={selectedCategories}
                                location={location}
                                searchParams={searchParams}
                            />
                            <Filters
                                items={items}
                                setDisplayItems={setDisplayItems}
                                searchName={searchTermFromParams}
                                setItems={setItems}
                            />
                        </div>
                        <ProductList items={items} />
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default SearchResultPage;