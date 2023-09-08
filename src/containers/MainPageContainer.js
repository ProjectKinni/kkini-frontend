import React from 'react';
import RankingSection from "../components/RankingSection";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import BannerAd from "../components/BannerAd";

function MainPageContainer({ searchTerm, setSearchTerm, autocompleteItems, setAutocompleteItems }) {
    return (
        <>
            <SearchBar
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

export default MainPageContainer;
