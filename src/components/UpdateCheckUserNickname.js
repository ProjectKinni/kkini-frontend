import React, { useState} from 'react';
import updateUserNickname from "../components/UpdateUserNickname";
import IsNicknameAvailable from "./IsNicknameAvailable";
import getUserInfo from "../components/GetUserInfo";

function UpdateCheckUserNickname({ user, onUpdateSuccess }) {
    const [newNickname, setNewNickname] = useState('');
    const [isNicknameAvailable, setIsNicknameAvailable] = useState(true);

    const handleNicknameChange = (e) => {
        setNewNickname(e.target.value);
        setIsNicknameAvailable(true);
    };


    const handleUpdateClick = async () => {
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

            if (newNickname === user.nickname) {
                alert('현재 닉네임과 동일한 닉네임입니다. 새로운 닉네임을 입력해주세요.');
                return;
            }

            const isAvailable = await IsNicknameAvailable(newNickname);

            if (!isAvailable) {
                setIsNicknameAvailable(false);
                alert('이미 사용 중인 닉네임입니다. 다른 닉네임을 선택하세요.');
                return;
            }

            await updateUserNickname(newNickname);
            const updatedUserData = await getUserInfo();
            onUpdateSuccess(updatedUserData);
        } catch (error) {
            console.error('Failed to update nickname', error);
        }
    };

    return (
        <div>
            <label htmlFor="nickname">닉네임:</label>
            <input
                id="nickname"
                value={newNickname}
                onChange={handleNicknameChange}
                placeholder={user.nickname}
            />
            <span style={{ cursor: 'pointer' }} onClick={handleUpdateClick}>👌</span>
            {!isNicknameAvailable && (
                <div style={{ color: 'red' }}>이미 사용 중인 닉네임입니다. 다른 닉네임을 선택하세요.</div>
            )}
        </div>
    );
}

export default UpdateCheckUserNickname;
