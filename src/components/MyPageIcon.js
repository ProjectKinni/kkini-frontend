import React from 'react';

function MyPageIcon({ user, navigate }) {
    return (
        <span className="icon" onClick={() => user ? navigate('/user') : navigate('/login')}>
            👤
        </span>
    );
}

export default MyPageIcon;