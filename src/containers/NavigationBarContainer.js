import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoComponent from "../components/Logo";
import logout from "../components/Logout";
import getUserInfo from "../components/GetUserInfo";
import SearchBar from "../components/SearchBar";
import NavButtonsComponent from '../components/NavButtons';
import handleLogoutButton from "../components/HandleLogoutButton";
import icUser from "../assets/images/ic_user.png";
import icLike from "../assets/images/ic_like.png";
import icMenu from "../assets/images/ic_menu.png";


function NavigationContainer({
  searchTerm,
  setSearchTerm,
  autocompleteItems,
  setAutocompleteItems,
}) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserInfo().then((userData) => setUser(userData));
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    setUser(null);
    navigate("/");
  };

<<<<<<< HEAD

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
=======
  return (
    <div className="navigation-container">
      <div className="content-max">
        <div className="header">
          <div className="header-left">
            <LogoComponent />
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              autocompleteItems={autocompleteItems}
              setAutocompleteItems={setAutocompleteItems}
            />
          </div>
          <div className="header-right">
            <div className="nav-icons">
              <span
                className="icon"
                onClick={() => (user ? navigate("/user") : navigate("/login"))}
              >
                <img src={icUser} alt="마이 페이지" />
              </span>
              <span className="icon">
                <img src={icLike} alt="찜한 상품" />
              </span>
              <span className="icon ic-menu">
                <img src={icMenu} alt="메뉴" />
              </span>
>>>>>>> develop
            </div>
            <div className="nav-links">
              {user ? (
                <a href="" onClick={(e) => handleLogout(e)}>
                  로그아웃
                </a>
              ) : (
                <a href="" onClick={() => navigate("/login")}>
                  로그인
                </a>
              )}
              <a href="/information">소개</a>
              <a href="/help">도움말</a>
            </div>
          </div>
        </div>
        <NavButtonsComponent />
      </div>
    </div>
  );
}

export default NavigationContainer;
