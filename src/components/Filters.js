import React, { useState, useEffect } from "react";
import ArrowRight from "../assets/images/arrow_right.png";

function Filters({
  onFilterChange,
  searchTerm,
  selectedCategories,
  categoryGroups,
  loading,
  error,
}) {
  const [filters, setFilters] = useState({
    isLowCalorie: false,
    isSugarFree: false,
    isLowSugar: false,
    isLowCarb: false,
    isKeto: false,
    isTransFat: false,
    isHighProtein: false,
    isLowSodium: false,
    isCholesterol: false,
    isSaturatedFat: false,
    isLowFat: false,
  });

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

  const handleFilterChange = (filterName, value) => {
    console.log(
      `Filter Changed in Filters Component: ${filterName} - ${
        value ? "Checked" : "Unchecked"
      }`
    );
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [filterName]: value };
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  return (
    <div className={`category-wrap accordion ${accordionOpen ? "on" : "off"}`}>
      <div className="accordion-tit">
        <h3>필터링</h3>
        <button onClick={toggleAccordion}>
          <img src={ArrowRight} alt={accordionOpen ? "닫기" : "열기"} />
        </button>
      </div>
      {Object.entries(filters).map(([filterName, isChecked]) => (
        <div className="categories" key={filterName}>
          <input
            id={filterName}
            type="checkbox"
            checked={isChecked}
            onChange={(e) => handleFilterChange(filterName, e.target.checked)}
          />
          <label for={filterName}>{filterName}</label>
        </div>
      ))}
    </div>
  );
}

export default Filters;
