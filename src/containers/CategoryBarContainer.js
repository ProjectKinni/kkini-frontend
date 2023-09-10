import React from 'react';
import KkiniChecked from '../components/KkiniChecked';
import Categories from '../components/Categories';
import Filters from '../components/Filters';

function CategoryBarContainer({ onKkiniChecked, onCategoryChange, onFilterChange, filters }) {
    return (
        <div className="category-bar-container">
            <KkiniChecked onKkiniChecked={onKkiniChecked} />
            <Categories onCategoryChange={onCategoryChange} />
            <Filters onFilterChange={onFilterChange} filters={filters}/>
        </div>
    );
}

export default CategoryBarContainer;
