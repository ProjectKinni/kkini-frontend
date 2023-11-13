import React, { useState, useEffect } from "react";
import ArrowRight from "../assets/images/arrow_right.png";

function KkiniChecked({ onKkiniChecked }) {
  const [isChecked, setIsChecked] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(true);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setAccordionOpen(false);
      } else {
        setAccordionOpen(true);
      }
    }

    handleResize(); // 초기 설정
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

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
