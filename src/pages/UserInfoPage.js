import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from "../components/GetUserInfo";
import updateUserNickname from "../components/UpdateUserNickname";
import deleteUser from "../components/DeleteUser";
import Cookies from "js-cookie";
import checkNicknameAvailability from "../components/CheckNickname";

function UserInfoPage() {
    const [user, setUser] = useState(null);
    const [newNickname, setNewNickname] = useState('');
    const [isEditingNickname, setIsEditingNickname] = useState(false);
    const [isNicknameAvailable, setIsNicknameAvailable] = useState(true);
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

    async function handleUpdateClick() {
        try {
            const isAvailable = await checkNicknameAvailability(newNickname);

            if (!isAvailable) {
                setIsNicknameAvailable(false);
                return;
            }

            if (newNickname === user.nickname) {
                alert('현재 사용 중인 닉네임과 동일합니다. 다른 닉네임을 선택하세요.');
                return;
            }

            await updateUserNickname(newNickname);
            const updatedUserData = await getUserInfo();
            setUser(updatedUserData);
            setIsEditingNickname(false)
            alert('닉네임 변경이 완료되었습니다.');
        } catch (error) {
            console.error('Failed to update nickname', error);
        }
    }

    function handleNicknameChange(e) {
        setNewNickname(e.target.value);
        if (!isNicknameAvailable) {
            setIsNicknameAvailable(true);
        }
    }

    async function handleDeleteClick() {
        const confirmation = window.confirm('정말 탈퇴하시겠습니까?');
        if (confirmation) {
            try {
                await deleteUser();
                // 삭제 후 로그아웃 처리 또는 홈 화면으로 이동 등 추가 작업을 수행할 수 있습니다.
                navigate('/');

                Cookies.remove('access_token');

                // 추가: 얼럿 창으로 탈퇴 완료 메시지 표시
                alert('회원 탈퇴가 완료되었습니다.');
            } catch (error) {
                console.error('유저 삭제 실패', error);
            }
        }
    }

    function renderUserInfo() {
        if (!user) {
            return <div>로그인 해주세요</div>;
        }

        if (isEditingNickname) {
            // 편집 모드에서 닉네임 변경 입력 필드와 버튼 렌더링
            return (
                <div>
                    <h1>유저 정보</h1>
                    <p>유저번호: {user.userId}</p>
                    <p>이메일: {user.email}</p>
                    <p>역할: {user.role}</p>
                    <label htmlFor="nickname">닉네임:</label>
                    <input
                        id="nickname"
                        value={newNickname}
                        onChange={handleNicknameChange}
                        placeholder={user.nickname}
                    />
                    <span style={{ cursor: 'default' }}  onClick={handleUpdateClick}>👌</span><br />
                    <button onClick={() => setIsEditingNickname(false)}>취소</button><br />
                    <a href="/">메인으로</a>
                </div>
            );
        }

        // 편집 모드가 아닐 때 닉네임 정보만 렌더링
        return (
            <div>
                <h1>유저 정보</h1>
                <p>유저번호: {user.userId}</p>
                <p>이메일: {user.email}</p>
                <p>역할: {user.role}</p>
                <p>닉네임: {user.nickname}</p>
                <span style={{ cursor: 'default' }} onClick={() => setIsEditingNickname(true)}>✏️</span><br />
                <button onClick={handleDeleteClick}>탈퇴</button><br />
                <a href="/">메인으로</a>
            </div>
        );
    }

    return (
        <div>
            {renderUserInfo()}
            {!isNicknameAvailable && (
                <div style={{ color: 'red' }}>이미 사용 중인 닉네임입니다. 다른 닉네임을 선택하세요.</div>
            )}
        </div>
    );
}

export default UserInfoPage;
