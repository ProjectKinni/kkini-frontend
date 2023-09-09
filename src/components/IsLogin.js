import React from 'react';

function IsLogin({ user, navigate, handleLogout }) {
    return (
        <>
            {user ? (
                <a href="" onClick={(e) => handleLogout(e)}>로그아웃</a>
            ) : (
                <a href="" onClick={() => navigate('/login')}>로그인</a>
            )}
        </>
    );
}

export default IsLogin;