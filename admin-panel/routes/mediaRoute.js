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
    createdAt: { type: Date, default: Date.now },
});

const Image = mongoose.model("Image", imageSchema);

//home page routes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });
router.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const newImage = new Image({
            filePath: `/uploads/images/${req.file.filename}`,
            filename: req.file.filename,
            altText: req.body.altText || "",
        });
        await newImage.save();
        res.json({ success: true, image: newImage });
    } catch (error) {
        res.status(500).json({ error: "Failed to upload image" });
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

// Delete an image
router.delete("/:id", async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (image) {
            const filePath = `.${image.filePath}`;
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // Delete the file from the server
            }
            await Image.findByIdAndDelete(req.params.id) // Remove the database record
            res.json({ success: true, message: "Image Deleted Successfully" });
        } else {
            res.status(404).json({ message: "Image not found", success: false });
        }
    } catch (error) {
        res.status(500).json({ error: error, message: "Failed to delete image", success: false });
    }
});






module.exports = router