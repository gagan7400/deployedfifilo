import React, { useState } from "react";
import MediaLibrary from "./MediaLibrary";
import ImageUpload from "./ImageUpload";
import Sidebar from "./Sidebar";
import axios from "axios";
const MediaSection = () => {
    const [section, setSection] = useState(false)
    const [imageUploaded, setImageUplaoded] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const handleDelete = async (imageId) => {
        if (window.confirm("Are You Sure,You Want Delete This")) {
            try {
                let { data } = await axios.delete(`/api/media/${imageId}`);
                if (data.success) {
                    setShowModal(false);
                    setImageUplaoded("deleted");
                } else {
                    console.log(data);
                }
            } catch (error) {
                console.error("Error deleting image", error);
            }
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedImage(null);
    };
    return (
        <>
            <Sidebar />
            <div className="main__content" >
                <div className="page__editors">
                    <div className="page__title">
                        <h5>Media Library</h5>
                        <button className="btn btn__update" onClick={() => { setSection(!section) }}>{section ? <> <img src="assets/imgs/arrow-back.svg" />Back</> : "Add New Media File"}</button>
                    </div>

                    {section ? <ImageUpload imageUploaded={imageUploaded} setImageUplaoded={setImageUplaoded} /> : ""}
                    <div className="media__grids">
                        <MediaLibrary
                            imageUploaded={imageUploaded}
                            showModal={showModal}
                            setShowModal={setShowModal}
                            selectedImage={selectedImage}
                            setSelectedImage={setSelectedImage} />
                    </div>
                </div>
                {showModal && selectedImage && (
                    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.6)", display: "flex", justifyContent: "center", alignItems: "center", }}>
                        <div style={{ background: "#fff", padding: "30px", borderRadius: "8px", width: "700px", height: "auto", position: "relative", textAlign: "center", }} >
                            <span style={{ position: "absolute", top: "10px", right: "15px", fontSize: "24px", cursor: "pointer", }} onClick={closeModal} > &times; </span>
                            <h3>Image Details</h3>
                            <p> <strong>Filename:</strong> {selectedImage.filename}</p>
                            <p><strong>Uploaded At:</strong>{" "} {new Date(selectedImage.createdAt).toLocaleString()} </p>
                            <img src={`/images/${selectedImage.filename}`} alt={selectedImage.filename} style={{ width: "50%" }} />
                            <br />    <button style={{ backgroundColor: "red", color: "white", border: "none", padding: "10px 20px", cursor: "pointer", borderRadius: "4px", marginTop: "20px", }}
                                onClick={() => handleDelete(selectedImage._id)} >
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default MediaSection;
