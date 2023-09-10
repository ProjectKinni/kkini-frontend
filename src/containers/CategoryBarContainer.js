import React from 'react';
import KkiniChecked from '../components/KkiniChecked';
import Categories from '../components/Categories';
import Filters from '../components/Filters';

function CategoryBarContainer() {
    return (
        <div className="category-bar-container">
            <KkiniChecked />
            <Categories />
            <Filters />
        </div>
    );
}

export default CategoryBarContainer;
