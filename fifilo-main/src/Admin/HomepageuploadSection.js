import React, { useState } from 'react'
import MediaLibraryModal from "./MediaLibraryModal";

export default function HomepageuploadSection({ clientLogos, setClientLogos, toolsLogo, setToolsLogo }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Open the modal to select an image
    const openMediaLibrary = () => setIsModalOpen(true);

    // Close the modal
    const closeMediaLibrary = () => setIsModalOpen(false);

    // Handle image selection
    const handleImageSelect = (image) => {
        setSelectedImage(image); // Set the selected image data
         if (clientLogos) {
            setClientLogos([...clientLogos, { filename: image.filename, path: image.filePath }])
        } else if (toolsLogo) {
            setToolsLogo([...toolsLogo, { filename: image.filename, path: image.filePath }])
        }
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="upload__section" onClick={openMediaLibrary}>
                <div className="upload__container">
                    <input type="file" id="fileInput" accept=".svg,.png,.jpg,.jpeg,.gif" hidden />
                    <div className="upload__area" id="uploadArea">
                        <div className="upload__icon" ><img src="assets/imgs/upload-cloud.svg" alt="" /></div>
                        <p><span>Click to upload</span></p>
                        <p>Only SVG, PNG, JPG</p>
                    </div>
                </div>
            </div>
            <MediaLibraryModal
                isOpen={isModalOpen}
                onClose={closeMediaLibrary}
                onSelectImage={handleImageSelect}
            />
        </>
    )
}
