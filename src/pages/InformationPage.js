import React, {useState} from "react";
import NavigationContainer from "../containers/NavigationBarContainer"
import Information from "../components/Information"
import BannerAd from "../components/BannerAd"
import Footer from "../components/Footer"

function InformationPage ({ searchTerm: initialSearchTerm, setSearchTerm: initialSetSearchTerm,
                              autocompleteItems: initialAutocompleteItems,
                              setAutocompleteItems: initialSetAutocompleteItems }){
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [autocompleteItems, setAutocompleteItems] = useState(initialAutocompleteItems);


    return (
        <>
            <NavigationContainer
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                autocompleteItems={autocompleteItems}
                setAutocompleteItems={setAutocompleteItems}
            />
            <BannerAd className="banner-ad"/>
            <Information  />
            <Footer className="footer"/>
        </>
    );
}

export default InformationPage;