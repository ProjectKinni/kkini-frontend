import React, { useState, useEffect } from "react";
import "../styles/SearchResultPage.css";
import { useLocation } from "react-router-dom";
import useSearchResults from "../components/UseSearchResults";
import NavigationContainer from "../containers/NavigationBarContainer";
import CategoryBarContainer from "../containers/CategoryBarContainer";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";

function SearchResultPage({ setSearchTerm: initialSetSearchTerm }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchTerm = queryParams.get("searchTerm");

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

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  const handleKkiniGreenCheckChange = (value) => {
    setKkiniGreenCheck(value);
  };

  return (
      <div className="search-result-page">
        <NavigationContainer
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            autocompleteItems={autocompleteItems}
            setAutocompleteItems={setAutocompleteItems}
        />
        <div className="page-tit content-max">
          <h1>"{searchTerm}"에 대한 검색결과</h1>
        </div>
        <div className="product-wrap content-max">
          <CategoryBarContainer
              onKkiniChecked={handleKkiniGreenCheckChange}
              onCategoryChange={setSelectedCategories}
              onFilterChange={handleFilterChange}
              searchTerm={searchTerm}
              filters={filters}
              kkiniGreenCheck={kkiniGreenCheck}
          />
          <div className="product-list-wrapper">
            <ProductList
                categoryGroups={categoryGroups}
                noProductsFound={noProductsFound}
            />
          </div>
        </div>
        <Footer />
      </div>
  );
}

export default SearchResultPage;