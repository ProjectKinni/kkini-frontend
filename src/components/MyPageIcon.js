import React from 'react';

function MyPageIcon({ navigate }) {

    const handleNavigate = () => {
        navigate('/user');
    };

    return (
        <span className="icon" onClick={handleNavigate}>
            👤
        </span>
    );
}

export default MyPageIcon;
