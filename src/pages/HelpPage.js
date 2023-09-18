import React, { useState } from "react";
import "../styles/HelpPage.css";
import NavigationContainer from "../containers/NavigationBarContainer";
import Help from "../components/Help";
import BannerAd from "../components/BannerAd";
import Footer from "../components/Footer";

function HelpPage({
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
      <div className="page-tit content-max">
        <h1>도움말</h1>
      </div>
      <Help />
      <Footer className="footer" />
    </>
  );
}

export default HelpPage;
