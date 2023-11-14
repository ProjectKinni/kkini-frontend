import axios from 'axios';
import Cookies from 'js-cookie';

const SERVER_URL = "http://223.130.139.40:8080";

async function logout() {
    try {
        await axios.post(`${SERVER_URL}/logout`, null, {
            headers: { 'Authorization': `Bearer ${Cookies.get('access_token')}` },
        });
        Cookies.remove('access_token');
    } catch (error) {
        console.error('로그아웃 실패', error);
        throw error;
    }
}

export default logout;