import { useState, useEffect } from "react";

export default function useFetchFilteredProducts(fetchFunction, initialSearchTerm, selectedCategories, filters, kkiniGreenCheck) {
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [productsResult, setProductsResult] = useState({ items: [], error: null, noProductsFound: false });

    useEffect(() => {
        const fetchData = async () => {
            try {
              const searchParam = searchTerm || initialSearchTerm;
      
              const result = await fetchFunction(searchParam, selectedCategories, filters, kkiniGreenCheck);
              setProductsResult({ ...result, loading: false });
            } catch (error) {
              setProductsResult({ items: [], error: error.message, noProductsFound: false, loading: false });
            }
          };

        if (searchTerm || initialSearchTerm) {
            fetchData();
        }
    }, [fetchFunction, searchTerm, selectedCategories, filters, kkiniGreenCheck, initialSearchTerm]);

    return [productsResult, setSearchTerm];
}
