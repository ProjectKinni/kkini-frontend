import React from 'react';

function Filters() {

    const filters = ["저칼로리", "슈가프리", "로우슈가", "저탄수화물", "키토", "트랜스지방",
        "고단백", "저나트륨", "포화지방", "저지방"];

    return (
        <div className="filters">
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
