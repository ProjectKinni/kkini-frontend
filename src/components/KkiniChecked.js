import React, { useState } from 'react';

function KkiniChecked({ onKkiniChecked }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        onKkiniChecked(!isChecked);
    }

    return (
        <div className="kkini-selection">
            <h3>끼니 선택</h3>
            <label>
                <input type="checkbox" name="kkini" value="kkiniGreen" checked={isChecked} onChange={handleCheckboxChange} />
                끼니 그린
            </label>
        </div>
    );
}
export default KkiniChecked;