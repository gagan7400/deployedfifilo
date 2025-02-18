// models/privacy.js
const mongoose = require("mongoose");

const privacySchema = new mongoose.Schema({
    pageName: { type: String, default: "PrivacyPolicyPage" },
    heroSection: {
        heading: String,
    },
    content: String,
    published: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true })

let privacyModel = mongoose.model("privacy", privacySchema);
module.exports = privacyModel 