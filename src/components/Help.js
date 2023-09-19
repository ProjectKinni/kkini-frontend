import React, { useState } from "react";
import ArrowRight from "../assets/images/arrow_right.png";

const Help = () => {
  const helpTitles = [
    "회원 탈퇴는 어떻게 할까요?",
    "랭킹의 기준은 어떻게 되는걸까요?",
  ];

  const helpContents = [
    "검색창 우측 (인간 모양 아이콘) 누르고 스크롤 최하단으로 내려가면 회원탈퇴 버튼이 있습니다!",
    "추후 업로드 예정",
  ];

  // 0919 최진주 작성 Accordion 추가
  const [accordionOpen, setAccordionOpen] = useState(new Array(2).fill(false));

  const toggleAccordion = (index) => {
    const newAccordionOpen = [...accordionOpen];
    newAccordionOpen[index] = !newAccordionOpen[index];
    setAccordionOpen(newAccordionOpen);
  };
  // 0919 최진주 작성 Accordion 여기까지

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
