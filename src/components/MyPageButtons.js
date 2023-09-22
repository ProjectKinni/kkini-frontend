import React from "react";
import { useLocation } from "react-router-dom";

function MyPageButtons() {
  const location = useLocation();

  const getButtonClassName = (path) => {
    return location.pathname === path ? "on" : "";
  };

  return (
    <div className="nav-buttons my-nav content-max">
      <button className={getButtonClassName("/recently-viewed")}>
        최근 본 상품
      </button>
      <button className={`on ${getButtonClassName("/liked-list")}`}>
        찜 목록
      </button>
      <button className={getButtonClassName("/written-review")}>
        내가 쓴 리뷰
      </button>
    </div>
  );
}

export default MyPageButtons;
