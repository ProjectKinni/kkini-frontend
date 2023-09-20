import React, {useState} from "react";
import "../styles/ProductList.css";
import NavigationContainer from "../containers/NavigationBarContainer";
import CategoryBarContainer from "../containers/CategoryBarContainer";
import Footer from "../components/Footer";
import RankingList from "../components/rankinglist/RankingList";
import {fetchGreenProducts} from "../utils/ApiClient";

function GreenRankingPage({
                              searchTerm: initialSearchTerm,
                              setSearchTerm: initialSetSearchTerm,
                              autocompleteItems: initialAutocompleteItems,
                              setAutocompleteItems: initialSetAutocompleteItems,
                          }) {
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [autocompleteItems, setAutocompleteItems] = useState(
        initialAutocompleteItems
    );

    const [kkiniGreenCheck, setKkiniGreenCheck] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filters, setFilters] = useState({
        isLowCalorie: false,
        isSugarFree: false,
        isLowSugar: false,
        isLowCarb: false,
        isKeto: false,
        isTransFat: false,
        isHighProtein: false,
        isLowSodium: false,
        isCholesterol: false,
        isSaturatedFat: false,
        isLowFat: false,
    });

    const handleFilterChange = (updatedFilters) => {
        setFilters(updatedFilters);
    };

    const handleKkiniGreenCheckChange = (value) => {
        setKkiniGreenCheck(value);
    };

    return (
        <div className="search-result-page">
            {/*기본속성*/}
            <NavigationContainer
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                autocompleteItems={autocompleteItems}
                setAutocompleteItems={setAutocompleteItems}
            />

            <div className="page-tit content-max">
                <h1>끼니 그린 랭킹</h1>
            <p>간편하게, 건강하게!</p>
            </div>
            <div className="product-wrap content-max">
                <CategoryBarContainer
                    onKkiniChecked={handleKkiniGreenCheckChange}
                    onCategoryChange={setSelectedCategories}
                    onFilterChange={handleFilterChange}

                    filters={filters}
                    kkiniGreenCheck={kkiniGreenCheck}
                />
                <div className="product-list-wrapper">
                    <RankingList fetchFunction={fetchGreenProducts}/>
                </div>
            </div>
            <Footer className="footer"/>
        </div>
    );
}

export default GreenRankingPage;
