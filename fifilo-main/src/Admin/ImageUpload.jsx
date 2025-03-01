import React, { useState, useRef } from "react";
import axios from "axios";
import ImageLoader from "./ImageLoader";

const ImageUpload = ({ setImageUplaoded, selectedImage, setSelectedImage, openmedi }) => {
    const [altText, setAltText] = useState("");
    const [filedata, setFiledata] = useState(false); // New state for loading
    const [loading, setLoading] = useState(false); // New state for loading
    const [name, setName] = useState(false); // New state for name
    const [size, setSize] = useState(false); // New state for name
    const [uploadComplete, setUploadComplete] = useState(false); // New state for name
    const fileInputRef = useRef(null);

    const handleFileChange = async (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            setFiledata(Array.from(files))
            if (files.length > 10) {
                alert("length exceeded; Only 10 Images at a time");
            } else {
                setLoading(true); // Start loading when upload starts
                setName(files[0].name);
                setSize(Math.floor(files[0].size / 1000));
                await handleUpload(files);
                e.target.value = ""; // Reset the file input
            }
        }
    };

    const handleDivClick = () => {
        fileInputRef.current.click(); // Trigger file input click
    };

    const handleUpload = async (files) => {

        setLoading(true);
        const formData = new FormData();
        for (let file of files) {
            formData.append("images", file);
        }
        formData.append("altText", altText);

        try {
            const response = await axios.post(
                "/api/media/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "x-auth-token": localStorage.getItem("token"),
                    },
                }
            );
            setImageUplaoded(response.data.images);
            console.log(response.data.images)

            // alert("Images uploaded successfully");
        } catch (error) {
            console.error("Error uploading images", error);
        } finally {
            setTimeout(() => {
                // setLoading(false);
                if (openmedi) {
                    openmedi();
                }
            }, 1000);
        }
    };

    let clearfun = () => {
        setName("");
        setSize("");
        setImageUplaoded(false);
        setLoading(false);
    }


    return (
        <>
            <div className="edit__tools">
                <div className="upload__section">
                    <div className="upload__container" onClick={handleDivClick}>
                        <input
                            type="file"
                            multiple
                            id="fileInput"
                            ref={fileInputRef}
                            accept=".svg,.png,.jpg,.jpeg,.gif"
                            hidden={true}
                            onChange={handleFileChange}
                        />
                        <div className="upload__area" id="uploadArea">
                            <>
                                <div className="upload__icon">
                                    <img src="assets/imgs/upload-cloud.svg" alt="" />
                                </div>
                                <p><span>Click to upload</span></p>
                                <p>Only SVG, PNG, JPG (Max 10 Images)</p>
                                {loading && <ImageLoader filedata={filedata} setFiledata={setFiledata} clearfun={clearfun} name={name} size={size} setUploadComplete={setUploadComplete} uploadComplete={uploadComplete} />}
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImageUpload;