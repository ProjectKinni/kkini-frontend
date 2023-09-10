import React, { useEffect, useState, useRef } from 'react';
import logo from '../assets/images/kkini_logo.png';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
// import logout from "./Logout";
// import getUserInfo from "./GetUserInfo";
import IsLogin from "./IsLogin";
import MyPageIcon from "./MyPageIcon";
import handleLogoutButton from "./HandleLogoutButton";
// import useFetchUserInfo from "./UseFetchUserInfo";
import {useUser} from "./UserContext";

const SERVER_URL = "http://localhost:8080";

function Header({ searchTerm, setSearchTerm, autocompleteItems, setAutocompleteItems }) {
    const [recentSearches, setRecentSearches] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const { user, setUser } = useUser();

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
    const handleLogout = handleLogoutButton(navigate,setUser);

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

                <span className="icon"> ♥ </span> {/* 찜하기 아이콘 */}
            </div>
            <div className="nav-links">
                <IsLogin user={user} navigate={navigate} handleLogout={handleLogout} />
                <a href="#">소개</a>
                <a href="#">도움말</a>
            </div>
        </header>
    );
}

export default Header;
