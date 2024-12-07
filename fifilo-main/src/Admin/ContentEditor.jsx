import React, { useState } from "react";
import MediaLibrary from "./MediaLibrary";
import ImageUpload from "./ImageUpload";

const ContentEditor = () => {
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const [ImageUplaoded, setImageUplaoded] = useState(null);
    const [section, setSection] = useState(null);

    const handleImageSelect = (imageUrl) => {
        setSelectedImageUrl(imageUrl);
    };

    const handleUploadSuccess = (newImage) => {
        setImageUplaoded(newImage)
        alert("Image Uploaded Successfully")
    };

    return (
        <div>
            <button className="btn btn-parimary" onClick={() => { setSection(true) }}> Upload new image </button>  | <button className="btn btn-parimary" onClick={() => { setSection(false) }}>Media library </button>

            {selectedImageUrl && (
                <div>
                    <p>Selected Image:</p>
                    <img src={`http://localhost:5000/images/${selectedImageUrl.filename}`} alt="Selected" width="200" />
                </div>
            )}
            {section ?
                <ImageUpload onUploadSuccess={handleUploadSuccess} />
                :
                <MediaLibrary onSelectImage={handleImageSelect} ImageUplaoded={ImageUplaoded} />
            }
        </div>
    );
};

export default ContentEditor;
