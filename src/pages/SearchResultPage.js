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
    const searchTermFromParams = searchParams.get('searchTerm') || '';
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [displayedItems, setDisplayItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const endpoint = `${SERVER_URL}/search/products?searchTerm=${searchTermFromParams}`;

        fetch(endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.message) {
                    setError(data.message);
                    setItems([]);
                    setDisplayItems([]);
                } else if (Array.isArray(data)) {
                    setItems(data);
                    setDisplayItems(data);
                } else {
                    const errorMsg = "Unexpected response format.";
                    setError(errorMsg);
                    setItems([]);
                    setDisplayItems([]);
                }
            })
            .catch(error => {
                setError(error.message || "Error fetching products.");
            });
    }, [searchTermFromParams]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search/products?searchTerm=${searchTerm.trim()}`);
        }
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
                {error ? (
                    <div className="error-message">
                        {error}
                    </div>
                ) : (
                    <>
                        <Filters
                            items={items}
                            setDisplayItems={setDisplayItems}
                            searchName={searchTermFromParams}
                            setItems={setItems}
                        />
                        <ProductList items={displayedItems} />
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default SearchResultPage;
