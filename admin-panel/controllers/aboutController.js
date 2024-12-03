// controllers/JobController.js
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const aboutModel = require("../models/aboutModel.js");

const createAboutPage = async (req, res) => {
    try {
        const { heroSection, aboutSection, processSection, teamSection, membersCard } = req.body;
        const aboutPage = new aboutModel({ heroSection, aboutSection, processSection, teamSection, membersCard });
        await aboutPage.save();
        res.status(201).json({ success: true, data: aboutPage });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getAboutPage = async (req, res) => {
    try {
        const result = await aboutModel.find();
        res.send({ data: result, success: true });
    } catch (err) {
        res.status(400).send({ success: false, data: null, message: err.message });
    }
};
const getPublishedAboutPage = async (req, res) => {
    try {
        const result = await aboutModel.findOne({ published: true });
        res.send({ data: result, success: true });
    } catch (err) {
        res.status(400).send({ err, success: false });
    }
};
const publishAboutPage = async (req, res) => {
    try {
        const newPublishedId = req.params.id;
        await aboutModel.updateMany({ published: true }, { $set: { published: false } });
        const publishedData = await aboutModel.findByIdAndUpdate(newPublishedId, { $set: { published: true } }, { new: true });
        res.send({ data: publishedData, success: true });
    } catch (err) {
        res.status(400).send({ err, success: false });
    }
};

const deleteAboutPage = async (req, res) => {

    try {
        // Step 1: Find the About page by ID
        const aboutpage = await aboutModel.findById(req.params.id);

        if (!aboutpage) {
            return res.status(404).json({ success: false, message: 'About page not found' });
        }

        // Step 2: Delete associated images
        if (aboutpage.membersCard && aboutpage.membersCard.length > 0) {
            aboutpage.membersCard.forEach((card) => {
                const imagePath = path.join(__dirname, '../', card.memberImg.path);
                // Check if file exists and delete
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath); // Delete the image file
                }
            });

        }

        // Step 3: Delete the About page document
        await aboutModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: 'About page and images deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const updateAboutPage = async (req, res) => {
    try {
        const { id } = req.params; // We're updating the about page by ID
        const { heroSection, aboutSection, seoSection, processSection, teamSection, membersCard } = req.body;

        // Find the existing about page by ID
        const aboutPage = await aboutModel.findById(id);

        if (!aboutPage) {
            return res.status(404).json({ success: false, message: "About page not found" });
        }

        // Update hero section
        if (heroSection) {
            aboutPage.heroSection = {
                ...aboutPage.heroSection,
                ...heroSection
            };
        }

        if (seoSection) {
            aboutPage.seoSection = {
                ...aboutPage.seoSection,
                ...seoSection
            };
        }

        // Update about section
        if (aboutSection) {
            aboutPage.aboutSection = {
                ...aboutPage.aboutSection,
                ...aboutSection
            };
        }

        // Update process section
        if (processSection) {
            aboutPage.processSection = {
                ...aboutPage.processSection,
                ...processSection
            };
        }

        // Update team section
        if (teamSection) {
            aboutPage.teamSection = {
                ...aboutPage.teamSection,
                ...teamSection
            };
        }

        if (membersCard) {
            aboutPage.membersCard = membersCard.map((card, index) => ({
                name: card.name || aboutPage.membersCard[index]?.name,
                designation: card.designation || aboutPage.membersCard[index]?.designation,
                linkedinUrl: card.linkedinUrl || aboutPage.membersCard[index]?.linkedinUrl,
                memberImg: card.memberImg || aboutPage.membersCard[index]?.memberImg
            }));
        }
        // Update the updatedAt timestamp
        aboutPage.updatedAt = Date.now();

        // Save the updated about page
        await aboutPage.save();

        res.status(200).json({ success: true, data: aboutPage });
    } catch (err) {
        console.error("Error updating about page:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    createAboutPage,
    getAboutPage,
    getPublishedAboutPage,
    publishAboutPage,
    deleteAboutPage,
    updateAboutPage
};

