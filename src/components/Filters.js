import React from 'react';

const SERVER_URL = "http://localhost:8080";

function Filters() {
    const categories = ["간식", "육가공", "음료", "즉석섭취식품"];
    const filters = ["저칼로리", "슈가프리", "로우슈가", "저탄수화물", "키토", "트랜스지방",
        "고단백", "저나트륨", "포화지방", "저지방"];

    return (
        <div className="filters">
            <h3>끼니 선택</h3>
            <div className="kkini-selection">
                <label>
                    <input type="checkbox" name="kkini" value="kkiniGreen" />
                    끼니 그린
                </label>
            </div>

            <h3>카테고리</h3>
            {categories.map(category => (
                <div key={category} className="category-selection">
                    <label>
                        <input
                            type="checkbox"
                            value={category}
                        />
                        {category}
                    </label>
                </div>
            ))}

            <h3>필터</h3>
            {filters.map(filter => (
                <div key={filter} className="filter-selection">
                    <label>
                        <input
                            type="checkbox"
                            value={filter}
                        />
                        {filter}
                    </label>
                </div>
            ))}
        </div>
    );
}

export default Filters;
