import React from 'react';
import logo from '../assets/images/kkini_logo.png';
import { useNavigate } from 'react-router-dom';

function LogoComponent() {
    const navigate = useNavigate();

    return (
        <img src={logo} className="logo" alt="kkini logo" onClick={() => navigate('/')}/>
    );
}

export default LogoComponent;
