const router = require("express").Router();
const path = require('path');
const express = require("express");
const mongoose = require("mongoose");
const multer = require('multer');
const fs = require('fs');
const { isAdmin, authenticate } = require("../auth/Auth")
// Image Schema  

const imageSchema = new mongoose.Schema({
    filePath: String,
    filename: String,
    altText: String,
    size: String,
    createdAt: { type: Date, default: Date.now },
});

const Image = mongoose.model("Image", imageSchema);

//home page routes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../uploads/images");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        let finalName = file.originalname;

        // Check if a file with the same name already exists
        let counter = 1;
        while (fs.existsSync(path.join(__dirname, "../uploads/images", finalName))) {
            finalName = `${name}-${counter}${ext}`;
            counter++;
        }
        cb(null, finalName);
    },
});


const upload = multer({ storage: storage });
router.post("/upload", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: "No file uploaded" });
        }
        const newImage = new Image({
            filePath: `/uploads/images/${req.file.filename}`,
            filename: req.file.filename,
            altText: req.body.altText || "",
            size: Number(req.file.size) * 0.001, // File size in KB
        });
        await newImage.save();


        res.json({ success: true, image: newImage });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ success: false, error: "Failed to upload image" });
    }
});

// Fetch all images
router.get("/", async (req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch images" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: "Image not found", success: false });
        }

        const filePath = path.join(__dirname, "..", image.filePath);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await Image.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Image deleted successfully" });
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ error: "Failed to delete image", success: false });
    }
});







module.exports = router