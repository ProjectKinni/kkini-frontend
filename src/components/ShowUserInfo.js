import React from 'react';
import UpdateCheckUserNickname from "./UpdateCheckUserNickname";

function ShowUserInfo({ user, isEditingNickname, setIsEditingNickname, handleUpdateSuccess, handleDeleteClick }) {
    if (!user) {
        return <div>로그인 해주세요</div>;
    }
    return (
        <div>
            <h1>유저 정보</h1>
            <p>유저번호: {user.userId}</p>
            <p>이메일: {user.email}</p>
            <p>역할: {user.role}</p>

            {/* 닉네임 편집 모드 확인 */}
            {isEditingNickname ? (
                // 편집 모드일 때
                <div>
                    <UpdateCheckUserNickname user={user} onUpdateSuccess={handleUpdateSuccess} />
                    <button onClick={() => setIsEditingNickname(false)}>취소</button><br/>
                    <button onClick={handleDeleteClick}>회원 탈퇴</button><br/>
                    <a href="/">메인으로</a>
                </div>
            ) : (
                // 편집 모드가 아닐 때
                <div>
                    {/* 닉네임 정보 */}
                    <span>{`닉네임: ${user.nickname}`} <span style={{ cursor: 'pointer' }} onClick={() => setIsEditingNickname(true)}>✏️</span></span><br/>
                    {/* 회원탈퇴 버튼 */}
                    <button onClick={handleDeleteClick}>회원 탈퇴</button><br/>
                    <a href="/">메인으로</a>
                </div>
            )}
        </div>
    );
}

export default ShowUserInfo;
