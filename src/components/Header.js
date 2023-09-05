import React, { useEffect, useState, useRef } from 'react';
import logo from '../assets/images/kkini_logo.png';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

const SERVER_URL = "http://localhost:8080";

function Header({ searchTerm, setSearchTerm, autocompleteItems, setAutocompleteItems }) {
    const [recentSearches, setRecentSearches] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const storedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        setRecentSearches(storedSearches);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setAutocompleteItems([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm && !recentSearches.includes(searchTerm)) {
            const newSearches = [...recentSearches, searchTerm];
            setRecentSearches(newSearches);
            localStorage.setItem('recentSearches', JSON.stringify(newSearches));
        }

        navigate(`/search-results?searchTerm=${searchTerm}`);
    };

    const debouncedFetch = debounce((value) => {
        fetch(`${SERVER_URL}/api/products/autocomplete?searchTerm=${encodeURIComponent(value)}`)
            .then(response => {
                if (!response.ok) {
                    return null;
                }
                return response.json();
            })
            .then(data => {
                if (data && Array.isArray(data)) {
                    const uniqueItems = [...new Set(data)];
                    setAutocompleteItems(uniqueItems);
                } else {
                    setAutocompleteItems([]);
                }
            })
            .catch(() => {
                setAutocompleteItems([]);
            });
    }, 1000);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.length < 2) {
            setErrorMessage("검색어는 최소 2자 이상이어야 합니다.");
            setAutocompleteItems([]);
            return;
        } else {
            setErrorMessage(null);
        }

        debouncedFetch(value);
    }

    const handleItemClick = (productName) => {
        setSearchTerm(productName);
        setAutocompleteItems([]);
        navigate(`/search-results?searchTerm=${productName}`);
    };

    return (
        <header className="header">
            <img src={logo} className="logo" alt="kkini logo" onClick={() => navigate('/')}/>
            <div className="search-bar">
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        value={searchTerm}
                        onChange={handleInputChange}
                        list="recentSearches"
                        autoComplete="off"
                    />
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <input type="submit" value="Search" />
                </form>
            </div>
            <div className="nav-icons">
                <span className="icon">👤</span>
                <span className="icon"> ♥ </span>
            </div>
            <div className="nav-links">
                <a href="#">Login</a> |
                <a href="#">About</a> |
                <a href="#">Help</a>
            </div>
        </header>
    );
}

export default Header;
