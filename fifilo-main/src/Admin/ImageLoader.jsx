import { useState, useEffect } from "react";
import './ImageLoader.css'
const ImageLoader = ({ name, size, uploadComplete, setUploadComplete, clearfun, setFiledata, filedata }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    setUploadComplete(true)
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 10);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    if (uploadComplete) {
        setTimeout(() => {
            clearfun()
        }, 5000);
    }

    return (
        <>
            <div class="uploading__card">
                <div class="upload__header">
                    <h6>Uploading 1 Item</h6>
                    <button class="btn-close" onClick={(e) => {
                        clearfun();
                        e.stopPropagation()
                    }}></button>
                </div>
                <div class="upload__body">
                    {filedata && filedata.map((card) => (
                        <div class="document__card">
                            <div class="icon">
                                <img src="/assets/imgs/media.svg" alt="" />
                            </div>
                            <div class="info">
                                <div class="top">
                                    <h6>{card.name}</h6>
                                    {uploadComplete && <img src="assets/img/check-circle.svg" alt="" />}
                                </div>
                                <p>{Math.floor(card.size / 1000)}KB</p>

                                <div className="loader-bar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", }}>
                                    <div className="loader-fill" style={{ width: "100%", height: "10px", backgroundColor: "#667085", borderRadius: "8px", position: "relative", overflow: "hidden", }} >
                                        <div className="bar-fill" style={{ width: `${progress}%`, height: "100%", backgroundColor: "#00ff00", textAlign: "center", }}></div>
                                    </div>
                                    <div className="percentage-text" style={{ textAlign: "center", fontSize: "10px", color: "#000", lineHeight: "1", fontWeight: "5000", zIndex: 1, }} >
                                        {progress}%   </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ImageLoader;
