import React from "react";
import { useNavigate } from "react-router-dom";
import MainSliderSection from "../components/mainPage/MainSliderSection";
import { useUser } from "./UserContext";

function RankingSection() {
    const navigate = useNavigate();
    const { user } = useUser();

    const isLoggedIn = user !== null;

    return (
        <div className="ranking-section">
            <MainSliderSection type="pick" className="ranking-kkini-ranking" isLoggedIn={isLoggedIn}/>
            <MainSliderSection type="ranking" className="ranking-kkini" isLoggedIn={isLoggedIn}/>
            <MainSliderSection type="green" className="ranking-kkini-green" isLoggedIn={isLoggedIn}/>
        </div>
    );
}

export default RankingSection;
