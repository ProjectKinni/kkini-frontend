import { useState, useEffect } from "react";

export default function useFetchFilteredProducts(fetchFunction, initialSearchTerm, selectedCategories, filters, kkiniGreenCheck) {
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [productsResult, setProductsResult] = useState({ items: [], error: null, noProductsFound: false });

    useEffect(() => {
        const fetchData = async () => {
            const searchParam = searchTerm || initialSearchTerm;
            console.log("Fetching results for:", searchParam);

            const result = await fetchFunction(searchParam, selectedCategories, filters, kkiniGreenCheck);
            setProductsResult(result);
        };

        if (searchTerm || initialSearchTerm) {
            fetchData();
        }
    }, [fetchFunction, searchTerm, selectedCategories, filters, kkiniGreenCheck, initialSearchTerm]);

    return [productsResult, setSearchTerm];
}
