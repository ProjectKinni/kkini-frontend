import { useState, useEffect } from 'react';

function UseSearchResult(searchTerm, selectedCategories, filters, kkiniGreenCheck, searchTermFromParams, productsResult) {
    const [items, setItems] = useState([]);
    const [categoryGroups, setCategoryGroups] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [noProductsFound, setNoProductsFound] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(null);
        setNoProductsFound(false);

        const { error, items, noProductsFound } = productsResult;

        if (error) {
            console.error("Error fetching search results:", error);
            setError(error);
        } else if (noProductsFound) {
            setNoProductsFound(true);
        } else {
            setItems(items);

            const groupedItems = items.reduce((groups, item) => {
                const category = item.categoryName;
                if (!groups[category]) {
                    groups[category] = [];
                }
                groups[category].push(item);
                return groups;
            }, {});
            setCategoryGroups(groupedItems);
        }

        setLoading(false);
    }, [productsResult]);

    return { items, setItems, categoryGroups, loading, error, noProductsFound };
}

export default UseSearchResult;
