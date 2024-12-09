import React, { useState } from 'react'
import MediaLibraryModal from "./MediaLibraryModal";

export default function SketchesImg({ name, HandleSketchesImg, HandleupdatedLookImg, handleFullWidthImg, index, img }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Open the modal to select an image
    const openMediaLibrary = () => setIsModalOpen(true);

    // Close the modal
    const closeMediaLibrary = () => setIsModalOpen(false);

    // Handle image selection
    const handleImageSelect = (image) => {
        setSelectedImage(image); // Set the selected image data
        if (HandleSketchesImg) {
            HandleSketchesImg(index, name, { filename: image.filename, path: image.filePath })
        }
        else if (handleFullWidthImg) {
            handleFullWidthImg(index, { filename: image.filename, path: image.filePath })
        } else {
            HandleupdatedLookImg(index, name, { filename: image.filename, path: image.filePath })
        }
        setIsModalOpen(false); // Close the modal
    };
    let deleteImg = () => {
        if (HandleSketchesImg) {
            HandleSketchesImg(index, name, { filename: "", path: "" })
        } else {
            HandleupdatedLookImg(index, name, { filename: "", path: "" })
        }

    }
    return (
        <div className="col-lg-12">
            <div className="uploaded__images">
                <div className="image__block">
                    <div className="single__img">
                        <img src={img && img.filename ? `/images/${img.filename}` : "assets/img/img_fullsize.png"} alt="" />
                    </div>

                    <div className="btn__grp">
                        <button className="btn" onClick={() => { openMediaLibrary() }}><img src="assets/imgs/edit-05.svg" alt="" /></button>
                        <button className="btn" onClick={() => { deleteImg() }}><img src="assets/imgs/trash-03.svg" alt="" /></button>
                    </div>
                </div>
            </div>
            <MediaLibraryModal
                isOpen={isModalOpen}
                onClose={closeMediaLibrary}
                onSelectImage={handleImageSelect}
            />
        </div>
    )
}
