import React, { useState, useEffect } from "react";
import ArrowRight from "../assets/images/arrow_right.png";

function KkiniChecked({ onKkiniChecked }) {
  const [isChecked, setIsChecked] = useState(false);

  // 0919 최진주 작성 Accordion 추가
  const [accordionOpen, setAccordionOpen] = useState(true);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setAccordionOpen(false);
      } else {
        setAccordionOpen(true);
      }
    }

    // 컴포넌트가 마운트될 때 한 번 실행하고, 창 크기가 변경될 때마다 실행합니다.
    handleResize(); // 초기 설정
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };
  // 0919 최진주 작성 Accordion 여기까지

  const handleKkiniChecked = (checkedValue) => {
    setIsChecked(checkedValue);
    onKkiniChecked(checkedValue);
  };

  return (
    <div className={`category-wrap accordion ${accordionOpen ? "on" : "off"}`}>
      <div className="accordion-tit">
        <h3>끼니 그린 체크</h3>
        <button onClick={toggleAccordion}>
          <img src={ArrowRight} alt={accordionOpen ? "닫기" : "열기"} />
        </button>
      </div>
      <div className="categories icon green">
        <input
          id="green"
          type="checkbox"
          checked={isChecked}
          onChange={(e) => handleKkiniChecked(e.target.checked)}
        />
        <label for="green">끼니 그린</label>
      </div>
    </div>
  );
}

export default KkiniChecked;
