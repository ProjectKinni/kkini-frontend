import React from "react";
import "../styles/MainPage.css";
import bannerImage from "../assets/images/banner_image.png";

function BannerAd({ imageUrl, altText, linkUrl }) {
  return (
    <div className="banner-ad">
      <a
        href="https://223.130.139.40:3000/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={bannerImage} alt="끼니 프로모션" />
      </a>
    </div>
  );
}

export default BannerAd;
