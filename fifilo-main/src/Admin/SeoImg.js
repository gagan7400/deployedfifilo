import React, { useState } from 'react'
import MediaLibraryModal from "./MediaLibraryModal";

export default function SeoImg({ seoSection, setSeoSection, updateContact, index, name, data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Open the modal to select an image
    const openMediaLibrary = () => setIsModalOpen(true);

    // Close the modal
    const closeMediaLibrary = () => setIsModalOpen(false);

    // Handle image selection
    const handleImageSelect = (image) => {
        setSelectedImage(image); // Set the selected image data
        if (setSeoSection && !name) {
            setSeoSection({ ...seoSection, seoImg: { filename: image.filename, path: image.filePath } })
        } else {
            updateContact(index, name, { filename: image.filename, path: image.filePath })
        }
        setIsModalOpen(false); // Close the modal
    };
    let deleteImg = () => {
        setSeoSection({ ...seoSection, seoImg: { filename: "", path: '' } })
    }
    return (
        <div className="col-lg-6">
            <div className="uploaded__images">
                <div className="image__block">
                    <div className="single__img">
                        {(seoSection && !name) ? <img src={seoSection.seoImg.filename ? `/images/${seoSection.seoImg.filename}` : "assets/img/img_fullsize.png"} alt="" />
                            : <img src={data && data.filename ? `/images/${data.filename}` : "assets/imgs/avatar.svg"} alt="" />
                        }
                    </div>
                    <div className="btn__grp">
                        <button className="btn" type="button" onClick={() => { openMediaLibrary() }}><img src="assets/imgs/edit-05.svg"
                            alt="" /></button>
                        <button className="btn" type="button" onClick={deleteImg}><img src="assets/imgs/trash-03.svg"
                            alt="" /></button>
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
