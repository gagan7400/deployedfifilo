const router = require("express").Router();
const {
    createAboutPage,
    getAboutPage,
    getPublishedAboutPage,
    publishAboutPage,
    deleteAboutPage,
    updateAboutPage

} = require("../controllers/aboutController");
const { isAdmin, authenticate } = require("../auth/Auth")

// //about page routes
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'newuploads/'); // The folder where the images will be stored
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// // File Filter for Images
// const fileFilter = (req, file, cb) => {
//     const ext = path.extname(file.originalname).toLowerCase();
//     if (ext === '.jpeg' || ext === '.jpg' || ext === '.png' || ext === '.svg') {
//         cb(null, true);
//     } else {
//         cb(new Error('Only images are allowed'), false);
//     }
// };

// // Max file size 5MB
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//     fileFilter: fileFilter
// });


router.get("/getpublishedaboutpage", getPublishedAboutPage);
router.get("/getaboutpage", getAboutPage);
router.post('/createaboutpage', authenticate, isAdmin, createAboutPage);
router.put('/updateaboutpage/:id', authenticate, isAdmin, updateAboutPage);
router.put("/publishaboutpage/:id", authenticate, isAdmin, publishAboutPage);
router.delete("/deleteaboutpage/:id", authenticate, isAdmin, deleteAboutPage);

module.exports = router;


