const mongoose = require("mongoose");
const validator = require("validator")
const ContactusSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Email"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    phonenumber: {
        type: Number,
        required: [true, "Please Enter Your Password"],
    },
    message: {
        type: String,
        required: [true, "Please Enter Your Password"],
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

let contactPageSchema = new mongoose.Schema({
    heroSection: {
        heading: String,
        subHeading: String,
    },
    cardSection: {
        heading: String,
        contactlist: [{
            icon: { filename: String, path: String },
            value: String,
            name: String,
        }]
    },
    published: {
        type: Boolean,
        default: false
    },
    seoSection: {
        title: String,
        keywords: String,
        description: String,
        seoImg: { filename: String, path: String }
    },

}, { timestamps: true })
let Contactus = mongoose.model("contact", ContactusSchema)
let contactPageModel = mongoose.model("contactpage", contactPageSchema)
module.exports = { Contactus, contactPageModel };