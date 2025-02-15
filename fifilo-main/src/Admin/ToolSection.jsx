import React, { useState } from 'react'
import MediaLibraryModal from "./MediaLibraryModal";

export default function ToolSection({ tool, index, handleTools, removeTools }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Open the modal to select an image
    const openMediaLibrary = () => setIsModalOpen(true);

    // Close the modal
    const closeMediaLibrary = () => setIsModalOpen(false);

    // Handle image selection
    const handleImageSelect = (image) => {
         setSelectedImage(image); // Set the selected image data
        handleTools(index, { filename: image.filename, path: image.filePath })
        setIsModalOpen(false); // Close the modal
    };
    return (
        <div className="image__block">
            <div className="single__img">
                <img src={tool.filename ? `/images/${tool.filename}` : "assets/imgs/avatar.svg"} alt="" />
            </div>
            <div className="btn__grp">
                <button className="btn" onClick={() => { openMediaLibrary() }}><img src="assets/imgs/edit-05.svg" alt="" /></button>
                <button className="btn" onClick={() => { removeTools(index) }}><img src="assets/imgs/trash-03.svg" alt="" /></button>
            </div>
            <MediaLibraryModal
                isOpen={isModalOpen}
                onClose={closeMediaLibrary}
                onSelectImage={handleImageSelect}
            />
        </div>

    )
}
