import React, { useState, useEffect } from "react";
import axios from "axios";

const MediaLibrary = ({ onSelectImage, imageUploaded, showModal, setShowModal, selectedImage, setSelectedImage }) => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/media");
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };
    fetchImages();
  }, [imageUploaded]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };



  return (
    <>
      <ul>
        {images.map((image, index) => (
          <li key={index} className={` ${selectedImage && selectedImage._id === image._id ? 'selected' : ''}`}>
            <div className={`thumbnail`}
              onClick={() => handleImageClick(image)} >
              <img src={`/images/${image.filename}`} alt={image.filename} />
            </div>
          </li>
        )).reverse()}
      </ul>
    </>
  );
};

export default MediaLibrary;
