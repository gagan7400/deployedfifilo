const mongoose = require("mongoose");
const validator = require("validator")
const adminSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    },


});
adminSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

adminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
};

let Admin = mongoose.model("admin", adminSchema)
module.exports = Admin