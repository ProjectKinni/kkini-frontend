import { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/ApiClient';

function useSearchResults(searchTerm, selectedCategories, filters, kkiniGreenCheck) {
    const [categoryGroups, setCategoryGroups] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            setError(null);
            console.log("Fetching results for:", searchTerm);
            const { error, items } = await fetchProducts(searchTerm, selectedCategories, filters, kkiniGreenCheck);
            if (error) {
                console.error("Error fetching search results:", error);
                setError(error);
            } else {
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
        };

        if (searchTerm) {
            fetchSearchResults();
        }
    }, [searchTerm, selectedCategories, filters, kkiniGreenCheck]);

    return { categoryGroups, loading, error };
}

export default useSearchResults;
