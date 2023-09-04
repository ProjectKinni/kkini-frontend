import React from 'react';

import googleLogo from "../assets/images/logingoogle.png";
import naverLogo from "../assets/images/loginnaver.png";
import kakaoLogo from "../assets/images/loginkakao.png";

function LoginPage() {
    return (
        <>
            <a href="http://localhost:8080/oauth2/authorization/google">
                <img src={googleLogo} alt="Google Login" />
            </a><br/><br/>
            <a href="http://localhost:8080/oauth2/authorization/naver">
                <img src={naverLogo} alt="Naver Login" />
            </a><br/><br/>
            <a href="http://localhost:8080/oauth2/authorization/kakao">
                <img src={kakaoLogo} alt="Kakao Login" />
            </a>
        </>
    );
}

export default LoginPage;
