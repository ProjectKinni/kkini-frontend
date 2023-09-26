import axios from 'axios';
import Cookies from 'js-cookie';

const SERVER_URL = 'http://223.130.138.156:8080';

async function deleteUser() {
    const token = Cookies.get('access_token');

    try {
        const response = await axios.delete(`${SERVER_URL}/delete`, {
            headers: { 'Authorization': `Bearer ${token}` },
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.error('유저 삭제 실패', error);
        throw error;
    }
}

export default deleteUser;
