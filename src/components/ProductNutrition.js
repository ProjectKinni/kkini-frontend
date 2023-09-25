import React from 'react';

const ProductNutrition = ({ nutrition }) => {
    if (!nutrition) {
        return null;
    }

    return (
        <div className="nutrition-detail">
          <div className="nutrition-row top-row">
            <div className="nutrition-item">
              <span>탄수화물</span>
              {nutrition.carbohydrate}g
            </div>
            <div className="nutrition-item">
              <span>단백질</span>
              {nutrition.protein}g
            </div>
            <div className="nutrition-item">
              <span>지방</span>
              {nutrition.fat}g
            </div>
            <div className="nutrition-item">
              <span>당류</span>
              {nutrition.sugar}g
            </div>
          </div>
          <div className="nutrition-row">
            <div className="nutrition-item">
              <span>나트륨</span>
              {nutrition.sodium}mg
            </div>
            <div className="nutrition-item">
              <span>콜레스테롤</span>
              {nutrition.cholesterol}mg
            </div>
            <div className="nutrition-item">
              <span>포화지방</span>
              {nutrition.saturatedFat}g
            </div>
            <div className="nutrition-item">
              <span>트랜스지방</span>
              {nutrition.transFat}g
            </div>
          </div>
        </div>
    );
}

export default ProductNutrition;