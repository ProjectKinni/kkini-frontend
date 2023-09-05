import React from 'react';
import '../styles/MainPage.css';

function BannerAd({ imageUrl, altText, linkUrl }) {
    return (
        <div className="banner-ad">
            <a href="http://localhost:3000/" target="_blank" rel="noopener noreferrer">
                <img src="src/assets/images/kkini_logo.png" alt="끼니 프로모션" />
            </a>
        </div>
    );
}

export default BannerAd;
