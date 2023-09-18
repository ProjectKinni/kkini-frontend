import React from "react";
import { useNavigate } from "react-router-dom";
import MainSliderSection from "../components/mainPage/MainSliderSection"

function RankingSection() {
  const navigate = useNavigate();

  //로그인 여부를 확인하는 로직 추가를 여기에 해야 하나요. 어떻게 하는지는 나도 몰라요.
    //MainSliderSection에 isLoggedIn props 있어요.
    // 일단 false로 지정해놓을게요.
  const isLoggedIn = false;

  return (

      <div className="ranking-section">

          <MainSliderSection type="pick" className="ranking-kkini-ranking" isLoggedIn={isLoggedIn}/>
          <MainSliderSection type="ranking" className="ranking-kkini" isLoggedIn={isLoggedIn}/>
          <MainSliderSection type="green" className="ranking-kkini-green" isLoggedIn={isLoggedIn}/>

      </div>

  );
}

export default RankingSection;
