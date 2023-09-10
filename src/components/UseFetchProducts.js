import { useEffect, useState } from 'react';
import { fetchProducts } from '../utils/ApiClient';

export const useFetchProducts = (searchTermFromParams, selectedCategories) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { error, items } = await fetchProducts(searchTermFromParams, selectedCategories);
            setError(error);
            setItems(items);
        };

        fetchData();
    }, [searchTermFromParams, selectedCategories]);

    return { items, setItems,error };
};
