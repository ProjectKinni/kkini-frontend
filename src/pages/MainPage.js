import React, { useState } from "react";
import "../styles/MainPage.css";
import NavigationContainer from "../containers/NavigationBarContainer";
import BannerAd from "../components/BannerAd";
import RankingSection from "../components/RankingSection";
import Footer from "../components/Footer";

function MainPage({
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
      <BannerAd className="banner-ad" />
      <RankingSection className="ranking-section" />
      <Footer className="footer" />
    </>
  );
}

export default MainPage;
