import React, {useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";

function NavButtonsComponent() {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 페이지 경로를 가져와서 해당 버튼에 'on' 클래스를 추가하는 함수
  const getButtonClassName = (path) => {
    return location.pathname === path ? "on" : "";
  };

    // 페이지 경로가 변경될 때마다 최상단으로 스크롤 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]); // location.pathname이 변경될 때마다 useEffect가 호출됨

  return (
    <div className="nav-buttons">
      <button
        className={getButtonClassName("/pick")}
        onClick={() => navigate("/pick")}
      >
        끼니 PICK
      </button>
      <button
        className={getButtonClassName("/ranking")}
        onClick={() => navigate("/ranking")}
      >
        끼니 랭킹
      </button>
      <button
        className={`tab-green ${getButtonClassName("/green-ranking")}`}
        onClick={() => navigate("/green-ranking")}
      >
        끼니 그린
      </button>
      <button
        className={getButtonClassName("/community")}
        onClick={() => navigate("/community")}
      >
        커뮤니티
      </button>
    </div>
  );
}

export default NavButtonsComponent;
