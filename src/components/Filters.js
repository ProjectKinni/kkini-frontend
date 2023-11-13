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
    isHighCalorie: false,
    isSugarFree: false,
    isLowSugar: false,
    isLowCarb: false,
    isHighCarb: false,
    isKeto: false,
    isLowTransFat: false,
    isHighProtein: false,
    isLowSodium: false,
    isLowCholesterol: false,
    isLowSaturatedFat: false,
    isLowFat: false,
    isHighFat: false
  });

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

  function filterLabel(filterName) {
    const labels = {
      isLowCalorie: "저칼로리",
      isHighCalorie: "고칼로리",
      isSugarFree: "무설탕",
      isLowSugar: "저당",
      isLowCarb: "저탄수화물",
      isHighCarb: "고탄수화물",
      isKeto: "키토",
      isLowTransFat: "저트랜스지방",
      isHighProtein: "고단백",
      isLowSodium: "저염",
      isLowCholesterol: "저콜레스테롤",
      isLowSaturatedFat: "저포화지방",
      isLowFat: "저지방",
      isHighFat: "고지방"
    };
    return labels[filterName] || filterName;
  }

  return (
    <div className={`category-wrap accordion ${accordionOpen ? "on" : "off"}`}>
      <div className="accordion-tit">
        <h3>필터</h3>
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
          <label for={filterName}>{filterLabel(filterName)}</label>
        </div>
      ))}
    </div>
  );
}

export default Filters;
