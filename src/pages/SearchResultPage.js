import React, { useState } from 'react';
import '../styles/SearchResultPage.css';
import SearchResultContainer from '../containers/SearchResultContainer';

function SearchResultPage({ searchResults }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [autocompleteItems, setAutocompleteItems] = useState([]);

    return (
        <div className="search-result-page">
            <SearchResultContainer
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                autocompleteItems={autocompleteItems}
                setAutocompleteItems={setAutocompleteItems}
                searchResults={searchResults}
            />
        </div>
    );
}

export default SearchResultPage;
