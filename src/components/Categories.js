import React, { useState, useEffect } from 'react';

function Categories({ onCategoryChange, searchTerm }) {
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        onCategoryChange(selectedCategories);
    }, [selectedCategories, onCategoryChange]);

    useEffect(() => {
        if (searchTerm) {
            const matchingCategory = ["간식", "육가공", "음료", "즉석섭취식품"].find(category => category === searchTerm);
            if (matchingCategory) {
                setSelectedCategories([matchingCategory]);
            }
        }
    }, [searchTerm]);

    const handleCategoryChange = (category) => {
        setSelectedCategories(prevCategories => {
            if (prevCategories.includes(category)) {
                return prevCategories.filter(item => item !== category);
            } else {
                return [...prevCategories, category];
            }
        });
    };

    return (
        <div>
            <h3>카테고리</h3>
            {["간식", "육가공", "음료", "즉석섭취식품"].map(category => (
                <label key={category}>
                    <input
                        type="checkbox"
                        value={category}
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                    />
                    {category}
                </label>
            ))}
        </div>
    );
}

export default Categories;
