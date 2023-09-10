import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import NavigationContainer from '../containers/NavigationBarContainer';
import CategoryBarContainer from '../containers/CategoryBarContainer';
import ProductList from '../components/ProductList';
import Footer from '../components/Footer';

function SearchResultPage({ searchTerm: initialSearchTerm, setSearchTerm: initialSetSearchTerm,
                              autocompleteItems: initialAutocompleteItems,
                              setAutocompleteItems: initialSetAutocompleteItems }) {
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [autocompleteItems, setAutocompleteItems] = useState(initialAutocompleteItems);
    const navigate = useNavigate();
    const [categoryGroups, setCategoryGroups] = useState({});

    useEffect(() => {

    }, []);

    return (
        <div className="search-result-page">
            <NavigationContainer
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                autocompleteItems={autocompleteItems}
                setAutocompleteItems={setAutocompleteItems}
            />
            <CategoryBarContainer />
            <ProductList categoryGroups={categoryGroups} />
            <Footer />
        </div>
    );
}

export default SearchResultPage;
