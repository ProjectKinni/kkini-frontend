import React, { useState } from 'react';

function KkiniChecked() {
    const [isChecked, setIsChecked] = useState(false);

    const handleKkiniChecked = (checkedValue) => {
        setIsChecked(checkedValue);
    };

    return (
        <div>
            <input type="checkbox" checked={isChecked}
                   onChange={(e) => handleKkiniChecked(e.target.checked)} />
            <label>Kkini Checked</label>
        </div>
    );
}

export default KkiniChecked;
