import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useCategoryFromSearchParams = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        const categoryNamesFromParams = searchParams.getAll('categoryName');
        if (categoryNamesFromParams.length > 0) {
            setSelectedCategories(categoryNamesFromParams);
        }
    }, [location.search]);

    return { selectedCategories, setSelectedCategories };
};
