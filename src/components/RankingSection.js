import React from "react";
import { useNavigate } from "react-router-dom";
import icLink from "../assets/images/ic_link.png";
import icLinkGreen from "../assets/images/ic_link_green.png";

function RankingSection() {
  const navigate = useNavigate();

  return (
    <div className="ranking-section">
      <section className="ranking-kkini-ranking">
        <div className="tit">
          <h2>끼니 PICK</h2>
          {/* 로그인시 */}
          {/* <button onClick={() => navigate("/ranking")}>
            <img src={icLink} alt="끼니 랭킹 바로가기" />
          </button> */}
          {/* 비로그인시 */}
          <button className="btn-login" onClick={() => navigate("/pick")}>
            로그인
          </button>
        </div>
        <p>끼니의 친구가 되어, 나를 위한 상품들을 만나보세요!</p>
        <div className="ranking-images">{/* ... (랭킹 이미지 코드) */}</div>
      </section>
      <div className="ranking-section-bg">
        <section className="ranking-kkini">
          <div className="tit">
            <h2>끼니 랭킹</h2>
            <button onClick={() => navigate("/ranking")}>
              <img src={icLink} alt="끼니 랭킹 바로가기" />
            </button>
          </div>
          <p>현재 인기만점 제품</p>
          <div className="ranking-images">{/* ... (랭킹 이미지 코드) */}</div>
        </section>
      </div>
      <section className="ranking-kkini-green">
        <div className="tit">
          <h2>끼니 그린 랭킹</h2>
          <button onClick={() => navigate("/green-ranking")}>
            <img src={icLinkGreen} alt="끼니 그린 랭킹 바로가기" />
          </button>
        </div>
        <p>간편하고, 건강하게!</p>
        <div className="ranking-images">{/* ... (랭킹 이미지 코드) */}</div>
      </section>
    </div>
  );
}

export default RankingSection;
