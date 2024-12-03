// models/faq.js
const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
    heroSection: {
        heading: String,
        subHeading: String
    },
    faqSection: [{
        _id: false,
        question: String,
        answer: String,
    }],
    published: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true })

let faqModel = mongoose.model("faqs", faqSchema);
module.exports = faqModel 