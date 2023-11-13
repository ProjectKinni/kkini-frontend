import React from 'react';
import '../styles/LoadingOverlay.css';

function LoadingOverlay({ isLoading }) {
  if (!isLoading) {
    return null; 
  }

  return (
    <div className="loading-overlay">
      <div className="overlay-bg"></div>
      <div className="loader"></div>
    </div>
  );
}

export default LoadingOverlay;