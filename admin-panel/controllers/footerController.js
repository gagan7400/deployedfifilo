const footerModel = require("../models/footerModel.js");

const createFooterPage = async (req, res) => {
    try {
        const { heading, redirectIcon, links, socialMedia, logoUrl, copyrightText } = req.body;
        const footersection = new footerModel({
            heading, redirectIcon, links, socialMedia, logoUrl, copyrightText
        });
        await footersection.save();
        res.status(201).json({ success: true, data: footersection });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getFooterPage = async (req, res) => {
    try {
        const result = await footerModel.findOne({ published: true });
        res.send({ data: result, success: true });
    } catch (err) {
        res.status(400).send({ message: err, success: false });
    }
};

const updateFooterPage = async (req, res) => {
    try {
        const publishedData = await footerModel.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.send({ data: publishedData, success: true });
    } catch (err) {
        res.status(400).send({ message: err, success: true });
    }
};

module.exports = {
    createFooterPage,
    getFooterPage,
    updateFooterPage

};