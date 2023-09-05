import axios from 'axios';

const SERVER_URL = 'http://localhost:8080';

async function checkNicknameAvailability(nickname) {
    try {
        const response = await axios.post(
            `${SERVER_URL}/checkNickname`,
            { nickname }, // 객체로 닉네임을 전달해야 함
            {
                headers: {
                    'Content-Type': 'application/json',
                },
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
