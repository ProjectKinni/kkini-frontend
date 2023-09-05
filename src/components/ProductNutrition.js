import React from 'react';

const ProductNutrition = ({ nutrition }) => {
    return (
        <div className="nutrition-detail">
            <h3>열량  {nutrition.calorie}kcal</h3>
            <div className="nutrition-row top-row">
                <div className="nutrition-item">
                    <span>탄수화물: </span>{nutrition.carb}g
                </div>
                <div className="nutrition-item">
                    <span>단백질: </span>{nutrition.protein}g
                </div>
                <div className="nutrition-item">
                    <span>지방: </span>{nutrition.fat}g
                </div>
                <div className="nutrition-item">
                    <span>당류: </span>{nutrition.sugar}g
                </div>
            </div>
            <div className="nutrition-row">
                <div className="nutrition-item">
                    <span>나트륨: </span>{nutrition.sodium}mg
                </div>
                <div className="nutrition-item">
                    <span>콜레스테롤?: </span>{}mg
                </div>
                <div className="nutrition-item">
                    <span>포화지방: </span>{nutrition.saturatedFat}g
                </div>
                <div className="nutrition-item">
                    <span>트랜스지방: </span>g
                </div>
            </div>
        </div>
    );
}

export default ProductNutrition;
