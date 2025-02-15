import React, { useState, useEffect } from "react";
import axios from "axios";

const MediaLibrary = ({ setSearchImage, searchImage, onSelectImage, imageUploaded, showModal, setShowModal, selectedImage, setSelectedImage }) => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([])
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/media");
        setImages(response.data);
        setFilteredImages(response.data);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };
    fetchImages();
  }, [imageUploaded]);

  useEffect(() => {
    setFilteredImages([...images?.filter((a) => { return a.filename.includes(searchImage) })]);
    }, [searchImage])

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  return (
    <>
      {filteredImages.length != 0 ? <ul>
        {filteredImages.map((image, index) => (
          <li key={index} className={` ${selectedImage && selectedImage._id === image._id ? 'selected' : ''}`}>
            <div className="thumbnail"
              onClick={() => handleImageClick(image)} >
              <img src={`/images/${image.filename}`} alt={image.filename} />
            </div>
          </li>
        )).reverse()}
        {/* {images.map((image, index) => (
          <li key={index} className={` ${selectedImage && selectedImage._id === image._id ? 'selected' : ''}`}>
            <div className="thumbnail"
              onClick={() => handleImageClick(image)} >
              <img src={`/images/${image.filename}`} alt={image.filename} />
            </div>
          </li>
        )).reverse()} */}
      </ul> : <h5>No Image Found</h5>}
    </>
  );
};

export default MediaLibrary;
