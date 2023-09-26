import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoComponent from "../components/Logo";
import logout from "../components/Logout";
import getUserInfo from "../components/GetUserInfo";
import SearchBar from "../components/SearchBar";
import NavButtonsComponent from '../components/NavButtons';
import icUser from "../assets/images/ic_user.svg";
import icLike from "../assets/images/ic_like.svg";
import icMenu from "../assets/images/ic_menu.svg";
import icClose from "../assets/images/ic_close_menu.png";
import IsLogin from "../components/IsLogin";


function NavigationContainer({
  searchTerm,
  setSearchTerm,
  autocompleteItems,
  setAutocompleteItems,
}) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false); // 메뉴 표시 여부 상태 변수
 const [menuIcon, setMenuIcon] = useState(icMenu); // 메뉴 아이콘 상태 변수

  useEffect(() => {
    getUserInfo().then((userData) => setUser(userData));
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    setUser(null);
    navigate("/");
    window.location.reload();
  };

   // 메뉴 버튼 클릭 핸들러
   const handleMenuClick = () => {
    setIsMenuVisible(!isMenuVisible); // 메뉴 표시 여부 토글
    // 아이콘 상태를 변경하여 메뉴 열림/닫힘 상태에 따라 이미지 변경
    setMenuIcon(isMenuVisible ? icMenu : icClose);
  };

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
              <span className="icon ic-menu" onClick={handleMenuClick}>
                <img src={menuIcon} alt="메뉴" />
              </span>
            </div>
            <div className={`nav-links ${isMenuVisible ? "menu-visible" : ""}`}>
              <IsLogin user={user} navigate={navigate} handleLogout={handleLogout} />
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
