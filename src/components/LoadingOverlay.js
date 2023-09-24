import React from 'react';
import '../styles/LoadingOverlay.css';

function LoadingOverlay({ isLoading }) {
  if (!isLoading) {
    return null; // 로딩 중이 아닐 때는 아무것도 렌더링하지 않음
  }

  return (
    <div className="loading-overlay">
      <div className="overlay-bg"></div>
      <div className="loader"></div>
    </div>
  );
}

export default LoadingOverlay;