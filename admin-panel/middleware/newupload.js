
const multer = require("multer");

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./newuploads/"); // Save files to 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Create a unique filename
    },
});
const newupload = multer({ storage: storage });


module.exports = { newupload }