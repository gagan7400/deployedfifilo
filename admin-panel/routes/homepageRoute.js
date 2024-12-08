const router = require("express").Router();
const {
    createHomePage,
    getHomePage,
    getPublishedHomePage,
    publishHomePage,
    deleteHomePage,
    updateHomePage
} = require("../controllers/homepageController");
const path = require('path');
const auth = require("../auth/Auth");
const multer = require('multer');
const { isAdmin, authenticate } = require("../auth/Auth")

//home page routes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'newuploads/'); // The folder where the images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// File Filter for Images
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.jpeg' || ext === '.jpg' || ext === '.png' || ext === '.svg') {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'), false);
    }
};

// Max file size 5MB
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: fileFilter
});



router.post('/createhomepage', authenticate, isAdmin, upload.fields([{ name: 'serviceImgs', maxCount: 20 }]), createHomePage); // allowing up to 10 card images
router.put('/updatehomepage/:id', authenticate, isAdmin, updateHomePage);
router.get("/gethomepage", getHomePage);
router.put("/publishhomepage/:id", authenticate, isAdmin, publishHomePage);
router.get("/getpublishedhomepage", getPublishedHomePage);
router.delete("/deletehomepage/:id", authenticate, isAdmin, deleteHomePage);

module.exports = router;


