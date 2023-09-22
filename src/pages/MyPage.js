import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ShowUserInfo from "../components/ShowUserInfo";
import handleDeleteClick from "../components/HandleDeleteClick";
import {fetchLikedProducts} from "../components/UseFetchLikedProducts";
import LikedProductList from "../components/LikedProductList";
import {useUser} from "../components/UserContext";
import useRemoveLike from "../components/UseRemoveLike";
import MyPageButtons from "../components/MyPageButtons";
import NavigationContainer from "../containers/NavigationBarContainer";
import "../styles/MyPage.css";

function MyPage() {
    const [isEditingNickname, setIsEditingNickname] = useState(false);
    const navigate = useNavigate();
    const { user } = useUser();
    const [likedProducts, setLikedProducts] = useState([]);
    const removeLike = useRemoveLike(user, setLikedProducts); // 가져온 함수 사용

    useEffect(() => {
        fetchLikedProducts(user, setLikedProducts);
    }, [user]);

    return (
        <>
            <NavigationContainer
            />
            <div className="page-tit content-max">
                <h1>마이페이지</h1>
            </div>
            <ShowUserInfo
                isEditingNickname={isEditingNickname}
                setIsEditingNickname={setIsEditingNickname}
                handleDeleteClick={() => handleDeleteClick(() => navigate('/'))}
            />
            <MyPageButtons />
            <LikedProductList likedProducts={likedProducts} handleRemoveClick={removeLike} />
        </>
    );
}

export default MyPage;