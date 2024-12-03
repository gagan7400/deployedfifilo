const path = require("path");
const fs = require("fs");
// controllers/JobController.js
const servicesModel = require("../models/servicesModel");

const getService = async (req, res) => {
    try {
        const service = await servicesModel.find();
        res.send({ data: service });
    } catch (err) {
        res.status(400).send(err);
    }
};
const getPublishedService = async (req, res) => {
    try {
        const service = await servicesModel.findOne({ published: true });
        res.send({ data: service });
    } catch (err) {
        res.status(400).send(err);
    }
};
const publishService = async (req, res) => {
    try {
        const newPublishedId = req.params.id;
        await servicesModel.updateMany({ published: true }, { $set: { published: false } });
        const publishedData = await servicesModel.findByIdAndUpdate(newPublishedId, { $set: { published: true } }, { new: true });
        res.send({ data: publishedData });
    } catch (err) {
        res.status(400).send(err);
    }
};

const deleteServicePage = async (req, res) => {

    try {
        // Step 1: Find the service page by ID
        const servicepage = await servicesModel.findById(req.params.id);

        if (!servicepage) {
            return res.status(404).json({ success: false, message: 'service page not found' });
        }


        // Step 3: Delete the service page document
        await servicesModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: 'service page and images deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const createService = async (req, res) => {
    try {
        const heroSection = JSON.parse(req.body.heroSection);
        const { servicesCards } = req.body;
        const toolSection = JSON.parse(req.body.toolSection);
        // Handling image upload
        const toolsLogo = req.files['toolsLogo'] ? req.files['toolsLogo'].map(file => ({
            filename: file.filename, // Use filename from Multer
            path: file.path          // Use path from Multer
        })) : [];

        const serviceImgs = req.files['serviceImg'] ? req.files['serviceImg'].map(file => ({
            filename: file.filename, // Use filename from Multer
            path: file.path          // Use path from Multer
        })) : [];

        let newservicesCards = servicesCards.map((card, index) => ({
            ...card,
            serviceImg: { filename: serviceImgs[index].filename, path: serviceImgs[index].path }
        }));
        let data = new servicesModel({ heroSection, servicesCards: newservicesCards, toolSection: { heading: toolSection.heading, toolsLogo } });
        let result = await data.save();
        res.status(200).json({
            message: 'Form submitted successfully',
            data: result
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { heroSection, servicesCards, seoSection, toolSection } = req.body;

        // Find the existing servicepage by ID
        const servicePage = await servicesModel.findById(id);

        if (!servicePage) {
            return res.status(404).json({ success: false, message: "service page not found" });
        }

        // Update hero section
        if (heroSection) {
            servicePage.heroSection = {
                ...servicePage.heroSection,
                ...heroSection
            };
        }
        if (seoSection) {
            servicePage.seoSection = {
                ...servicePage.seoSection,
                ...seoSection
            };
        }
        // Update services card section (with image handling)
        if (servicesCards) {
            servicePage.servicesCards = servicesCards.map((card, index) => ({
                cardDescription: card.cardDescription || servicePage.servicesCards[index]?.cardDescription || [],
                cardList: card.cardList || servicePage.servicesCards[index]?.cardList || "",
                cardName: card.cardName || servicePage.servicesCards[index]?.cardName || "Default cardName",
                cardId: card.cardId || servicePage.servicesCards[index]?.cardId || "Default cardId",
            }));
        }
        //toolsection
        if (toolSection) {
            servicePage.toolSection = {
                ...servicePage.toolSection,
                heading: toolSection.heading || servicePage.toolSection?.heading || "Default cardName",
                toolsLogo: toolSection.toolsLogo || servicePage.toolSection?.toolsLogo || []
            };
        }

        // Update timestamps
        servicePage.updatedAt = Date.now();

        // Save the updated servicepage
        await servicePage.save();

        res.status(200).json({ success: true, data: servicePage });
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    createService,
    getService,
    publishService,
    getPublishedService,
    deleteServicePage,
    updateService
};