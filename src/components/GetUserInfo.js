import axios from 'axios';
import Cookies from 'js-cookie';

const SERVER_URL = 'http://223.130.138.156:8080';

async function getUserInfo() {
    const token = Cookies.get('access_token');

    if (token) {
        try {
            const response = await axios.post(`${SERVER_URL}/getUserInfo`, null, {
                headers: { 'Authorization': `Bearer ${token}` },
                withCredentials: true,
            });

            return response.data;
        } catch (error) {
            console.error('유저 정보 가져오기 실패', error);
            throw error;
        }
    }
}

export default getUserInfo;