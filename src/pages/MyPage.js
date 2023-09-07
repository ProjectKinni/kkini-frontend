import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from "../components/GetUserInfo";
import handleDeleteClick from "../components/DeleteUser";
import ShowUserInfo from "../components/ShowUserInfo";

function MyPage() {
    const [user, setUser] = useState(null);
    const [isEditingNickname, setIsEditingNickname] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getUserInfo().then(userData => setUser(userData));
    }, []);

    const handleUpdateSuccess = (updatedUserData) => {
        setUser(updatedUserData);
        setIsEditingNickname(false);
        alert('닉네임 변경이 완료되었습니다.');
    };

    return (
        <ShowUserInfo
            user={user}
            isEditingNickname={isEditingNickname}
            setIsEditingNickname={setIsEditingNickname}
            handleUpdateSuccess={handleUpdateSuccess}
            handleDeleteClick={() => handleDeleteClick(() => navigate('/'))}
        />
    );
}

export default MyPage;