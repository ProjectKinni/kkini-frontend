import React from "react";
import ArrowRight from "../assets/images/arrow_right.png";

const Help = () => {
  const helpTitle1 = "회원 탈퇴는 어떻게 할까요?";
  const helpContent1 =
    "검색창 우측 (인간 모양 아이콘) 누르고 스크롤 최하단으로 내려가면 회원탈퇴 버튼이 있습니다!";

  const helpTitle2 = "랭킹의 기준은 어떻게 되는걸까요?";
  const helpContent2 = "추후 업로드 예정";

  return (
    <div className="content-max">
      <div className="help-card">
        {/* 닫힌 default 상태, class 'off' */}
        <div className="accordion off">
          <div className="help-qust-wrap">
            <h3 className="help-question">{helpTitle2}</h3>
            {/* 버튼 클릭시 열린 상태로 변경, class 'on'으로 변경 */}
            <button>
              <img src={ArrowRight} alt="열기" />
            </button>
          </div>
          <div className="help-content">{helpContent2}</div>
        </div>
        {/* 열린 상태, class 'on' */}
        <div className="accordion on">
          <div className="help-qust-wrap">
            <h3 className="help-question">{helpTitle1}</h3>
            {/* 버튼 클릭시 닫힌 상태로 변경, class 'off'으로 변경 */}
            <button>
              <img src={ArrowRight} alt="닫기" />
            </button>
          </div>
          <div className="help-content">{helpContent1}</div>
        </div>
      </div>
    </div>
  );
};

export default Help;
