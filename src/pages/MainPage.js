import React, { useState } from 'react';
import '../styles/MainPage.css';
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import RankingSection from "../components/RankingSection";
import Footer from "../components/Footer";
import BannerAd from "../components/BannerAd";

function MainPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [autocompleteItems, setAutocompleteItems] = useState([]);

    return (
        <div className="main-page">
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
        </div>
    );
}

export default MainPage;
