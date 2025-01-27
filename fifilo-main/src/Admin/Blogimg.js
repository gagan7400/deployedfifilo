import React, { useState } from 'react'
import MediaLibraryModal from "./MediaLibraryModal";

export default function Blogimg({ bannerImg, setBannerImg, }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Open the modal to select an image
    const openMediaLibrary = () => setIsModalOpen(true);

    // Close the modal
    const closeMediaLibrary = () => setIsModalOpen(false);

    // Handle image selection
    const handleImageSelect = (image) => {
        setSelectedImage(image); // Set the selected image data
        setBannerImg({ filename: image.filename, path: image.filePath })
        setIsModalOpen(false); // Close the modal
    };
    let deleteImg = () => {
        setBannerImg({ filename: "", path: '' })
    }
    return (
        <div class="col-lg-12">
            <div class="seo__card">
                <div class="card__block">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="input__inr">
                                <label for="buttonsContent">Featured Image</label>
                            </div>
                            <div className="uploaded__images">
                                <div className="image__block">
                                    <div className="single__img">
                                        <img src={bannerImg?.filename ? `/images/${bannerImg.filename}` : "assets/img/img_fullsize.png"} alt="" />
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
                    </div>
                </div>
            </div>
        </div>

    )
}
