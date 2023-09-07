import { useEffect, useState } from 'react';
import getUserInfo from './GetUserInfo';

// user, setUser 설정하는 메서드
function useFetchUserInfo() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserInfo().then(userData => setUser(userData));
    }, []);

    return [user, setUser];
}

export default useFetchUserInfo;
