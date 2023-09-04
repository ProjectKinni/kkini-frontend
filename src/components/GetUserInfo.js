import axios from 'axios';
import Cookies from 'js-cookie';

const SERVER_URL = 'http://localhost:8080';

// 아래 주석처럼 하면 user에 로그인한 회원의 정보 저장 가능
// const [user, setUser] = useState(null);

// useEffect(() => {
//     getUserInfo().then(userData => setUser(userData));
// }, []);
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
