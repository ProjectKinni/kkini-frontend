import React from "react";
import { useNavigate } from "react-router-dom";
import icLink from "../../assets/images/ic_link.png";
import icLinkGreen from "../../assets/images/ic_link_green.png";
import ProductSlickSlider from "../mainPage/ProductSlickSlider"

import { fetchPickProducts, fetchRankingProducts, fetchGreenProducts } from "../../utils/ApiClient"

function MainSliderSection({
                              type, // pick, ranking, green 중 하나 선택
                              children, //slick component 띄울 부분 - ProductSlickSlider
                              className, //css 적용을 위한 div의 클래스명
                               fetchFunction, //해당 api call 지정
                                isLoggedIn  //로그인 여부 판단하는 로직
}){
    const navigate = useNavigate();

    let title, subtitle, buttonLink, buttonImage, buttonText;

    switch(type){
        case 'pick':
            title = "끼니 PICK";
            subtitle = isLoggedIn ? "끼니의 취향저격 상품" : "끼니의 친구가 되어, 나를 위한 상품들을 만나보세요!";
            buttonLink = "/login";
            buttonText = "로그인";
            buttonImage = icLink;
            fetchFunction = fetchPickProducts;
            break;
        case 'ranking':
            title = "끼니 랭킹";
            subtitle = "현재 인기만점 제품"
            buttonLink = "/ranking";
            buttonImage = icLink;
            fetchFunction = fetchRankingProducts;
            break;
        case 'green':
            title = "끼니 그린 랭킹";
            subtitle = "간편하고, 건강하게!";
            buttonLink = "/green-ranking";
            buttonImage = icLinkGreen;
            fetchFunction = fetchGreenProducts;
            break;
        default:
            break;
    }
    
    
    return(
        <section className={`${className}`}>
            <div className="tit">
                <h2>{title}</h2>

                {/* 로그인 안 되어있으면 로그인 버튼 보이고,
                 로그인 되어있으면 바로가기 버튼 보이기 */}
                {type === 'pick' && !isLoggedIn ? (
                    <button className="btn-login" onClick={() => navigate(buttonLink)}>
                        {buttonText}
                    </button>
                ) : (
                    <button onClick={() => navigate(buttonLink)}>
                        <img src={buttonImage} alt={`${title} 바로가기`} />
                    </button>
                )}
                {/*{buttonText ? (*/}
                {/*    <button className="btn-login" onClick={() => navigate(buttonLink)}>*/}
                {/*        {buttonText}*/}
                {/*    </button>*/}
                {/*) : (*/}
                {/*    <button onClick={() => navigate(buttonLink)}>*/}
                {/*        <img src={buttonImage} alt={`${title} 바로가기`} />*/}
                {/*    </button>*/}
                {/*)}*/}

            </div>
            <p>{subtitle}</p>

            {/*로그인이 안 되어있고 'pick' 인 경우 slider를 보여주지 않는다. */}
            {!isLoggedIn && type === 'pick' ?
                null : (
                    <ProductSlickSlider fetchFunction={fetchFunction} />
                )}

        </section>
    );
}

export default MainSliderSection;