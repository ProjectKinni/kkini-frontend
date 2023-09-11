import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useSearchResults from '../components/UseSearchResults';

import NavigationContainer from '../containers/NavigationBarContainer';
import CategoryBarContainer from '../containers/CategoryBarContainer';
import ProductList from '../components/ProductList';
import Footer from '../components/Footer';

function SearchResultPage({ setSearchTerm: initialSetSearchTerm }) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialSearchTerm = queryParams.get('searchTerm');

    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [autocompleteItems, setAutocompleteItems] = useState([]);
    const [kkiniGreenCheck, setKkiniGreenCheck] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filters, setFilters] = useState({
        isLowCalorie: false,
        isSugarFree: false,
        isLowSugar: false,
        isLowCarb: false,
        isKeto: false,
        isTransFat: false,
        isHighProtein: false,
        isLowSodium: false,
        isCholesterol: false,
        isSaturatedFat: false,
        isLowFat: false,
    });

    useEffect(() => {
        setSearchTerm(initialSearchTerm);
    }, [location]);

    const { categoryGroups, loading, error } =
        useSearchResults(searchTerm, selectedCategories, filters, kkiniGreenCheck);


    const handleFilterChange = (updatedFilters) => {
        setFilters(updatedFilters);
    };

    const handleKkiniGreenCheckChange = (value) => {
        setKkiniGreenCheck(value);
    };

    return (
        <div className="search-result-page">
            <NavigationContainer
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                autocompleteItems={autocompleteItems}
                setAutocompleteItems={setAutocompleteItems}
            />
            <CategoryBarContainer
                onKkiniChecked={handleKkiniGreenCheckChange}
                onCategoryChange={setSelectedCategories}
                onFilterChange={handleFilterChange}
                searchTerm={searchTerm}
                filters={filters}
                kkiniGreenCheck={kkiniGreenCheck}
            />
            <div className="product-list-wrapper">
                <ProductList categoryGroups={categoryGroups} />
            </div>
            <Footer />
        </div>
    );
}

export default SearchResultPage;