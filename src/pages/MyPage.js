import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShowUserInfo from "../components/ShowUserInfo";
import handleDeleteClick from "../components/HandleDeleteClick";

function MyPage() {
    const [isEditingNickname, setIsEditingNickname] = useState(false);
    const navigate = useNavigate();

    return (
        <ShowUserInfo
            isEditingNickname={isEditingNickname}
            setIsEditingNickname={setIsEditingNickname}
            handleDeleteClick={() => handleDeleteClick(() => navigate('/'))}
        />
    );
}

export default MyPage;