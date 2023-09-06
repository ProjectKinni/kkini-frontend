import axios from 'axios';
import Cookies from "js-cookie";

const SERVER_URL = 'http://localhost:8080';

async function checkNicknameAvailability(nickname) {
    const token = Cookies.get('access_token');

    try {
        const response = await axios.post(
            `${SERVER_URL}/checkNickname`,
            { nickname }, // 객체로 닉네임을 전달해야 함
            {
                headers: { 'Authorization': `Bearer ${token}` },
                withCredentials: true,
            }
        );

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Nickname check failed:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Nickname check failed:', error);
        return false;
    }
}

export default checkNicknameAvailability;
