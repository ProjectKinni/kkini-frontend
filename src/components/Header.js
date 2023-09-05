import React, { useEffect, useState, useRef } from 'react';
import logo from '../assets/images/kkini_logo.png';
import { useNavigate } from 'react-router-dom';
import logout from "./Logout";
import getUserInfo from "./GetUserInfo";

const SERVER_URL = "http://localhost:8080";

function Header({ searchTerm, setSearchTerm, autocompleteItems, setAutocompleteItems }) {
    const [recentSearches, setRecentSearches] = useState([]);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const [user, setUser] = useState(null);

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

    useEffect(() => {
        getUserInfo().then(userData => setUser(userData));
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

        fetch(`${SERVER_URL}/api/search/autocomplete?name=${value}`)
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

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
        setUser(null);
        navigate('/');
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
                <span className="icon" onClick={() => user ? navigate('/user') : navigate('/login')}>👤</span> {/* 마이페이지 아이콘 */}
                <span className="icon"> ♥ </span> {/* 찜하기 아이콘 */}
            </div>
            <div className="nav-links">
                {user ? (
                    <a href="" onClick={(e) => handleLogout(e)}>로그아웃</a>
                ) : (
                    <a href="" onClick={() => navigate('/login')}>로그인</a>
                )}
                <a href="#">소개</a>
                <a href="#">도움말</a>
            </div>
        </header>
    );
}

export default Header;