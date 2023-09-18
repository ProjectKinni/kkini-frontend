import React, { useState } from "react";
import "../styles/InformationPage.css";
import NavigationContainer from "../containers/NavigationBarContainer";
import Information from "../components/Information";
import Footer from "../components/Footer";
import infoBanner from "../assets/images/Intro.jpg";

function InformationPage({
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
      <div className="info-banner">
        <img src={infoBanner} alt="소개 이미지" />
      </div>
      <Information />
      <Footer className="footer" />
    </>
  );
}

export default InformationPage;
