import React, { useState, useRef } from "react";
import axios from "axios";

const ImageUpload = ({ imageUploaded, setImageUplaoded }) => {
    const [file, setFile] = useState(null);
    const [altText, setAltText] = useState("null");
    const fileInputRef = useRef(null);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files[0])
        handleUpload(e.target.files[0])
    };
    const handledivclick = () => {
        fileInputRef.current.click(); // Trigger file input click
    };

    const handleUpload = async (im) => {
        const formData = new FormData();
        formData.append("image", im);
        formData.append("altText", altText);
        try {
            const response = await axios.post("/api/media/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(response)
            setFile(null);
            setImageUplaoded(response)
            alert("img uploaded successfully")
        } catch (error) {
            console.error("Error uploading image", error);
        }
    };


    return (<>
        <div className="edit__tools">
            <div className="upload__section">
                <div className="upload__container" onClick={handledivclick} >
                    <input type="file" id="fileInput" ref={fileInputRef} accept=".svg,.png,.jpg,.jpeg,.gif" hidden={true} onChange={handleFileChange} />
                    <div className="upload__area" id="uploadArea">
                        <div className="upload__icon"><img src="assets/imgs/upload-cloud.svg" alt="" /></div>
                        <p><span>Click to upload</span></p>
                        <p>Only SVG, PNG, JPG</p>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};

export default ImageUpload;
