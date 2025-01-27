// models/blogpage.js
const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
    blogTitle: String,
    blogUrl: String,
    uploadedBy: String,
    approxTime: String,
    heading: String,
    blogCategory: String,
    bannerImg: { filename: String, path: String },
    blogContent: String,
    tableOfContent: [
        { heading: String, id: String, _id: false },
    ],
    seoSection: {
        title: String,
        keywords: String,
        description: String,
        seoImg: { filename: String, path: String }
    },
}, { timestamps: true })

let blogsModel = mongoose.model("blogs", blogsSchema);
module.exports = { blogsModel };

