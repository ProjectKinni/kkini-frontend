import React from 'react';

function Filters({ onCategoryChange, onFilterChange, onKkiniChange }) {
    const categories = ["간식", "육가공", "음료", "즉석섭취식품"];
    const filters = ["저칼로리", "슈가프리", "로우슈가", "저탄수화물",
        "키토", "트랜스지방", "고단백", "저나트륨", "포화지방", "저지방"];
    const kkinis = ["끼니", "끼니 그린"];

    return (
        <div className="filters">
            <h3>끼니 선택</h3>
            {kkinis.map(kkini => (
                <div key={kkini} className="filter-item">
                    <label>
                        <input
                            type="checkbox"
                            value={kkini}
                            onChange={(e) => onKkiniChange(e.target.value, e.target.checked)}
                        />
                        {kkini}
                    </label>
                </div>
            ))}
            <h3>카테고리</h3>
            {categories.map(category => (
                <div key={category} className="filter-item">
                    <label>
                        <input
                            type="checkbox"
                            value={category}
                            onChange={(e) => onCategoryChange(e.target.value, e.target.checked)}
                        />
                        {category}
                    </label>
                </div>
            ))}
            <h3>필터</h3>
            {filters.map(filter => (
                <div key={filter} className="filter-item">
                    <label>
                        <input
                            type="checkbox"
                            value={filter}
                            onChange={(e) => onFilterChange(e.target.value, e.target.checked)}
                        />
                        {filter}
                    </label>
                </div>
            ))}
        </div>
    );
}

export default Filters;
