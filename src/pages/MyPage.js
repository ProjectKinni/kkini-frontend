import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShowUserInfo from "../components/ShowUserInfo";
import handleDeleteClick from "../components/HandleDeleteClick";
import { useUser } from "../components/UserContext";
import NavigationContainer from "../containers/NavigationBarContainer";
import Footer from "../components/Footer";
import LikeList from "../components/LikeListForMypgae";
import UserReviews from "../components/ReviewListForMypage";
import "../styles/MyPage.css";



function MyPage({
                    searchTerm: initialSearchTerm,
                    setSearchTerm: initialSetSearchTerm,
                    autocompleteItems: initialAutocompleteItems,
                    setAutocompleteItems: initialSetAutocompleteItems,
                }){
    const [isEditingNickname, setIsEditingNickname] = useState(false);
    const navigate = useNavigate();
    const { user } = useUser();

    // 탭 상태 추가
    const [activeTab, setActiveTab] = useState("likedProducts");
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [autocompleteItems, setAutocompleteItems] = useState(
        initialAutocompleteItems
    );
 
    // 각 버튼의 className을 동적으로 설정하기 위한 함수
    const getButtonClassName = (tabName) => {
        return activeTab === tabName ? "on" : "";
    };

    // 탭을 변경하는 함수
    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <>
            <div className="page-tit content-max">
                <h1>마이페이지</h1>
            </div>
            <ShowUserInfo
                isEditingNickname={isEditingNickname}
                setIsEditingNickname={setIsEditingNickname}
                handleDeleteClick={() => handleDeleteClick(() => navigate('/'))}
                />
            <div className='content-max'>
                <div className="nav-buttons my-nav">
                    <button
                        onClick={() => handleTabChange("likedProducts")}
                        className={getButtonClassName("likedProducts")}>찜한 목록</button>
                    <button
                        onClick={() => handleTabChange("reviews")}
                        className={getButtonClassName("reviews")}>리뷰 목록</button>
                </div>
            </div>
            {activeTab === 'likedProducts' ?
                <LikeList />
                :
                <UserReviews />
            }
            <Footer className="footer" />
        </>
    );
}

export default MyPage;