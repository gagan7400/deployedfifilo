// models/about.js
const mongoose = require("mongoose");

const homepageSchema = new mongoose.Schema({
    pageName: {
        type: String
    },
    heroSection: {
        heading: String,
        subHeading: String,
        heroButtons: {
            CTA1: { name: String, url: String },
            CTA2: { name: String, url: String },
            CTA3: { name: String, url: String },
        }
    },
    aboutSection: String,
    servicesSection: {
        preHeading: String,
        heading: String,
    },
    servicesCardSection: [{
        _id: false,
        servicePointList: [],
        heading: String,
        description: String,
        serviceImgs: { filename: String, path: String },
        buttonText: String,
        buttonUrl: String
    }],
    testimonialSection: {
        preHeading: String,
        heading: String,
    },
    reviewsSection: [{
        _id: false,
        company: String,
        description: String,
        clientName: String,
        clientImgs: { filename: String, path: String }
    }],
    clientSection: {
        subHeading: String,
        heading: String,
        clientLogos: [
            { filename: String, path: String }
        ]
    },
    seoSection: {
        title: String,
        keywords: String,
        description: String,
        seoImg: { filename: String, path: String }
    },
    published: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

let homepageModel = mongoose.model("homepages", homepageSchema);
module.exports = homepageModel 