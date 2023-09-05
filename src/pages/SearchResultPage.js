import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/SearchResultPage.css';
import Header from "../components/Header";
import Filters from "../components/Filters";
import ProductList from "../components/ProductList";
import KkiniChecked from "../components/KkiniChecked";
import Footer from "../components/Footer";
import Categories from "../components/Categories";

const SERVER_URL = "http://localhost:8080";

function SearchResultPage({ searchResults }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [autocompleteItems, setAutocompleteItems] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTermFromParams = searchParams.get('searchTerm') || '';
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [isLowCalorie, setIsLowCalorie] = useState(false);
    const [isSugarFree, setIsSugarFree] = useState(false);
    const [isLowSugar, setIsLowSugar] = useState(false);
    const [isLowCarb, setIsLowCarb] = useState(false);
    const [isKeto, setIsKeto] = useState(false);
    const [isTransFat, setIsTransFat] = useState(false);
    const [isHighProtein, setIsHighProtein] = useState(false);
    const [isLowSodium, setIsLowSodium] = useState(false);
    const [isCholesterol, setIsCholesterol] = useState(false);
    const [isSaturatedFat, setIsSaturatedFat] = useState(false);
    const [isLowFat, setIsLowFat] = useState(false);

    useEffect(() => {
        console.log("필터 업데이트~~~~~:", searchResults);
    }, [searchResults]);

    useEffect(() => {
        let endpoint = `${SERVER_URL}/api/products/search?searchTerm=${searchTermFromParams}`;

        if (isChecked) {
            endpoint += `&isGreen=true`;
        }

        if (selectedCategories.length > 0) {
            console.log(selectedCategories);
            endpoint += `&categoryName=${selectedCategories.join(",")}`;
        }

        if (isLowCalorie) {
            endpoint += `&isLowCalorie=true`;
        }

        if (isSugarFree) {
            endpoint += `&isSugarFree=true`;
        }
        if (isLowSugar) {
            endpoint += `&isLowSugar=true`;
        }
        if (isLowCarb) {
            endpoint += `&isLowCarb=true`;
        }
        if (isKeto) {
            endpoint += `&isKeto=true`;
        }
        if (isTransFat) {
            endpoint += `&isTransFat=true`;
        }
        if (isHighProtein) {
            endpoint += `&isHighProtein=true`;
        }
        if (isLowSodium) {
            endpoint += `&isLowSodium=true`;
        }
        if (isCholesterol) {
            endpoint += `&isCholesterol=true`;
        }
        if (isSaturatedFat) {
            endpoint += `&isSaturatedFat=true`;
        }
        if (isLowFat) {
            endpoint += `&isLowFat=true`;
        }

        console.log("마지막 엔드포인트 ~~~ :", endpoint);

        fetch(endpoint)
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        console.error("Server Error:", text);
                        throw new Error('Network response was not ok');
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched Data:", data);
                if (data.message) {
                    setError(data.message);
                    setItems([]);
                } else if (Array.isArray(data)) {
                    setItems(data);
                } else {
                    const errorMsg = "Unexpected response format.";
                    setError(errorMsg);
                    setItems([]);
                }
            })
            .catch(error => {
                setError(error.message || "Error fetching products.");
            });
    }, [searchTermFromParams, selectedCategories, isChecked, isLowCalorie, isSugarFree, isLowSugar,
        isLowCarb, isKeto, isTransFat, isHighProtein, isLowSodium, isCholesterol, isSaturatedFat, isLowFat]);
    const handleKkiniChecked = (checkedValue) => {
        setIsChecked(checkedValue);
    }

    const handleLowCalorieChange = (e) => {
        setIsLowCalorie(e.target.checked);
    };

    const handleSugarFreeChange = (e) => {
        setIsSugarFree(e.target.checked);
    };

    const handleLowSugarChange = (e) => {
        setIsLowSugar(e.target.checked);
    };

    const handleLowCarbChange = (e) => {
        setIsLowCarb(e.target.checked);
    };

    const handleKetoChange = (e) => {
        setIsKeto(e.target.checked);
    };

    const handleTransFatChange = (e) => {
        setIsTransFat(e.target.checked);
    };

    const handleHighProteinChange = (e) => {
        setIsHighProtein(e.target.checked);
    };

    const handleLowSodiumChange = (e) => {
        setIsLowSodium(e.target.checked);
    };

    const handleCholesterolChange = (e) => {
        setIsCholesterol(e.target.checked);
    };

    const handleSaturatedFatChange = (e) => {
        setIsSaturatedFat(e.target.checked);
    };

    const handleLowFatChange = (e) => {
        setIsLowFat(e.target.checked);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    useEffect(() => {
        const categoryNamesFromParams = searchParams.getAll('categoryName');
        if (categoryNamesFromParams.length > 0) {
            setSelectedCategories(categoryNamesFromParams);
        }
    }, [location.search]);

    const categoryGroups = items.reduce((groups, item) => {
        const category = item.categoryName || 'Others';
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(item);
        return groups;
    }, {});

    return (
        <div className="search-result-page">
            <Header
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                autocompleteItems={autocompleteItems}
                setAutocompleteItems={setAutocompleteItems}
            />
            <div className="content-wrapper">
                {error ? (
                    <div className="error-message">
                        {error}
                    </div>
                ) : (
                    <>
                        <div className="left-sidebar">
                            <KkiniChecked onKkiniChecked={handleKkiniChecked}/>
                            <Categories
                                onCategoryChange={setSelectedCategories}
                                selected={selectedCategories}
                                location={location}
                                searchParams={searchParams}
                            />
                            <Filters
                                items={items}
                                searchName={searchTermFromParams}
                                setItems={setItems}
                                onLowCalorieChange={handleLowCalorieChange}
                                onSugarFreeChange={handleSugarFreeChange}
                                onLowSugarChange={handleLowSugarChange}
                                onLowCarbChange={handleLowCarbChange}
                                onKetoChange={handleKetoChange}
                                onTransFatChange={handleTransFatChange}
                                onHighProteinChange={handleHighProteinChange}
                                onLowSodiumChange={handleLowSodiumChange}
                                onCholesterolChange={handleCholesterolChange}
                                onSaturatedFatChange={handleSaturatedFatChange}
                                onLowFatChange={handleLowFatChange}
                            />
                        </div>
                        {Object.keys(categoryGroups).map(category => (
                            <div key={category}>
                                <h2>{category}</h2>
                                <ProductList items={categoryGroups[category]} />
                            </div>
                        ))}
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default SearchResultPage;