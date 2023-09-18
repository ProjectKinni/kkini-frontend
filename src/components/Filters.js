import React, { useState } from "react";

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
    <div className="category-wrap">
      <h3>필터링</h3>
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
