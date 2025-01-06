const router = require("express").Router();
const { createJob,
    getJobs,
    getJob,
    updateJob,
    deleteJob,
    searchJobs,
    createCareerPage,
    getCareerPage,
    getPublishedCareerPage,
    publishCareerPage,
    deleteCareerPage,
    updatecareerPage
} = require("../controllers/careerController");
const path = require('path');
const auth = require("../auth/Auth");
const multer = require('multer');
const { isAdmin, authenticate } = require("../auth/Auth")
//job routes 
router.get("/jobs/search", auth.authenticate, searchJobs);
router.post("/jobs", auth.authenticate, auth.isAdmin, createJob);
router.get("/jobs", getJobs);
router.get("/jobs/:id", auth.authenticate, getJob);
router.put("/job/:id", auth.authenticate, auth.isAdmin, updateJob);
router.delete("/jobs/:id", auth.authenticate, auth.isAdmin, deleteJob);


//career page routes
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


router.post('/createcareerpage', authenticate, isAdmin, upload.array('cardImgs', 10), createCareerPage); // allowing up to 10 card images
router.put('/updatecareerpage/:id', authenticate, isAdmin, updatecareerPage); // allowing up to 10 card images
router.put("/publishcareerpage/:id", authenticate, isAdmin, publishCareerPage);
router.delete("/deletecareerpage/:id", authenticate, isAdmin, deleteCareerPage);
router.get("/getpublishedcareerpage", getPublishedCareerPage);
router.get("/getcareerpage", getCareerPage);

module.exports = router;