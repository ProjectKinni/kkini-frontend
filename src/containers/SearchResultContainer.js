import React from 'react';
import Categories from "../components/Categories";
import Filters from "../components/Filters";
import Footer from "../components/Footer";
import Header from "../components/Header";
import KkiniChecked from "../components/KkiniChecked";
import ProductList from "../components/ProductList";
import { useCategoryFromSearchParams } from '../components/useCategoryFromSearchParams';
import { useFetchProducts } from '../components/useFetchProducts';

function SearchResultContainer({ searchTerm, setSearchTerm, autocompleteItems, setAutocompleteItems, searchResults }) {
    const { selectedCategories, setSelectedCategories } = useCategoryFromSearchParams();
    const { items, setItems, error } = useFetchProducts(searchTerm, selectedCategories);

    const categoryGroups = items.reduce((groups, item) => {
        const category = item.categoryName || 'Others';
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(item);
        return groups;
    }, {});

    return (
        <>
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
                            <KkiniChecked />
                            <Categories
                                onCategoryChange={setSelectedCategories}
                                selected={selectedCategories}
                            />
                            <Filters
                                items={items}
                                searchName={searchTerm}
                                setItems={setItems}
                            />
                        </div>
                        <ProductList categoryGroups={categoryGroups} />
                    </>
                )}
            </div>
            <Footer />
        </>
    );
}

export default SearchResultContainer;
