// models/footer.js
const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema({
    heading: String,
    redirectIcon: {
        icon: { filename: String, path: String },
        url: String,
    },
    links: [{
        pageName: String,
        pageUrl: String,
        _id: false
    },],
    socialMedia: [{
        iconUrl: { filename: String, path: String },
        link: String,
        _id: false
    },],
    logoUrl: { filename: String, path: String },
    copyrightText: String,
    published: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

let footerModel = mongoose.model("footers", footerSchema);
module.exports = footerModel;

