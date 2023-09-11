import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavButtonsComponent() {
    const navigate = useNavigate();

    return (
        <div className="nav-buttons">
            <button onClick={() => navigate('/pick')}>끼니 PICK</button>
            <button onClick={() => navigate('/ranking')}>끼니 랭킹</button>
            <button onClick={() => navigate('/green-ranking')}>끼니 그린 랭킹</button>
            <button onClick={() => navigate('/community')}>커뮤니티</button>
        </div>
    );
}

export default NavButtonsComponent;
