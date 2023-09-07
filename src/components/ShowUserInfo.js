import React from 'react';
import UpdateCheckUserNickname from "./UpdateCheckUserNickname";
// import useFetchUserInfo from "./UseFetchUserInfo";
import {useUser} from "./UserContext";

function ShowUserInfo({ isEditingNickname, setIsEditingNickname, handleUpdateSuccess, handleDeleteClick }) {
    // const { user,  setUser } = useFetchUserInfo(); // Destructure user and setUser
    const { user, setUser } = useUser();

    if (!user) {
        return <div>로그인 해주세요</div>;
    }
    return (
        <div>
            <h1>유저 정보</h1>
            <p>유저번호: {user.userId}</p>
            <p>이메일: {user.email}</p>
            <p>역할: {user.role}</p>

            {isEditingNickname ? (
                <div>
                    <UpdateCheckUserNickname
                        user={user}
                        setUser={setUser}
                        setIsEditingNickname={setIsEditingNickname}
                        handleUpdateSuccess={handleUpdateSuccess}
                    />
                    <button onClick={() => setIsEditingNickname(false)}>취소</button><br/>
                    <button onClick={handleDeleteClick}>회원 탈퇴</button><br/>
                    <a href="/">메인으로</a>
                </div>
            ) : (
                <div>
                    <span>{`닉네임: ${user.nickname}`} <span style={{ cursor: 'pointer' }} onClick={() => setIsEditingNickname(true)}>✏️</span></span><br/>
                    <button onClick={handleDeleteClick}>회원 탈퇴</button><br/>
                    <a href="/">메인으로</a>
                </div>
            )}
        </div>
    );
}

export default ShowUserInfo;
