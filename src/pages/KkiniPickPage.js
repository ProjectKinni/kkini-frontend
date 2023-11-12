import React, { useState, useEffect } from "react";
import NavigationContainer from "../containers/NavigationBarContainer";
import CategoryBarContainer from "../containers/CategoryBarContainer";
import Footer from "../components/Footer";
import { fetchPickProducts } from "../utils/ApiClient";
import ProductList from "../components/ProductList";
import useSearchResults from "../components/UseSearchResults";
import {useUser} from "../components/UserContext";
import {useLocation} from "react-router-dom";

function KkiniPickPage({
                           setSearchTerm: initialSetSearchTerm,
                           autocompleteItems: initialAutocompleteItems
                       }) {
    const { user } = useUser();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialSearchTerm = queryParams.get("searchTerm");
    const [productList, setProductList] = useState([]);

    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [autocompleteItems, setAutocompleteItems] = useState([]);
    const [kkiniGreenCheck, setKkiniGreenCheck] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filters, setFilters] = useState({
        isLowCalorie: false,
        isHighCalorie: false,
        isSugarFree: false,
        isLowSugar: false,
        isLowCarb: false,
        isHighCarb: false,
        isKeto: false,
        isLowTransFat: false,
        isHighProtein: false,
        isLowSodium: false,
        isLowCholesterol: false,
        isLowSaturatedFat: false,
        isLowFat: false,
        isHighFat: false
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

    return (
        <>
            <div className="page-tit content-max">
                <h1>끼니 PICK</h1>
                <p>끼니의 취향저격상품</p>
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
                    <ProductList categoryGroups={productList} noProductsFound={noProductsFound} />
                </div>
            </div>
            <Footer className="footer" />
        </>
    );
}

export default KkiniPickPage;
