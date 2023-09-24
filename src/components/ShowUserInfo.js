import React from 'react';
import UpdateCheckUserNickname from './UpdateCheckUserNickname';
import { useUser } from './UserContext';
import profile from "../assets/images/profile.png";
import IcPlus from "../assets/images/ic_plus.png";
import IcEdit from "../assets/images/ic_edit.png";

function ShowUserInfo({ isEditingNickname, setIsEditingNickname, handleUpdateSuccess, handleDeleteClick }) {
    const { user, setUser } = useUser();

    if (!user) {
        return <div className="no-login">로그인 해주세요</div>;
    }

    return (
        <div className="my-profile-wrap content-max">
            {isEditingNickname ? (
                <div className='my-profile edit-my-profile'>
                    <h4>닉네임 변경하기</h4>
                    <UpdateCheckUserNickname
                        user={user}
                        setUser={setUser}
                        setIsEditingNickname={setIsEditingNickname}
                        handleUpdateSuccess={handleUpdateSuccess}
                    />
                    <button className='btn-edit-cancel' onClick={() => setIsEditingNickname(false)}>취소</button><br />
                </div>
            ) : (
                <div className='my-profile'>
                    <div className="user-profile">
                        <button type="submit" className="btn-edit-img">
                            <img src={IcPlus} alt="프로필 이미지 변경하기" />
                        </button>
                        <div className="user-img">
                            <img src={profile} alt="프로필 이미지" />
                        </div>
                    </div>
                    <h3>{user.nickname}</h3>
                    <button onClick={() => setIsEditingNickname(true)} className="btn-edit-name">
                        <img src={IcEdit} alt="이름 변경하기" />
                    </button>
                    <button onClick={handleDeleteClick} className='btn-delete-account'>회원 탈퇴</button><br />
                </div>
            )}
        </div>
    );
}

export default ShowUserInfo;
