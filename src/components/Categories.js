import React, { useState, useEffect } from "react";
import ArrowRight from "../assets/images/arrow_right.png";

function Categories({ onCategoryChange, searchTerm }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  
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

  useEffect(() => {
    onCategoryChange(selectedCategories);
  }, [selectedCategories, onCategoryChange]);

  useEffect(() => {
    if (searchTerm) {
      const matchingCategory = ["간식", "육가공", "음료", "즉석섭취식품"].find(
        (category) => category === searchTerm
      );
      if (matchingCategory) {
        setSelectedCategories([matchingCategory]);
      }
    }
  }, [searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((item) => item !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  return (
    <div className={`category-wrap accordion ${accordionOpen ? "on" : "off"}`}>
      <div className="accordion-tit">
        <h3>카테고리</h3>
        <button onClick={toggleAccordion}>
          <img src={ArrowRight} alt={accordionOpen ? "닫기" : "열기"} />
        </button>
      </div>
      {["간식", "육가공", "음료", "즉석섭취식품"].map((category) => (
        <div className="categories icon" key={category}>
          <input
            id={category}
            type="checkbox"
            value={category}
            checked={selectedCategories.includes(category)}
            onChange={() => handleCategoryChange(category)}
          />
          <label for={category}>{category}</label>
        </div>
      ))}
    </div>
  );
}

export default Categories;
