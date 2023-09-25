import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import icLink from "../../assets/images/ic_link.svg";
import icLinkGreen from "../../assets/images/ic_link_green.svg";
import ProductSlickSlider from "../mainPage/ProductSlickSlider";
import { fetchPickProducts, fetchTopRankingProducts, fetchTopGreenProducts } from "../../utils/ApiClient";
import { useUser } from "../UserContext";

function MainSliderSection({
                               type,
                               className,
                               isLoggedIn,
                               searchTerm,
                               selectedCategories,
                               filters
                           }) {
    const navigate = useNavigate();
    const { user } = useUser();

    let title, subtitle, buttonLink, buttonImage, buttonText;

    const fetchFunction = useMemo(() => {
        switch (type) {
            case "pick":
                return () => fetchPickProducts(user.userId, selectedCategories, filters)
                    .then(data => {
                        if (data.length === 0) {
                            throw new Error("추천 드릴 상품이 없습니다");
                        }
                        return data;
                    });
            case "ranking":
                return fetchTopRankingProducts;
            case "green":
                return fetchTopGreenProducts;
            default:
                return () => {};
        }
    }, [type, user, selectedCategories, filters]);

    switch (type) {
        case "pick":
            title = "끼니 PICK";
            subtitle = isLoggedIn ? `${user.nickname}님의 취향저격 상품` : "끼니의 친구가 되어, 나를 위한 상품들을 만나보세요!";
            buttonLink = isLoggedIn ? "/pick" : "/login";
            buttonText = "로그인";
            buttonImage = icLink;
            break;
        case "ranking":
            title = "끼니 랭킹";
            subtitle = "현재 인기만점 제품";
            buttonLink = "/ranking";
            buttonImage = icLink;
            break;
        case "green":
            title = "끼니 그린 랭킹";
            subtitle = "간편하고, 건강하게!";
            buttonLink = "/green-ranking";
            buttonImage = icLinkGreen;
            break;
        default:
            break;
    }

    return (
        <section className={`${className}`}>
            <div className="tit">
                <h2>{title}</h2>
                {type === "pick" && !isLoggedIn ? (
                    <button className="btn-login" onClick={() => navigate(buttonLink)}>
                        {buttonText}
                    </button>
                ) : (
                    <button onClick={() => navigate(buttonLink)}>
                        <img src={buttonImage} alt={`${title} 바로가기`} />
                    </button>
                )}
            </div>
            <p>{subtitle}</p>
            {!isLoggedIn && type === "pick" ? null : (
                <ProductSlickSlider fetchFunction={fetchFunction} />
            )}
        </section>
    );
}

export default MainSliderSection;