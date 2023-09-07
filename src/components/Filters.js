import React, { useState } from 'react';

function Filters() {
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

    return (
        <div>
            <div>
                <input type="checkbox" checked={isLowCalorie}
                       onChange={(e) => setIsLowCalorie(e.target.checked)} /> Low Calorie
            </div>
            <div>
                <input type="checkbox" checked={isSugarFree}
                       onChange={(e) => setIsSugarFree(e.target.checked)} /> Sugar Free
            </div>
            <div>
                <input type="checkbox" checked={isLowSugar}
                       onChange={(e) => setIsLowSugar(e.target.checked)} /> Low Sugar
            </div>
            <div>
                <input type="checkbox" checked={isLowCarb}
                       onChange={(e) => setIsLowCarb(e.target.checked)} /> Low Carb
            </div>
            <div>
                <input type="checkbox" checked={isKeto}
                       onChange={(e) => setIsKeto(e.target.checked)} /> Keto
            </div>
            <div>
                <input type="checkbox" checked={isTransFat}
                       onChange={(e) => setIsTransFat(e.target.checked)} /> Trans Fat Free
            </div>
            <div>
                <input type="checkbox" checked={isHighProtein}
                       onChange={(e) => setIsHighProtein(e.target.checked)} /> High Protein
            </div>
            <div>
                <input type="checkbox" checked={isLowSodium}
                       onChange={(e) => setIsLowSodium(e.target.checked)} /> Low Sodium
            </div>
            <div>
                <input type="checkbox" checked={isCholesterol}
                       onChange={(e) => setIsCholesterol(e.target.checked)} /> Cholesterol Free
            </div>
            <div>
                <input type="checkbox" checked={isSaturatedFat}
                       onChange={(e) => setIsSaturatedFat(e.target.checked)} /> Low Saturated Fat
            </div>
            <div>
                <input type="checkbox" checked={isLowFat}
                       onChange={(e) => setIsLowFat(e.target.checked)} /> Low Fat
            </div>
        </div>
    );
}

export default Filters;
