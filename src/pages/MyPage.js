import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShowUserInfo from "../components/ShowUserInfo";
import handleDeleteClick from "../components/HandleDeleteClick";
import { fetchLikedProducts } from "../components/UseFetchLikedProducts";
import LikedProductList from "../components/LikedProductList";
import { useUser } from "../components/UserContext";
import useRemoveLike from "../components/UseRemoveLike";
import NavigationContainer from "../containers/NavigationBarContainer";
import Footer from "../components/Footer";
import UserReviews from "../components/ReviewListForMypage";


function MyPage({
                    searchTerm: initialSearchTerm,
                    setSearchTerm: initialSetSearchTerm,
                    autocompleteItems: initialAutocompleteItems,
                    setAutocompleteItems: initialSetAutocompleteItems,
                }){
    const [isEditingNickname, setIsEditingNickname] = useState(false);
    const navigate = useNavigate();
    const { user } = useUser();
    const [likedProducts, setLikedProducts] = useState([]);
    const removeLike = useRemoveLike(user, setLikedProducts);

    // 탭 상태 추가
    const [activeTab, setActiveTab] = useState("likedProducts");
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [autocompleteItems, setAutocompleteItems] = useState(
        initialAutocompleteItems
    );

    useEffect(() => {
        fetchLikedProducts(user, setLikedProducts);
    }, [user]);

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
            <ShowUserInfo
                isEditingNickname={isEditingNickname}
                setIsEditingNickname={setIsEditingNickname}
                handleDeleteClick={() => handleDeleteClick(() => navigate('/'))}
                />
            <div>
                <button onClick={() => handleTabChange("likedProducts")}>찜한 목록</button>
                <button onClick={() => handleTabChange("reviews")}>리뷰 목록</button>
            </div>
            {activeTab === "likedProducts" ? (
                <LikedProductList likedProducts={likedProducts} handleRemoveClick={removeLike} />
            ) : (
                <UserReviews />
            )}
            {/* 나머지 내용 */}
            <Footer className="footer" />
        </>
    );
}

export default MyPage;