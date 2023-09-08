import React from 'react';
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import RankingSection from "../components/RankingSection";
import Footer from "../components/Footer";
import BannerAd from "../components/BannerAd";

function MainPageContainer({ searchTerm, setSearchTerm, autocompleteItems, setAutocompleteItems }) {
    return (
        <>
            <Header
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                autocompleteItems={autocompleteItems}
                setAutocompleteItems={setAutocompleteItems}
            />
            <NavigationBar/>
            <BannerAd/>
            <RankingSection/>
            <Footer/>
        </>
    );
}

export default MainPageContainer;
