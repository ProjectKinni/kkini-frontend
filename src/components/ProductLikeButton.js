import React, { useState, useEffect } from "react";
import { toggleLike } from "./ToggleLike"; // toggleLike.js 파일 경로에 맞게 수정
import IcLikeOn from "../assets/images/ic_like_on.png";
import IcLikeOff from "../assets/images/ic_like_off.png";
import axios from "axios";
const SERVER_URL = "https://223.130.139.40:8080";

function ProductLikeButton({ userId, productId }) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (userId) {
      axios
        .get(`${SERVER_URL}/like/${userId}/${productId}`)
        .then((response) => {
          setIsLiked(response.data);
        })
        .catch((error) => {
          console.error("Error fetching like status:", error);
        });
    } else {
      setIsLiked(false); // Add this line
    }
  }, [userId, productId]);

  const handleToggleLike = () => {
    if (userId) {
      toggleLike(userId, productId, setIsLiked);
    }
  };

  if (!userId) {
    return null;
  }

  return (
    <div className="ic-like" onClick={handleToggleLike}>
      {isLiked ? (
        <img src={IcLikeOn} alt="찜 취소하기" />
      ) : (
        <img src={IcLikeOff} alt="찜하기" />
      )}
    </div>
  );
}

export default ProductLikeButton;
