import axios from 'axios';
import Cookies from 'js-cookie';
import IsNicknameAvailable from "./IsNicknameAvailable";

const SERVER_URL = "https://223.130.139.40:8080";

async function UpdateUserNickname(newNickname) {
    const token = Cookies.get('access_token');

    try {
        const isNicknameAvailable = await IsNicknameAvailable(newNickname);

        if (!isNicknameAvailable) {
            throw new Error('이미 사용 중인 닉네임입니다.');
        }

        const response = await axios.patch(`${SERVER_URL}/update`, { nickname: newNickname }, {
            headers: { 'Authorization': `Bearer ${token}` },
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.error('닉네임 업데이트 실패', error);
        throw error;
    }
}

export default UpdateUserNickname;
