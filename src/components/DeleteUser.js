import axios from 'axios';
import Cookies from 'js-cookie';

const SERVER_URL = 'http://localhost:8080';

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

async function handleDeleteClick(callback) {
    const confirmation = window.confirm('정말 탈퇴하시겠습니까?');

    if (confirmation) {
        try {
            await deleteUser();

            // 삭제 후 추가 작업 수행
            callback();

            Cookies.remove('access_token');

            alert('회원 탈퇴가 완료되었습니다.');
        } catch (error) {
            console.error('유저 삭제 실패', error);
        }
    }
}

export default handleDeleteClick;
