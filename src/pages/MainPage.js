import React, { useState } from 'react';
import '../styles/MainPage.css';
import MainPageContainer from '../containers/MainPageContainer';
import NavigationContainer from "../containers/NavigationBarContainer";

function MainPage({ searchTerm, setSearchTerm, autocompleteItems, setAutocompleteItems }) {
    return (
        <>
            <NavigationContainer
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                autocompleteItems={autocompleteItems}
                setAutocompleteItems={setAutocompleteItems}
            />
            <BannerAd/>
            <RankingSection/>
            <Footer/>
        </>
    );
}


export default MainPage;
