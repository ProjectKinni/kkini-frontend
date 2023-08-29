import React, { useEffect, useState, useRef } from 'react';
import logo from '../assets/images/kkini_logo.png';
import { useNavigate } from 'react-router-dom';

const SERVER_URL = "http://localhost:8080";

function Header({ searchTerm, setSearchTerm, autocompleteItems, setAutocompleteItems }) {
    const [recentSearches, setRecentSearches] = useState([]);
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
            }).catch(error => {
            console.error("Error fetching data:", error);
            setAutocompleteItems([]);
        });
    };

    const handleItemClick = (productName) => {
        setSearchTerm(productName);
        setAutocompleteItems([]);
        navigate(`/search-results?name=${productName}`);
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
                    />
                    <div className="autocomplete-items" ref={dropdownRef}>
                        {Array.isArray(autocompleteItems) && autocompleteItems.map(productName => (
                            <div key={productName} onClick={() => handleItemClick(productName)}>
                                {productName}
                            </div>
                        ))}
                    </div>
                    <input type="submit" value="검색" />
                </form>
            </div>
            <div className="nav-icons">
                <span className="icon">👤</span> {/* 마이페이지 아이콘 */}
                <span className="icon"> ♥ </span> {/* 찜하기 아이콘 */}
            </div>
            <div className="nav-links">
                <a href="#">로그인</a> |
                <a href="#">소개</a> |
                <a href="#">도움말</a>
            </div>
        </header>
    );
}

export default Header;