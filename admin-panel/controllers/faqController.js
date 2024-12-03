// controllers/JobController.js
const faqModel = require("../models/faqModel.js");

const createfaqPage = async (req, res) => {
    try {
        const { heroSection, faqSection } = req.body;
        const faqPage = new faqModel({
            heroSection,
            faqSection
        });

        await faqPage.save();
        res.status(201).json({ success: true, data: faqPage });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getfaqPage = async (req, res) => {
    try {
        const result = await faqModel.find();
        res.send({ data: result, success: true });
    } catch (err) {
        res.status(400).send({ message: err, success: false });
    }
};
const getPublishedfaqPage = async (req, res) => {
    try {
        const result = await faqModel.findOne({ published: true });
        res.send({ data: result, success: true });
    } catch (err) {
        res.status(400).send({ message: err, success: false });
    }
};
const publishfaqPage = async (req, res) => {
    try {
        const newPublishedId = req.params.id;
        await faqModel.updateMany({ published: true }, { $set: { published: false } });
        const publishedData = await faqModel.findByIdAndUpdate(newPublishedId, { $set: { published: true } }, { new: true });
        res.send({ data: publishedData, success: true });
    } catch (err) {
        res.status(400).send({ data: null, message: err, success: false });
    }
};
const updatefaqPage = async (req, res) => {
    try {
        const publishedData = await faqModel.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.send({ data: publishedData, success: true });
    } catch (err) {
        res.status(400).send({ message: err, success: true });
    }
};
const deletefaqPage = async (req, res) => {
    try {
        const result = await faqModel.findOneAndDelete({ _id: req.params.id });
        res.send({ data: result._id, message: "deleted successfully", success: true });
    } catch (err) {
        res.status(400).send({ message: err, success: false });
    }
};


module.exports = {
    createfaqPage,
    getfaqPage,
    getPublishedfaqPage,
    publishfaqPage,
    deletefaqPage,
    updatefaqPage
};