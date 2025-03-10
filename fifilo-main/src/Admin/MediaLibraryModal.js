import React, { useRef, useState, useEffect } from "react";
import MediaLibrary from "./MediaLibrary";
import ImageUpload from "./ImageUpload";
import axios from "axios";


const MediaLibraryModal = ({ isOpen, onClose, onSelectImage }) => {
    const [imageUploaded, setImageUplaoded] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [searchImage, setSearchImage] = useState("")
    const inputRef = useRef(null);
    const handleDelete = async (imageId) => {
        if (window.confirm("Are You Sure You Want to Delete This?")) {
            try {
                const { data } = await axios.delete(`/api/media/${imageId}`);
                if (data.success) {
                      setImageUplaoded((prev) => prev === "deleted" ? "deleted-again" : "deleted");
                    setSelectedImage(null); // Clear the selected image
                } else {
                    console.error("Failed to delete image:", data);
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
    const handleCopy = () => {
        if (inputRef.current) {
            // Select the text
            inputRef.current.select();
            inputRef.current.setSelectionRange(0, 99999); // For mobile compatibility

            // Copy the text to the clipboard
            navigator.clipboard.writeText(inputRef.current.value)
                .then(() => {
                    setMessage(true)
                })
                .catch((err) => {
                    console.error("Failed to copy text: ", err);
                });
        }
    };
    let searchImageHandler = (event) => {
        setSearchImage(event.target.value);
    }
    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 3000)
    }, [message]);
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    if (!isOpen) return null;
    return (
        <>
            <div className="modal mediaLibrary" style={{ backgroundColor: "rgb(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", position: "fixed", top: 0, left: 0, zIndex: 1000, width: "100%", height: "100%", }}>
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
                                                <div className="search__container">
                                                    <label>Search Media</label>
                                                    <input type="text" className="form-control" onChange={searchImageHandler} />
                                                </div>
                                                <MediaLibrary onSelectImage={onSelectImage} imageUploaded={imageUploaded}
                                                    showModal={showModal}
                                                    setShowModal={setShowModal}
                                                    selectedImage={selectedImage}
                                                    setSelectedImage={setSelectedImage}
                                                    setSearchImage={setSearchImage}
                                                    searchImage={searchImage}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3">
                                            {showModal && selectedImage && (
                                                <div className="attachment__detailsInr">
                                                    <div className="attachment__details">
                                                        <h6>Attachment  Details</h6>
                                                        <div className="upload__img">
                                                            <img src={`/images/${selectedImage.filename}`} alt={selectedImage.filename} />
                                                        </div>
                                                        <div className="file__details">
                                                            <p><span>{selectedImage.filename}</span></p>
                                                            <p>{selectedImage.size ? selectedImage.size : 100} KB</p>
                                                            <p>{new Date(selectedImage.createdAt).toDateString()}</p>
                                                            <button className="btn" onClick={() => handleDelete(selectedImage._id)}>Delete Permanently</button>
                                                        </div>
                                                        <div className="input__inr">
                                                            <input className="form-control" ref={inputRef} value={`${baseUrl}/images/${selectedImage.filename}`} />
                                                        </div>
                                                        <div className="position-relative">
                                                            <button className="btn btn__copy" onClick={handleCopy}>Copy to clipboard </button>
                                                            {message && <p className="position-absolute">Copied!</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn__update" onClick={() => onSelectImage(selectedImage)}>Set Feautured Image</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MediaLibraryModal;

