import React from "react";
import MainSliderSection from "../components/mainPage/MainSliderSection";
import { useUser } from "./UserContext";

function RankingSection() {
    const { user } = useUser();

    const isLoggedIn = user !== null;

    return (
        <div className="ranking-section">
            <MainSliderSection
                type="pick"
                className="ranking-kkini-ranking content-max"
                isLoggedIn={isLoggedIn}
            />
            <div className="bg-grey">
                <MainSliderSection
                    type="ranking"
                    className="ranking-kkini content-max"
                    isLoggedIn={isLoggedIn}
                />
            </div>
            <MainSliderSection
                type="green"
                className="ranking-kkini-green content-max"
                isLoggedIn={isLoggedIn}
            />
        </div>
    );
}

export default RankingSection;
