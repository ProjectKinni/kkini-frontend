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

    async function handleUpdateClick() {
        try {

            if (newNickname.length < 2 || newNickname.length > 10) {
                alert('닉네임은 최소 2글자에서 최대 10글자여야 합니다.');
                return;
            }

            const profanityRegex = /(씨발|시발|병신|개새끼|지랄|니애미|니애비|니할배)/i;

            if (profanityRegex.test(newNickname)) {
                alert('불순한 언어가 포함된 부적절한 닉네임입니다.');
                return;
            }

            const specialChars = /[^A-Za-z0-9가-힣]/;
            if (specialChars.test(newNickname)) {
                alert('잘못된 닉네임 형식입니다.');
                return;
            }

            if(newNickname === user.nickname){
                alert('현재 닉네임과 동일한 닉네임입니다. 새로운 닉네임을 입력해주세요.')
                return;
            }

            const isAvailable = await checkNicknameAvailability(newNickname);

            if (!isAvailable) {
                setIsNicknameAvailable(false);
                setAlreadyAlerted(false); // 중복된 닉네임일 때 경고를 표시하도록 초기화
                alert('이미 사용 중인 닉네임입니다. 다른 닉네임을 선택하세요.');
                return;
            }

            await updateUserNickname(newNickname);
            const updatedUserData = await getUserInfo();
            setUser(updatedUserData);
            setIsEditingNickname(false);
            setIsNicknameAvailable(true);
            setAlreadyAlerted(false); // 닉네임 변경 완료 후 경고 초기화
            alert('닉네임 변경이 완료되었습니다.');
        } catch (error) {
            console.error('Failed to update nickname', error);
        }
    }

    function handleNicknameChange(e) {
        setNewNickname(e.target.value);
        setIsNicknameAvailable(true); // 닉네임 변경 시 다시 가용한 상태로 설정
        setAlreadyAlerted(false); // 경고 초기화
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
                    {/*{!isNicknameAvailable && (*/}
                    {/*    <div style={{ color: 'red' }}>이미 사용 중인 닉네임입니다. 다른 닉네임을 선택하세요.</div>*/}
                    {/*)}*/}
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
        </div>
    );
}

export default UserInfoPage;
