import React, { useState } from "react";
import IcStar from "../assets/images/star_on.png";
import IcStarOff from "../assets/images/star_off.png";

const StarRating = ({ value, onChange }) => {
  const stars = [1, 2, 3, 4, 5]; // 별점의 범위

  return (
    <div className="star-rating">
      {stars.map((star) => (
        <img
          key={star}
          src={star <= value ? IcStar : IcStarOff}
          alt={star <= value ? "별" : "빈 별"}
          onClick={() => onChange(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;