import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';

function Categories({ onCategoryChange, selected, location, searchParams }) {
    const navigate = useNavigate();

    useEffect(() => {
        const categoryNamesFromParams = searchParams.getAll('categoryName');
        if (categoryNamesFromParams.length > 0) {
            onCategoryChange(categoryNamesFromParams);
        }
    }, [location.search]);

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        let updatedCategories;
        if (e.target.checked) {
            updatedCategories = [...selected, category];
        } else {
            updatedCategories = selected.filter(cat => cat !== category);
        }

        onCategoryChange(updatedCategories);

        // Update URL params
        searchParams.delete('categoryName'); // 기존의 카테고리 삭제
        updatedCategories.forEach(cat => {
            searchParams.append('categoryName', cat); // 새로 업데이트된 카테고리 추가
        });
        navigate({
            pathname: location.pathname,
            search: searchParams.toString()
        });
    }

    const categories = ["간식", "육가공", "음료", "즉석섭취식품"];

    return (
        <div className="category-selection">
            <h3>카테고리</h3>
            {categories.map(category => (
                <div key={category} className="category-selection-item">
                    <label>
                        <input
                            type="checkbox"
                            value={category}
                            onChange={handleCategoryChange}
                            checked={selected.includes(category)}
                        />
                        {category}
                    </label>
                </div>
            ))}
        </div>
    );
}

export default Categories;