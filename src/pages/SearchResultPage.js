import React, { useState, useEffect } from "react";
import "../styles/SearchResultPage.css";
import { useLocation } from "react-router-dom";
import useSearchResults from "../components/UseSearchResults";
import NavigationBarContainer from "../containers/NavigationBarContainer";
import CategoryBarContainer from "../containers/CategoryBarContainer";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";

function SearchResultPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchTerm = queryParams.get("searchTerm");

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
    // URL이 변경될 때마다 searchTerm을 업데이트
    const newSearchTerm = queryParams.get("searchTerm");
    setSearchTerm(newSearchTerm); // 이 부분에서 initialSearchTerm 대신 newSearchTerm 사용
  }, [location]); // 의존성 배열에 location 추가

  // useSearchResults 훅을 사용하여 검색 결과와 상태 관리
  const { categoryGroups, loading, error, noProductsFound, products } = useSearchResults(
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
        <div className="page-tit content-max">
          <h1>"{searchTerm}"에 대한 검색결과</h1>
        </div>
        <div className="product-wrap content-max">
          <CategoryBarContainer
              onKkiniChecked={handleKkiniGreenCheckChange}
              onCategoryChange={setSelectedCategories}
              onFilterChange={handleFilterChange}
              searchTerm={searchTerm}
              autocompleteItems={autocompleteItems}
              setAutocompleteItems={setAutocompleteItems}
              filters={filters}
              kkiniGreenCheck={kkiniGreenCheck}
          />
          <div className="product-list-wrapper">
            { noProductsFound && <div>검색 결과가 없습니다.</div> }
            <ProductList
                products={products}
                categoryGroups={categoryGroups}
                noProductsFound={noProductsFound}
                searchTerm={searchTerm}
            />
          </div>
        </div>
        <Footer />
      </div>
  );
}

export default SearchResultPage;