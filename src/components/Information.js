import React from "react";
import "../styles/InformationPage.css";
import Pick from "../assets/images/illust_pick.png";
import Rank from "../assets/images/illust_ranking.png";
import Green from "../assets/images/illust_green.png";
import LogoComponent from "../components/Logo";
import icLink from "../assets/images/ic_link.png";
import icLinkGreen from "../assets/images/ic_link_green.png";

const Information = () => {
  const introduce =
    '"끼니 때우다"의 끼니로, 간편식 관련 정보를 간편하게 전달하는 웹/앱 서비스입니다.\n아무거나 먹지 않는 요즘 소비자들에게는 한 끼 때우는 일조차 간단하지 않습니다.\n간편식 소비자들의 의사결정과정에 간편함과 재미를 더하고자 합니다.';

  const pick =
    '“끼니 pick"은 개인의 식습관과 취향을 고려하여 딱 맞는 간편식을 찾아 드립니다.\n여러분의 선호도와 영양 요구에 따라, 다양한 간편식 중에서도\n정확히 원하는 것을 추천하여 시간과 노력을 절약해 드리겠습니다.\n' +
    "개성에 딱 맞는 식단으로 건강한 끼니를 챙기세요!";

  const rank =
    '"끼니 랭킹"은 수많은 사용자들의 선택을 바탕으로 선정된 인기 간편식을 소개합니다.\n다양한 기준으로 분석된 실시간 랭킹은\n트렌드를 쫓는 사람들에게 최고의 가이드가 될 것입니다.\n더 나은 식단을 위한 추천을 찾고 계시다면, "끼니 랭킹"을 확인하세요!';

  const greenRank =
    '"끼니 그린 랭킹"은 건강한 식단을 추구하는 이들을 위한 완벽한 선택지입니다.\n영양 성분을 고려하여 선별된 간편식들을 확인하고, 건강과 맛을 모두 만족시키세요.\n끼니 그린 랭킹으로 올바른 영양소를 놓치지 않고 더 나은 선택을 해보세요!\n';

  return (
    <div className="information content-max">
      <div className="information-introduce">
        <LogoComponent />
        <div className="txt">{introduce}</div>
      </div>
      <div className="information-kkini">
        <div className="info-section">
          <img className="info-illust" src={Pick} alt="끼니 Pick 이미지" />
          <div className="info-txt ranking-section">
            <div className="tit">
              <h2>끼니 PICK</h2>
              <button>
                <img src={icLink} alt="끼니 PICK 바로가기" />
              </button>
            </div>
            <div className="txt">{pick}</div>
          </div>
        </div>
        <div className="info-section">
          <img className="info-illust" src={Rank} alt="끼니 랭킹 이미지" />
          <div className="info-txt ranking-section">
            <div className="tit">
              <h2>끼니 랭킹</h2>
              <button>
                <img src={icLink} alt="끼니 랭킹 바로가기" />
              </button>
            </div>
            <div className="txt">{rank}</div>
          </div>
        </div>
        <div className="info-section green">
          <img
            className="info-illust"
            src={Green}
            alt="끼니 그린 랭킹 이미지"
          />
          <div className="info-txt ranking-section ranking-kkini-green">
            <div className="tit">
              <h2>끼니 그린 랭킹</h2>
              <button>
                <img src={icLinkGreen} alt="끼니 그린 랭킹 바로가기" />
              </button>
            </div>
            <div className="txt">{greenRank}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
