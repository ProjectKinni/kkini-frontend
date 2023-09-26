import React, { useState } from "react";
import ArrowRight from "../assets/images/arrow_right.png";

const Help = () => {
  const helpTitles = [
    "회원 탈퇴는 어떻게 할까요?",
    "PICK의 기준이 뭔가요?",
    "랭킹의 기준이 뭔가요?",
    "Green의 기준이 뭔가요?",
  ];

  const helpContents = [
    "마이페이지 (사람모양 아이콘) 진입하면 '회원탈퇴' 회색버튼이 있습니다.!",
    "사용자가 찜한 상품의 카테고리, 필터를 포항한 상품들을 추천해주고 있습니다.",
    "전체 사용자들이 많이 찜하고 조회한 상품을 기준으로 랭킹을 정하고 있습니다.",
    "저희 kkini 에서 정한 상품의 영양성분에 대한 기준을 통과하면 Green으로 분류하고 있습니다.",
  ];

  const [accordionOpen, setAccordionOpen] = useState(new Array(2).fill(false));

  const toggleAccordion = (index) => {
    const newAccordionOpen = [...accordionOpen];
    newAccordionOpen[index] = !newAccordionOpen[index];
    setAccordionOpen(newAccordionOpen);
  };

  return (
    <div className="content-max">
      <div className="help-card">
        {helpTitles.map((title, index) => (
          <div
            key={index}
            className={`accordion ${accordionOpen[index] ? "on" : "off"}`}
          >
            <div className="accordion-tit">
              <h3 className="help-question">{title}</h3>
              <button onClick={() => toggleAccordion(index)}>
                <img
                  src={ArrowRight}
                  alt={accordionOpen[index] ? "닫기" : "열기"}
                />
              </button>
            </div>
            <div className="help-content">{helpContents[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Help;
