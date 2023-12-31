import React, {useState} from "react";
import "../styles/ProductList.css";
import NavigationContainer from "../containers/NavigationBarContainer";
import CategoryBarContainer from "../containers/CategoryBarContainer";
import Footer from "../components/Footer";
import RankingList from "../components/rankinglist/RankingList";
import {fetchGreenProducts} from "../utils/ApiClient"

function GreenRankingPage() {

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
             <div className="page-tit content-max green">
                <h1>끼니 그린</h1>
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
                    <RankingList fetchFunction={fetchGreenProducts} />
                </div>
            </div>
            <Footer className="footer"/>
        </div>
    );
}

export default GreenRankingPage;
