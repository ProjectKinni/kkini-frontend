import { useState, useEffect } from 'react';
import { fetchBasicProductList } from '../../utils/ApiClient'

export function useFetchSearchedProducts(searchTerm, selectedCategories, filters, kkiniGreenCheck){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchBasicProductsList(searchTerm, selectedCategories, filters, kkiniGreenCheck)
            .then(responseData => {
                setData(responseData);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [searchTerm, selectedCategories, filters, kkiniGreenCheck]);

    return { data, loading, error };
}