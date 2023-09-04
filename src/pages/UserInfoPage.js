import React, { useState, useEffect } from 'react';
import getUserInfo from "../components/GetUserInfo";

function UserInfoPage() {
    const [user, setUser] = useState(null);

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

    function renderUserInfo() {
        if (!user) {
            return <div>로그인 해주세요</div>;
        }

        return (
            <div>
                <h1>유저 정보</h1>
                <p>유저번호 : {user.userId}</p>
                <p>이메일: {user.email}</p>
                <p>역할: {user.role}</p>
                {/*아직 닉네임 업데이트 전이라 null값*/}
                <p>닉네임 : {user.nickname}</p>
                <a href="/">메인으로</a>
            </div>
        );
    }

    return (
        <div>
            {renderUserInfo()}
        </div>
    );
}

export default UserInfoPage;
