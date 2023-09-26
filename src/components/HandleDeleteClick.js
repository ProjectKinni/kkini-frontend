import Cookies from "js-cookie";
import deleteUser from "./DeleteUser";

async function handleDeleteClick(setUser) {
    const confirmation = window.confirm('정말 탈퇴하시겠습니까?');

    if (confirmation) {
        try {
            await deleteUser();

            setUser(null);

            Cookies.remove('access_token');

            alert('회원 탈퇴가 완료되었습니다.');
            window.location.href = '/';

        } catch (error) {
            console.error('유저 삭제 실패', error);
        }
    }
}

export default handleDeleteClick;