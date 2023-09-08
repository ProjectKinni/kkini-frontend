import React, { useState } from 'react';
import '../styles/MainPage.css';
import MainPageContainer from '../containers/MainPageContainer';

function MainPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [autocompleteItems, setAutocompleteItems] = useState([]);

    return (
        <div className="main-page">
            <MainPageContainer
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                autocompleteItems={autocompleteItems}
                setAutocompleteItems={setAutocompleteItems}
            />
        </div>
    );
}

export default MainPage;
