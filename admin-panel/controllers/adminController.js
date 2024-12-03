// const { adminModel } = require("../models/adminModel")

// const adminController = async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return next(new ErrorHander("Please Enter Email & Password", 400));
//     }

//     const user = await adminModel.findOne({ email }).select("+password");

//     if (!user) {
//         return next(new ErrorHander("Invalid email or password", 401));
//     }

//     const isValid = await admin.comparePassword(password)

//     if (!isValid) {
//         return next(new ErrorHander("Invalid email or password", 401));
//     }
//     const token = admin.generateAuthToken();
//     res.send({ token });
// }

// module.exports = { adminController }