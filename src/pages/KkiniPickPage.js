import React, { useState, useEffect } from "react";
import NavigationContainer from "../containers/NavigationBarContainer";
import CategoryBarContainer from "../containers/CategoryBarContainer";
import Footer from "../components/Footer";
import { fetchPickProducts } from "../utils/ApiClient";
import ProductList from "../components/ProductList";
import useSearchResults from "../components/UseSearchResults";
import {useUser} from "../components/UserContext";
import {useLocation} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RankingList from "../components/rankinglist/RankingList";
import "../styles/PickPage.css";


function KkiniPickPage({
                           setSearchTerm: initialSetSearchTerm,
                           autocompleteItems: initialAutocompleteItems
                       }) {
    const { user } = useUser();
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const initialSearchTerm = queryParams.get("searchTerm");
    const [productList, setProductList] = useState([]);

    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [autocompleteItems, setAutocompleteItems] = useState([]);
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

    useEffect(() => {
        setSearchTerm(initialSearchTerm);
    }, [location]);

    const { categoryGroups, loading, error, noProductsFound } = useSearchResults(
        searchTerm,
        selectedCategories,
        filters,
        kkiniGreenCheck
    );

    useEffect(() => {
        if (user?.userId) {
            fetchPickProducts(user.userId, selectedCategories, filters)
                .then((data) => {
                    setProductList(data);
                })
                .catch((error) => {
                    console.error("Error fetching pick products:", error);
                });
        }
    }, [user?.userId, selectedCategories, filters]);

    const handleFilterChange = (updatedFilters) => {
        setFilters(updatedFilters);
    };

    const handleKkiniGreenCheckChange = (value) => {
        setKkiniGreenCheck(value);
    };

    let title = "끼니 PICK";
    let subtitle = user ? `${user.nickname}님을 위한 끼니의 취향저격 상품` : "끼니의 친구가 되어, 나를 위한 상품들을 만나보세요!";
    let buttonLink = user ? "/pick" : "/login";
    let buttonText = "로그인";

    return (
        <>
            <div className="page-tit content-max">
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>
            <div className="product-wrap content-max">
                <CategoryBarContainer
                    onKkiniChecked={handleKkiniGreenCheckChange}
                    onCategoryChange={setSelectedCategories}
                    onFilterChange={handleFilterChange}
                    filters={filters}
                    kkiniGreenCheck={kkiniGreenCheck}
                />
                {user ? (
                    <div className="product-list-wrapper">
                        <RankingList fetchFunction={fetchPickProducts} />
                    </div>
                ) : (
                    <div className="login-prompt">
                        <p>끼니의 친구가 되어 나를 위한 상품들을 만나보세요!</p>
                        <button className="btn-login" onClick={() => navigate(buttonLink)}>
                            {buttonText}
                        </button>
                    </div>
                )}
            </div>
            <Footer className="footer" />
        </>
    );
}

export default KkiniPickPage;
