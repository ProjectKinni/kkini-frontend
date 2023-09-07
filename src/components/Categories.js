import React, { useState } from 'react';

function Categories() {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryChange = (selectedOptions) => {
        setSelectedCategories(selectedOptions);
    };

    return (
        <div>
            <select multiple value={selectedCategories}
                    onChange={(e) =>
                        handleCategoryChange(Array.from(e.target.selectedOptions,
                                option => option.value))}>
                <option value="간식">간식</option>
                <option value="육가공">육가공</option>
                <option value="음료">음료</option>
                <option value="즉석섭취식품">즉석섭취식품</option>
            </select>
        </div>
    );
}

export default Categories;
