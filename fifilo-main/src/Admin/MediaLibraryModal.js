import React, { useState } from "react";
import MediaLibrary from "./MediaLibrary";
import ImageUpload from "./ImageUpload";
import axios from "axios";


const MediaLibraryModal = ({ isOpen, onClose, onSelectImage }) => {
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
    if (!isOpen) return null;
    return (
        <>
            <div className="modal mediaLibrary" style={{ backgroundColor: "rgb(0,0,0,0.5)", display: "block", position: "fixed", top: 0, left: 0, zIndex: 1000, width: "100%", height: "100%", }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Featured Image</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose} ></button>
                        </div>
                        <div className="modal-body">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="upload-file-tab" data-bs-toggle="tab" data-bs-target="#upload-file" type="button" role="tab" aria-controls="upload-file"
                                        aria-selected="true">Upload File</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link  active" id="media-tab" data-bs-toggle="tab" data-bs-target="#media" type="button" role="tab" aria-controls="media" aria-selected="false">Media
                                        Library</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade" id="upload-file" role="tabpanel" aria-labelledby="upload-file-tab">
                                    <ImageUpload imageUploaded={imageUploaded} setImageUplaoded={setImageUplaoded} />
                                </div>
                                <div className="tab-pane fade  show active" id="media" role="tabpanel" aria-labelledby="media-tab">
                                    <div className="row gx-0">
                                        <div className="col-lg-9 col-md-9">
                                            <div className="attachments-wrapper">
                                                <MediaLibrary onSelectImage={onSelectImage} imageUploaded={imageUploaded}
                                                    showModal={showModal}
                                                    setShowModal={setShowModal}
                                                    selectedImage={selectedImage}
                                                    setSelectedImage={setSelectedImage}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3">
                                            {showModal && selectedImage && (
                                                <div style={{ width: "100%", height: "70%", display: "flex", justifyContent: "center", alignItems: "center", }}>
                                                    <div style={{ padding: "20px", borderRadius: "8px", width: "400px", position: "relative", textAlign: "center", }} >
                                                        <span style={{ position: "absolute", top: "10px", right: "15px", fontSize: "24px", cursor: "pointer", }} onClick={closeModal} > &times; </span>
                                                        <h3>Image Details</h3>
                                                        <p> <strong>Filename:</strong> {selectedImage.filename}</p>
                                                        <p><strong>Uploaded At:</strong>{" "} {new Date(selectedImage.createdAt).toLocaleString()} </p>
                                                        <img src={`/images/${selectedImage.filename}`} alt={selectedImage.filename} style={{ width: "100%" }} />
                                                        <button style={{ backgroundColor: "red", color: "white", border: "none", padding: "10px 20px", cursor: "pointer", borderRadius: "4px", marginTop: "20px", }}
                                                            onClick={() => handleDelete(selectedImage._id)} >
                                                            Delete
                                                        </button>
                                                        <button style={{ backgroundColor: "green", color: "white", border: "none", padding: "10px 20px", cursor: "pointer", borderRadius: "4px", marginTop: "20px", }}
                                                            onClick={() => onSelectImage(selectedImage)} >
                                                            Select
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn__update">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MediaLibraryModal;
