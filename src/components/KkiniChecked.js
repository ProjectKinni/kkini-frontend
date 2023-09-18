import React,{useState} from "react";

function KkiniChecked({ onKkiniChecked }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleKkiniChecked = (checkedValue) => {
        setIsChecked(checkedValue);
        onKkiniChecked(checkedValue);
    };

    return (
        <div>
            <h3>끼니 그린 체크</h3>
            <input type="checkbox" checked={isChecked}
                   onChange={(e) => handleKkiniChecked(e.target.checked)} />
            <label>Kkini Green Checked</label>
        </div>
    );
}

export default KkiniChecked;