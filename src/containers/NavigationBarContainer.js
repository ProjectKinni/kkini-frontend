import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoComponent from '../components/Logo';
import logout from "../components/Logout";
import getUserInfo from "../components/GetUserInfo";
import SearchBar from "../components/SearchBar";
import NavButtonsComponent from '../components/NavButtons';
import handleLogoutButton from "../components/HandleLogoutButton";


function NavigationContainer({ searchTerm, setSearchTerm, autocompleteItems, setAutocompleteItems }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserInfo().then(userData => setUser(userData));
    }, []);


    return (
        <div className="navigation-container">
            <div className="header">
                <LogoComponent />
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    autocompleteItems={autocompleteItems}
                    setAutocompleteItems={setAutocompleteItems}
                />
                <div className="nav-icons">
                    <span className="icon" onClick={() => user ? navigate('/user') : navigate('/login')}>👤</span>
                    <span className="icon"> ♥ </span>
                </div>
                <div className="nav-links">
                    {user ? (
                        <a href="" onClick={(e) => handleLogoutButton(navigate, setUser)(e)}>로그아웃</a>
                    ) : (
                        <a href="" onClick={() => navigate('/login')}>로그인</a>
                    )}
                    <a href="/information">소개</a>
                    <a href="/help">도움말</a>
                </div>
            </div>
            <NavButtonsComponent />
        </div>
    );
}

export default NavigationContainer;
