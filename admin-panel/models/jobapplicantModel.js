const mongoose = require("mongoose");
const validator = require("validator")
const jobapplicantSchema = new mongoose.Schema({
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
        required: [true, "Please Enter Your number"],
    },
    date: {
        type: String,
        default: Date.now()
    },
    resume: {
        type: String
    }
});

let jobApplicant = mongoose.model("jobapplicant", jobapplicantSchema)
module.exports = { jobApplicant };