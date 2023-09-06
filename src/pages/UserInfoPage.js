import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from "../components/GetUserInfo";
import handleDeleteClick from "../components/DeleteUser";
import UserInfo from "../components/UserInfo";

function UserInfoPage() {
    const [user, setUser] = useState(null);
    const [newNickname, setNewNickname] = useState('');
    const [isEditingNickname, setIsEditingNickname] = useState(false);
// eslint-disable-next-line no-unused-vars
    const [isNicknameAvailable, setIsNicknameAvailable] = useState(true);
// eslint-disable-next-line no-unused-vars
    const [alreadyAlerted, setAlreadyAlerted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadUser() {
            try {
                const userData = await getUserInfo(); // 함수 이름 수정
                setUser(userData);
            } catch (error) {
                // 에러 처리
            }
        }

        loadUser();
    }, []);

    const handleUpdateSuccess = (updatedUserData) => {
        setUser(updatedUserData);
        setIsEditingNickname(false);
        alert('닉네임 변경이 완료되었습니다.');
    };

    return (
        <UserInfo
            user={user}
            isEditingNickname={isEditingNickname}
            setIsEditingNickname={setIsEditingNickname}
            handleUpdateSuccess={handleUpdateSuccess}
            handleDeleteClick={() => handleDeleteClick(() => navigate('/'))}
        />
    );
}

export default UserInfoPage;