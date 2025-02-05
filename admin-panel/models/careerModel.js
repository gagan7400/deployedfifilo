// models/Job.js
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
    },
    category: {
        type: String,
    },
    experience: {
        type: String,
        default: 1
    },
    location: {
        type: String,
    },
    jobType: {
        type: String,
    },
    aboutUs: {
        type: String
    },
    aboutRole: {
        type: String
    },
    responsibilities: {
        type: String,
    },
    qualifications: {
        type: String,
    },
    requirements: {
        type: String
    },
    jobStatus: {
        type: String,
        default: "Active"
    }
}, { timestamps: true });

const careerpageSchema = new mongoose.Schema({
    pageName: {
        type: String
    },
    heroSection: {
        heading: String,
        subHeading: String,
        heroButtons: {
            CTA1: { url: String, name: String }
        }
    },
    cardsSection: [
        {
            _id: false,
            cardHeading: String,
            cardDescription: String,
            cardImg: {
                filename: {
                    type: String,
                    required: true,
                },
                path: {
                    type: String,
                    required: true,
                }
            }
        }
    ],
    jobSection: {
        heading: String,
        subHeading: String
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
let jobModel = mongoose.model("Job", jobSchema);
let careerModel = mongoose.model("careerpages", careerpageSchema);
module.exports = { jobModel, careerModel };