// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require('../models/adminModel')
const authenticate = async (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("Access denied. No token provided.");
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = await User.findById(decoded.adminId);
        next();
    } catch (err) {
        res.status(400).send("Invalid token.");
    }
};

const isAdmin = async (req, res, next) => {
    if (!(req.user._doc.role == "admin")) return res.status(403).send("Access denied. You are not an admin.");
    next();
};

module.exports = { authenticate, isAdmin };