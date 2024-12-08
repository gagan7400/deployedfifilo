const router = require("express").Router();
const { createService, getService, publishService, getPublishedService, deleteServicePage, updateService } = require("../controllers/servicesController");
const { isAdmin, authenticate } = require("../auth/Auth")
const multer = require("multer");
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './newuploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir); // Files will be stored in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// File type filter for images
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|svg/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }
};

// Multer upload configuration
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
        files: 100
    }, // 5MB size limit
    fileFilter: fileFilter
});
router.post("/createservice", authenticate, isAdmin, upload.fields([
    { name: 'toolsLogo', maxCount: 20 },
    { name: 'serviceImg', maxCount: 20 }
]), createService);
router.put("/publishservice/:id", authenticate, isAdmin, publishService);
router.put("/updateservicepage/:id" , authenticate, isAdmin, updateService);
router.get("/getpublishedservice", getPublishedService);
router.get("/getservice", getService);
router.delete("/deleteservice/:id", authenticate, isAdmin, deleteServicePage);

module.exports = router;