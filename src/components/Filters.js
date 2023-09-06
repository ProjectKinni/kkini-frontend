import React from 'react';

function Filters({ onLowCalorieChange, onSugarFreeChange, onLowSugarChange, onLowCarbChange,
                     onKetoChange, onTransFatChange, onHighProteinChange, onLowSodiumChange,
                     onCholesterolChange, onSaturatedFatChange, onLowFatChange}) {

    const filters =
        [{label : "저칼로리", handler: onLowCalorieChange},
        {label : "슈가프리", handler: onSugarFreeChange},
        {label : "로우슈가", handler: onLowSugarChange},
        {label : "저탄수화물", handler: onLowCarbChange},
        {label : "키토", handler: onKetoChange},
        {label : "트랜스지방", handler: onTransFatChange},
        {label : "고단백", handler: onHighProteinChange},
        {label : "저나트륨", handler: onLowSodiumChange},
        {label : "콜레스테롤", handler: onCholesterolChange},
        {label : "포화지방", handler: onSaturatedFatChange},
        {label : "저지방", handler: onLowFatChange}];

    return (
        <div className="filters">
            <h3>필터</h3>
            {filters.map(filter => (
                <div key={filter.label} className="filter-selection">
                    <label>
                        <input
                            type="checkbox"
                            value={filter.label}
                            onChange={filter.handler}
                        />
                        {filter.label}
                    </label>
                </div>
            ))}
        </div>
    );
}

export default Filters;
