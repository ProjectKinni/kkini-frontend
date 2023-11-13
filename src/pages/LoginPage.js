import React from "react";
import "../styles/LoginPage.css";
import NavigationContainer from "../containers/NavigationBarContainer";
import Footer from "../components/Footer";
import googleLogo from "../assets/images/ic_google.png";
import naverLogo from "../assets/images/ic_naver.png";
import kakaoLogo from "../assets/images/ic_kakao.png";

function LoginPage() {
  return (
    <>
      <div className="login page-tit content-max">
        <h1>로그인</h1>
        <p>
          로그인하여 회원 맞춤 간편식 상품을 추천해주는 끼니 PICK을 이용해보세요
        </p>
      </div>
      <div className="login-wrap content-max">
        <a
          className="login-google"
          href="http://localhost:8080/oauth2/authorization/google"
        >
          <img src={googleLogo} alt="Google" />
          구글계정으로 로그인
        </a>
        <a
          className="login-naver"
          href="http://localhost:8080/oauth2/authorization/naver"
        >
          <img src={naverLogo} alt="Naver" />
          네이버계정으로 로그인
        </a>
        <a
          className="login-kakao"
          href="http://localhost:8080/oauth2/authorization/kakao"
        >
          <img src={kakaoLogo} alt="Kakao" />
          카카오계정으로 로그인
        </a>
      </div>
      <Footer className="footer" />
    </>
  );
}

export default LoginPage;
