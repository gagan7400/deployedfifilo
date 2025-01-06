// models/Job.js
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["UI-UX", "Development", "Sales", "Marketing", "HR", "Finance", "Other"],
        required: true
    },
    yearsOfExperience: {
        type: String,
        required: true,
        default: 1

    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        enum: ["Remote", "On-site", "WFH", "Freelance", "Contract", "Full-time", "Part-time"],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    responsibilities: {
        type: String,
    }
    ,
    qualifications: {
        type: String,
    }
    , jobStatus: {
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