import React, { useState } from "react";
import NavigationContainer from "../containers/NavigationBarContainer";
import CategoryBarContainer from "../containers/CategoryBarContainer";
import Footer from "../components/Footer";
import RankingList from "../components/rankinglist/RankingList"
import { fetchPickProducts } from "../utils/ApiClient"

function KkiniPickPage({
  searchTerm: initialSearchTerm,
  setSearchTerm: initialSetSearchTerm,
  autocompleteItems: initialAutocompleteItems,
  setAutocompleteItems: initialSetAutocompleteItems,
}) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [autocompleteItems, setAutocompleteItems] = useState(
    initialAutocompleteItems
  );
                              searchTerm: initialSearchTerm,
                              setSearchTerm: initialSetSearchTerm,
                              autocompleteItems: initialAutocompleteItems,
                              setAutocompleteItems: initialSetAutocompleteItems,
                          }){
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
    
    return(
        <>
            {/*기본속성*/}
            <NavigationContainer
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                autocompleteItems={autocompleteItems}
                setAutocompleteItems={setAutocompleteItems}
            />

            {/*로그인이 안되어있는 상태라면 로그인 창 띄워주기.*/}
            {/*if (!isLoggedIn) {*/}
            {/*    return <Redirect to="/login" />;*/}
            {/*}*/}

            <div className="page-tit content-max">
                <h1>끼니 PICK</h1>
                <p>
                    끼니의 취향저격상품
                </p>
            </div>

            <div className="ranking-layout">
                <CategoryBarContainer
                    onKkiniChecked={handleKkiniGreenCheckChange}
                    onCategoryChange={setSelectedCategories}
                    onFilterChange={handleFilterChange}

                    filters={filters}
                    kkiniGreenCheck={kkiniGreenCheck}
                />

                <RankingList fetchFunction={fetchPickProducts}/>
            </div>

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
    <>
      {/*기본속성*/}
      <NavigationContainer
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        autocompleteItems={autocompleteItems}
        setAutocompleteItems={setAutocompleteItems}
      />
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
        <div className="product-list-wrapper">{/* <ProductList /> */}</div>
      </div>
      <Footer className="footer" />
    </>
  );
}
export default KkiniPickPage;
