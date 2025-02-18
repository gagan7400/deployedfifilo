// controllers/JobController.js
const privacyModel = require("../models/privacyModel.js");

const createprivacyPage = async (req, res) => {
    try {
        const { heroSection, content } = req.body;
        const privacyPage = new privacyModel({
            heroSection,
            content
        });

        await privacyPage.save();
        res.status(201).json({ success: true, data: privacyPage });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getprivacyPage = async (req, res) => {
    try {
        const result = await privacyModel.find();
        res.send({ data: result, success: true });
    } catch (err) {
        res.status(400).send({ message: err, success: false });
    }
};
const getPublishedprivacyPage = async (req, res) => {
    try {
        const result = await privacyModel.findOne({ published: true });
        res.send({ data: result, success: true });
    } catch (err) {
        res.status(400).send({ message: err, success: false });
    }
};
const publishprivacyPage = async (req, res) => {
    try {
        const newPublishedId = req.params.id;
        await privacyModel.updateMany({ published: true }, { $set: { published: false } });
        const publishedData = await privacyModel.findByIdAndUpdate(newPublishedId, { $set: { published: true } }, { new: true });
        res.send({ data: publishedData, success: true });
    } catch (err) {
        res.status(400).send({ data: null, message: err, success: false });
    }
};
const updateprivacyPage = async (req, res) => {
    try {
        const publishedData = await privacyModel.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.send({ data: publishedData, success: true });
    } catch (err) {
        res.status(400).send({ message: err, success: true });
    }
};
const deleteprivacyPage = async (req, res) => {
    try {
        const result = await privacyModel.findOneAndDelete({ _id: req.params.id });
        res.send({ data: result._id, message: "deleted successfully", success: true });
    } catch (err) {
        res.status(400).send({ message: err, success: false });
    }
};


module.exports = {
    createprivacyPage,
    getprivacyPage,
    getPublishedprivacyPage,
    publishprivacyPage,
    deleteprivacyPage,
    updateprivacyPage
};