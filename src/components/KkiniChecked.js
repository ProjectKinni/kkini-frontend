import React, { useState } from "react";

function KkiniChecked({ onKkiniChecked }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleKkiniChecked = (checkedValue) => {
    setIsChecked(checkedValue);
    onKkiniChecked(checkedValue);
  };

  return (
    <div className="category-wrap">
      <h3>끼니 그린 체크</h3>
      <input
        id="green"
        type="checkbox"
        checked={isChecked}
        onChange={(e) => handleKkiniChecked(e.target.checked)}
      />
      <label for="green">Kkini Green Checked</label>
    </div>
  );
}

export default KkiniChecked;
