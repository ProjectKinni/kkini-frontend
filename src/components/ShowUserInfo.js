import React from 'react';
import UpdateCheckUserNickname from './UpdateCheckUserNickname';
import { useUser } from './UserContext';

function ShowUserInfo({ isEditingNickname, setIsEditingNickname, handleUpdateSuccess, handleDeleteClick }) {
    const { user, setUser } = useUser();

    if (!user) {
        return <div>로그인 해주세요</div>;
    }

    return (
        <div>
            <h1>회원 정보</h1>
            {isEditingNickname ? (
                <div>
                    <UpdateCheckUserNickname
                        user={user}
                        setUser={setUser}
                        setIsEditingNickname={setIsEditingNickname}
                        handleUpdateSuccess={handleUpdateSuccess}
                    />
                    <button onClick={() => setIsEditingNickname(false)}>취소</button><br />
                    <button onClick={handleDeleteClick}>회원 탈퇴</button><br />
                </div>
            ) : (
                <div>
                    <span>{`닉네임: ${user.nickname}`} <span style={{ cursor: 'pointer' }} onClick={() => setIsEditingNickname(true)}>✏️</span></span><br />
                    <button onClick={handleDeleteClick}>회원 탈퇴</button><br />
                </div>
            )}
        </div>
    );
}

export default ShowUserInfo;
