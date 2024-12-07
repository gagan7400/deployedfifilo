import React, { useState } from 'react'
import MediaLibraryModal from "./MediaLibraryModal";

export default function CasestudyImg({ name, heroSection, setHeroSection }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Open the modal to select an image
    const openMediaLibrary = () => setIsModalOpen(true);

    // Close the modal
    const closeMediaLibrary = () => setIsModalOpen(false);

    // Handle image selection
    const handleImageSelect = (image) => {
        setSelectedImage(image); // Set the selected image data

        if (name === "heroImg") {
            setHeroSection({ ...heroSection, heroImg: { filename: image.filename, path: image.filePath } });
        } else if (name === "cardImg") {
            setHeroSection({ ...heroSection, cardImg: { filename: image.filename, path: image.filePath } });
        } else if (name == "homeImg") {
            setHeroSection({ ...heroSection, homeImg: { filename: image.filename, path: image.filePath } });
        }

        setIsModalOpen(false); // Close the modal
    };
    let deleteImg = () => {

        if (name == "heroImg") {
            setHeroSection({ ...heroSection, heroImg: { filename: "", path: "" } });
        } else if (name == "cardImg") {
            setHeroSection({ ...heroSection, cardImg: { filename: "", path: "" } });
        } else if (name == "homeImg") {
            setHeroSection({ ...heroSection, homeImg: { filename: "", path: "" } })
        }

    }
    return (

        <div className="col-lg-6">
            <label htmlFor="buttonsContent">{name}</label>
            <div className="uploaded__images">
                <div className="image__block">
                    <div className="single__img">
                        {name === "heroImg" ?
                            <img src={heroSection.heroImg.filename ? `/images/${heroSection.heroImg.filename}` : "assets/imgs/avatar.svg"} alt="" />
                            : name == "cardImg" ?
                                <img src={heroSection.cardImg && heroSection.cardImg.filename ? `/images/${heroSection.cardImg.filename}` : "assets/imgs/avatar.svg"} alt="" />
                                : <img src={heroSection.homeImg && heroSection.homeImg.filename ? `/images/${heroSection.homeImg.filename}` : "assets/imgs/avatar.svg"} alt="" />
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
