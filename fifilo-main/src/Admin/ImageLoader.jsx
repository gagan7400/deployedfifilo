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
            {console.log(filedata)}
            <div class="uploading__card">
                <div class="upload__header">
                    <h6>Uploading 1 Item</h6>
                    <button class="btn-close" onClick={(e) => {
                        clearfun();
                        e.stopPropagation()
                    }}></button>
                </div>
                <div class="upload__body">
                    {filedata.map((card) => (
                        <div class="document__card">
                            <div class="icon">
                                <img src="/assets/imgs/media.svg" alt="" />
                            </div>
                            <div class="info">
                                <div class="top">
                                    <h6>{card.name}</h6>
                                    {uploadComplete && <img src="assets/img/check-circle.svg" alt="" />}
                                </div>
                                <p>{card.size}KB</p>

                                <div className="loader-bar" style={{ width: "100%", height: "12px", backgroundColor: "black", borderRadius: "8px", position: "relative", overflow: "hidden", }} >
                                    <div className="bar-fill" style={{ width: `${progress}%`, height: "100%", backgroundColor: "#00ff00", textAlign: "center", position: "absolute", left: 0, top: 0, }}></div>
                                    <div className="percentage-text" style={{ position: "absolute", width: "100%", textAlign: "center", fontSize: "10px", color: "white", lineHeight: "13px", fontWeight: "bold", zIndex: 1, }} >
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
