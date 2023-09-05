import axios from 'axios';
import Cookies from 'js-cookie';
import checkNicknameAvailability from "./CheckNickname";

const SERVER_URL = 'http://localhost:8080';

async function UpdateUserNickname(newNickname) {
    const token = Cookies.get('access_token');

    try {
        // 서버에 닉네임 중복 여부를 확인하는 요청을 보냅니다.
        const isNicknameAvailable = await checkNicknameAvailability(newNickname);

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
