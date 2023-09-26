import React, { useState } from 'react';
import Modal from 'react-modal';
import profile from "../assets/images/profile.png";
import ArrowRight from "../assets/images/arrow_right.png";
import IcDelete from "../assets/images/ic_close.png";
import "../styles/ReviewModal.css";

const ReviewModal = ({
    images,
    userNickname,
    starImages,
    isOpen,
    onRequestClose,
    content,
  }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageListOpen, setIsImageListOpen] = useState(false);

  const closeModal = () => {
    setCurrentImageIndex(0);
    onRequestClose();
  };

  const nextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const previousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const openImageList = () => {
    setIsImageListOpen(true);
  };

  const closeImageList = () => {
    setIsImageListOpen(false);
  };

  return (
    <Modal
      className="review-modal"
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Image Slider Modal"
    >
      <div className="modal-content">
        <div className="modal-img-wrap">
          <div className="image-slider">
            {currentImageIndex !== 0 && (
              <button className="btn-left" onClick={previousImage}>
                <img src={ArrowRight} alt="이전" />
              </button>
            )}
            <img
              src={images[currentImageIndex]}
              alt={`Image ${currentImageIndex}`}
            />
            {currentImageIndex !== images.length - 1 && (
              <button className="btn-right" onClick={nextImage}>
                <img src={ArrowRight} alt="다음" />
              </button>
            )}
          </div>
          <div className="review-image-wrap">
            {images.map((image, index) => (
              <div className="img-wrapper review-image" key={index}>
                <img
                  src={image}
                  alt={`Image ${index}`}
                  className={currentImageIndex === index ? 'active' : ''}
                  onClick={() => setCurrentImageIndex(index)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="review-card">
          <div className="review-header">
            <div className="user-profile">
              <div className="user-img">
                <img src={profile} alt="프로필 이미지" />
              </div>
              <div>
                <span className="user-name">{userNickname}</span>
                <div className="review-rating">
                  {starImages.map((star, index) => (
                    <span key={index}>{star}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="review-content">{content}</div>
        </div>
        <button className="btn-close" onClick={closeModal}>
          <img src={IcDelete} alt="이미지 삭제" />
        </button>
      </div>
      {/* 이미지 리스트 모달 */}
      {isImageListOpen && (
        <Modal isOpen={isImageListOpen} onRequestClose={closeImageList}>
          <div className="image-list">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </Modal>
      )}
    </Modal>
  );
};

export default ReviewModal;
