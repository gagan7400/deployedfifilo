// controllers/JobController.js
const mongoose = require("mongoose");
const { jobModel, careerModel } = require("../models/careerModel");
const fs = require('fs');
const path = require('path');

const createJob = async (req, res) => {
    try {
        const job = new jobModel(req.body);
        await job.save();
        res.status(201).send(job);
    } catch (err) {
        res.status(400).send(err);
    }
};
// 66bc76a1f82902c06e85bb9e
const getJobs = async (req, res) => {
    try {
        const jobs = await jobModel.find();
        res.send({ data: jobs });
    } catch (err) {
        res.status(400).send(err);
    }
};

const getJob = async (req, res) => {
    try {
        const job = await jobModel.findById(req.params.id);
        if (!job) {
            res.status(404).send("Job not found");
        } else {
            res.send(job);
        }
    } catch (err) {
        res.status(400).send(err);
    }
};

const updateJob = async (req, res) => {
    try {
        const job = await jobModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!job) {
            res.status(404).send("Job not found");
        } else {
            res.send(job);
        }
    } catch (err) {
        res.status(400).send(err);
    }
};

const deleteJob = async (req, res) => {
    try {
        await jobModel.findByIdAndDelete(req.params.id);
        res.send("Job deleted successfully");
    } catch (err) {
        res.status(400).send(err);
    }
};

const searchJobs = async (req, res) => {
    try {
        let { token } = req.cookies
        const query = req.query;
        const jobs = await jobModel.find(query);
        res.send({ jobs, token });
    } catch (err) {
        res.status(400).send(err);
    }
};

const getCareerPage = async (req, res) => {

    try {
        const service = await careerModel.find();
        res.send({ data: service });
    } catch (err) {
        res.status(400).send(err);
    }
};
const getPublishedCareerPage = async (req, res) => {
    try {
        const service = await careerModel.findOne({ published: true });
        res.send({ data: service });
    } catch (err) {
        res.status(400).send(err);
    }
};
const publishCareerPage = async (req, res) => {
    try {
        const newPublishedId = req.params.id;
        await careerModel.updateMany({ published: true }, { $set: { published: false } });
        const publishedData = await careerModel.findByIdAndUpdate(newPublishedId, { $set: { published: true } }, { new: true });

        // const data = await careerModel.findByIdAndUpdate({ _id: '6708c75aa04b1851300ff564' }, req.body)
        // const service = await careerModel.findById('6708c75aa04b1851300ff564');
        res.send(publishedData);
    } catch (err) {
        res.status(400).send(err);
    }

};

const deleteCareerPage = async (req, res) => {
    try {
        // Step 1: Find the career page by ID
        const careerPage = await careerModel.findById(req.params.id);

        if (!careerPage) {
            return res.status(404).json({ success: false, message: 'Career page not found' });
        }

        // Step 2: Delete associated images
        if (careerPage.cardsSection && careerPage.cardsSection.length > 0) {
            careerPage.cardsSection.forEach((card) => {
                const imagePath = path.join(__dirname, '../', card.cardImg.path);
                // Check if file exists and delete
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath); // Delete the image file
                }
            });
        }

        // Step 3: Delete the career page document
        await careerModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: 'Career page and images deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const createCareerPage = async (req, res) => {
    try {
        const { heroSection, cardsSection, jobSection } = req.body;

        // Handling image upload
        const cardImgs = req.files.map(file => ({
            filename: file.filename, // Use filename from Multer
            path: file.path          // Use path from Multer
        }));

        const newCardsSection = cardsSection.map((card, index) => ({
            cardHeading: card.cardHeading,
            cardDescription: card.cardDescription,
            cardImg: cardImgs[index]
        }));

        const careerPage = new careerModel({
            heroSection,
            cardsSection: newCardsSection,
            jobSection
        });

        await careerPage.save();

        res.status(201).json({ success: true, data: careerPage });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const updatecareerPage = async (req, res) => {
    try {
        const { id } = req.params; // we're updating the career page by ID
        const { heroSection, seoSection, cardsSection, jobSection } = req.body;
        // Find the existing career page by ID
        const careerPage = await careerModel.findById(id);

        if (!careerPage) {
            return res.status(404).json({ success: false, message: "career page not found" });
        }

        // Update hero section
        if (heroSection) {
            careerPage.heroSection = {
                ...careerPage.heroSection,
                ...heroSection
            };
        }
        if (seoSection) {
            careerPage.seoSection = {
                ...careerPage.seoSection,
                ...seoSection
            };
        }
        if (jobSection) {
            careerPage.jobSection = {
                ...careerPage.jobSection,
                ...jobSection
            };
        }

        // Update members card section (with image handling)
        if (cardsSection) {
            careerPage.cardsSection = cardsSection.map((card, index) => ({
                cardHeading: card.cardHeading || careerPage.cardsSection[index]?.cardHeading,
                cardDescription: card.cardDescription || careerPage.cardsSection[index]?.cardDescription,
                cardImg: card.cardImg || careerPage.cardsSection[index]?.cardImg
            }));
        }

        // Update timestamps
        careerPage.updatedAt = Date.now();

        // Save the updated career page
        await careerPage.save();

        res.status(200).json({ success: true, data: careerPage });
    } catch (err) {
        console.error("Error updating career page:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};


module.exports = {
    createJob,
    getJobs,
    getJob,
    updateJob,
    deleteJob,
    searchJobs,
    createCareerPage,
    getCareerPage,
    getPublishedCareerPage,
    publishCareerPage,
    deleteCareerPage,
    updatecareerPage
};