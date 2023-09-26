import React from "react";
import "../styles/MainPage.css";
import bannerImage from "../assets/images/banner_image.png";

function BannerAd({ imageUrl, altText, linkUrl }) {
  return (
    <div className="banner-ad">
      <a
        href="http://223.130.138.156:3000/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={bannerImage} alt="끼니 프로모션" />
      </a>
      <div className="banner-close">
        <button>오늘 그만보기</button>
        <button>닫기</button>
      </div>
    </div>
  );
}

export default BannerAd;
