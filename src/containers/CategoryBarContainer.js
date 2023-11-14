import React, { useEffect } from 'react';
import KkiniChecked from '../components/KkiniChecked';
import Categories from '../components/Categories';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';

function CategoryBarContainer({ onKkiniChecked, onCategoryChange, onFilterChange,
                                  filters, autocompleteItems, setAutocompleteItems }) {
    return (
        <div className="category-bar-container">
            {/*<KkiniChecked onKkiniChecked={onKkiniChecked} />*/}
            <Categories onCategoryChange={onCategoryChange} />
            <Filters onFilterChange={onFilterChange} filters={filters}/>
        </div>
    );
}

export default CategoryBarContainer;
