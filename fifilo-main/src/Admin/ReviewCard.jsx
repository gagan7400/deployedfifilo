import React, { useState } from 'react'
import MediaLibraryModal from "./MediaLibraryModal";
export default function ReviewCard({ card, index, handleReviewCardChange }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Open the modal to select an image
    const openMediaLibrary = () => setIsModalOpen(true);
    const deleteImage = () => {
        handleReviewCardChange(index, "clientImgs", { filename: "", path: "" })
    }
    // Close the modal
    const closeMediaLibrary = () => setIsModalOpen(false);

    // Handle image selection
    const handleImageSelect = (image) => {
        setSelectedImage(image); // Set the selected image data
        handleReviewCardChange(index, "clientImgs", { filename: image.filename, path: image.filePath })
        setIsModalOpen(false); // Close the modal
    };

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="profile__block">
                    <div className="image__block">
                        <img src={card.clientImgs.filename ? `/images/${card.clientImgs.filename}` : "assets/imgs/avatar.svg"} alt="testimonials-img" />
                    </div>
                    <div className="btn__grp">
                        <button className="btn" onClick={() => { openMediaLibrary() }}><img src="assets/imgs/edit-05.svg" alt="" /></button>
                        <button className="btn" onClick={() => { deleteImage() }}><img src="assets/imgs/trash-03.svg" alt="" /></button>
                    </div>
                </div>
                <MediaLibraryModal
                    isOpen={isModalOpen}
                    onClose={closeMediaLibrary}
                    onSelectImage={handleImageSelect} // Pass the image selection handler
                />
            </div>
            <div className="col-lg-6 col-lg-6">
                <div className="input__inr">
                    <label htmlFor={`clientName${index}`}>Reviewer’s Name</label>
                    <input type="text"
                        name="clientName"
                        id={`clientName${index}`}
                        className="form-control"
                        value={card.clientName}
                        onChange={(e) => { handleReviewCardChange(index, e) }}
                        placeholder="Enter Reviewer’s Name"
                        autoComplete='false'
                    />
                </div>
            </div>
            <div className="col-lg-6 col-lg-6">
                <div className="input__inr">
                    <label htmlFor={`company${index}`}>Company Name</label>
                    <input type="text"
                        name="company"
                        id={`company${index}`}
                        className="form-control"
                        value={card.company}
                        onChange={(e) => { handleReviewCardChange(index, e) }}
                        placeholder="Enter Company Name"
                        autoComplete='false'
                    />
                </div>
            </div>
            <div className="col-lg-12">
                <div className="input__inr">
                    <label htmlFor={`Reviewdescription${index}`}>Review Description</label>
                    <textarea
                        name="description"
                        id={`Reviewdescription${index}`}
                        className="form-control"
                        value={card.description}
                        onChange={(e) => { handleReviewCardChange(index, e) }}
                        rows={5}
                        placeholder="Enter Review Description"
                        autoComplete='false'
                    > </textarea>
                </div>
            </div>
        </div>
    )
}
