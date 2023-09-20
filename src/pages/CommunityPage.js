import React, { useState } from "react";
import "../styles/MainPage.css";
import NavigationContainer from "../containers/NavigationBarContainer";
import BannerAd from "../components/BannerAd";
import RankingSection from "../components/RankingSection";
import Footer from "../components/Footer";
import ReviewListForCommunity from "../components/ReviewListForCommunity";

function CommunityPage({
                      searchTerm: initialSearchTerm,
                      setSearchTerm: initialSetSearchTerm,
                      autocompleteItems: initialAutocompleteItems,
                      setAutocompleteItems: initialSetAutocompleteItems,
                  }) {
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [autocompleteItems, setAutocompleteItems] = useState(
        initialAutocompleteItems
    );

    return (
        <>
            <NavigationContainer
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                autocompleteItems={autocompleteItems}
                setAutocompleteItems={setAutocompleteItems}
            />
            <ReviewListForCommunity />

        </>
    );
}

export default CommunityPage;