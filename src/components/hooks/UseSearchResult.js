import { useState, useEffect } from 'react';

function UseSearchResult(productsResult) {
    const [items, setItems] = useState([]);
    const [categoryGroups, setCategoryGroups] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [noProductsFound, setNoProductsFound] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(null);
        setNoProductsFound(false);

        const { error, items: resultItems = [], noProductsFound } = productsResult;

        setItems(resultItems);

        if (error) {
            console.error("Error fetching search results:", error);
            setError(error);
        } else if (noProductsFound) {
            setNoProductsFound(true);
        } else {
            setItems(items);

            const groupedItems = resultItems.reduce((groups, item) => {
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

    return { items, categoryGroups, loading, error, noProductsFound };
}

export default UseSearchResult;
