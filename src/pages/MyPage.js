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

    // 탭을 변경하는 함수
    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <>
            <NavigationContainer
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                autocompleteItems={autocompleteItems}
                setAutocompleteItems={setAutocompleteItems}
            />
            <div className="page-tit content-max">
                <h1>마이페이지</h1>
            </div>
            <ShowUserInfo
                isEditingNickname={isEditingNickname}
                setIsEditingNickname={setIsEditingNickname}
                handleDeleteClick={() => handleDeleteClick(() => navigate('/'))}
                />
            <div>
                <button onClick={() => handleTabChange("likedProducts")}>찜한 목록</button>
                <button onClick={() => handleTabChange("reviews")}>리뷰 목록</button>
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