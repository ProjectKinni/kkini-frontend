import React, { useEffect, useState } from 'react';
import logo from '../assets/images/kkini_logo.png';
import { useNavigate } from 'react-router-dom';

function Header({ searchTerm, setSearchTerm, autocompleteItems, setAutocompleteItems }) {

    const [recentSearches, setRecentSearches] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        setRecentSearches(storedSearches);
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm && !recentSearches.includes(searchTerm)) {
            const newSearches = [...recentSearches, searchTerm];
            setRecentSearches(newSearches);
            localStorage.setItem('recentSearches', JSON.stringify(newSearches));
        }

        navigate(`/search-results?name=${searchTerm}`);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        console.log(value);
        setSearchTerm(value);

        fetch(`/search/autocomplete?name=${value}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                if (Array.isArray(data)) {
                    // 중복 항목 제거
                    const uniqueItems = [...new Set(data)];
                    setAutocompleteItems(uniqueItems);
                } else {
                    console.error("Expected an array but received:", data);
                    setAutocompleteItems([]);
                }
            }).catch(error => {
            console.error("Error fetching data:", error);
            setAutocompleteItems([]);
        });
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
                    <div className="autocomplete-items">
                        {Array.isArray(autocompleteItems) && autocompleteItems.map(productName => (
                            <div key={productName} onClick={() => setSearchTerm(productName)}>
                                {productName}
                            </div>
                        ))}
                    </div>
                    <input type="submit" value="Search" />
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