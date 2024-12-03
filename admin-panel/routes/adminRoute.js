const express = require('express');
const router = express.Router();
const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Custom Error Handler
class CustomErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static alreadyExist(message) {
    return new CustomErrorHandler(409, message);
  }

  static badRequest(message) {
    return new CustomErrorHandler(400, message);
  }

  static unAuthorized(message = "Unauthorized") {
    return new CustomErrorHandler(401, message);
  }

  static notFound(message = "404 Not Found") {
    return new CustomErrorHandler(404, message);
  }

  static serverError(
    message = "Your request could not be processed. Please try again."
  ) {
    return new CustomErrorHandler(500, message);
  }
}

// Authenticate Function
const authenticate = async (email, password, next) => {
  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin) {
    return next(CustomErrorHandler.badRequest("This account does not exist."));
  }
  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) {
    return next(CustomErrorHandler.badRequest("Invalid credentials."));
  }
  return admin;
};

// Generate Token Function
const generateToken = (admin) => {
  const token = jwt.sign({ adminId: admin._id }, process.env.SECRET_KEY, {
    expiresIn: '4h',
  });
  return token;
};

// Register Admin Function
const registerAdmin = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new Admin({ email, password: hashedPassword });
  await admin.save();
  return admin;
};

// Login Route
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(CustomErrorHandler.badRequest("Email and Password are required."));
    }

    const admin = await authenticate(email, password, next);
    if (admin) {
      const token = generateToken(admin);
      res
        .cookie('token', token, { httpOnly: true })
        .json({ success: true, token, message: 'Logged in successfully' });
    }
  } catch (error) {
    return next(error);
  }
});

// Global Error Handling Middleware
router.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, message });
});

module.exports = router;

// // routes/authRoutes.js
// const express = require('express');
// const router = express.Router();
// const Admin = require('../models/adminModel');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const CustomErrorHandler = require('../Errorhandler/CustomErrors')
// const authenticate = async (email, password, next) => {
//   const admin = await Admin.findOne({ email }).select('+password');
//   if (!admin) {
//     return next(CustomErrorHandler.badRequest("This account does not exits."))
//   }
//   const isValid = await bcrypt.compare(password, admin.password);
//   if (!isValid) {
//     return next(CustomErrorHandler.badRequest("This account does not valid."))
//   }
//   return admin;
// };

// const generateToken = (admin) => {
//   const token = jwt.sign({ adminId: admin._id }, process.env.SECRET_KEY, {
//     expiresIn: '4h'
//   });
//   return token;
// };


// const registerAdmin = async (email, password) => {
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const admin = new Admin({ email, password: hashedPassword });
//   await admin.save();
//   return admin;
// };


// router.post('/login', async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const admin = await authenticate(email, password, next);
//     if (admin) {
//       const token = generateToken(admin);
//       res.cookie('token', token, { httpOnly: true }).json({ success: true, token, message: 'Logged in successfully' });
//     }
//   } catch (error) {
//     return next(error);
//   }
// });




// module.exports = router;