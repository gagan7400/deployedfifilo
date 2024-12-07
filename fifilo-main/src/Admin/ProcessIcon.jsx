import React, { useState } from 'react'
import MediaLibraryModal from "./MediaLibraryModal";

export default function ProcessIcon({ handleContentCardChange, card, name, index, heroSection, setHeroSection }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Open the modal to select an image
    const openMediaLibrary = () => setIsModalOpen(true);

    // Close the modal
    const closeMediaLibrary = () => setIsModalOpen(false);

    // Handle image selection
    const handleImageSelect = (image) => {
        setSelectedImage(image); // Set the selected image data
        if (heroSection && setHeroSection) {
            if (name === "heroImg") {
                setHeroSection({ ...heroSection, heroImg: { filename: image.filename, path: image.filePath } });
            } else if (name === "cardImg") {
                setHeroSection({ ...heroSection, cardImg: { filename: image.filename, path: image.filePath } });
            }
        } else if (handleContentCardChange && card && index.toString()) {
            handleContentCardChange(index, "icon", { filename: image.filename, path: image.filePath })

        }
        setIsModalOpen(false); // Close the modal
    };
    let deleteImg = () => {
        if (heroSection && setHeroSection) {
            if (name == "heroImg") {
                setHeroSection({ ...heroSection, heroImg: { filename: "", path: "" } });
            } else if (name == "cardImg") {
                setHeroSection({ ...heroSection, cardImg: { filename: "", path: "" } });
            }
        } else if (handleContentCardChange && card && index.toString()) {
            handleContentCardChange(index, "icon", { filename: "", path: "" })
        }
    }
    return (
        <div className="col-lg-12">
            <div className="profile__block">
                <div className="image__block">
                    {card && !heroSection ?
                        <img src={card.icon.filename ? `http://localhost:5000/images/${card.icon.filename}` : "assets/img/img_fullsize.png"} alt="" />
                        : name === "heroImg" ?
                            <img src={heroSection.heroImg.filename ? `http://localhost:5000/images/${heroSection.heroImg.filename}` : "assets/imgs/avatar.svg"} alt="" />
                            : <img src={heroSection.cardImg && heroSection.cardImg.filename ? `http://localhost:5000/images/${heroSection.cardImg.filename}` : "assets/imgs/avatar.svg"} alt="" />
                    }
                </div>
                <div className="btn__grp">
                    <button className="btn" onClick={() => { openMediaLibrary() }}><img src="assets/imgs/edit-05.svg" alt="" /></button>
                    <button className="btn" onClick={() => { deleteImg() }}><img src="assets/imgs/trash-03.svg" alt="" /></button>
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
