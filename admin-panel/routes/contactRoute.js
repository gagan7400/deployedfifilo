const router = require("express").Router();
const { authenticate, isAdmin } = require("../auth/Auth");
const { contactusController, jobapplicantController, createContactPage, publishContactPage, getPublishedContactPage, getContactPage, deleteContactPage, updateContactPage } = require("../controllers/contactController");
const { upload } = require("../middleware/upload")
router.post("/", contactusController);
router.post("/jobapplicant", upload.single("resume"), jobapplicantController);


// contactpage routes  

router.post('/createcontactpage', authenticate, isAdmin, createContactPage); // allowing up to 10 card images
router.put("/publishcontactpage/:id", authenticate, isAdmin, publishContactPage);
router.put("/updatecontactpage/:id", authenticate, isAdmin, updateContactPage);
router.delete("/deletecontactpage/:id", authenticate, isAdmin, deleteContactPage);
router.get("/getpublishedcontactpage", getPublishedContactPage);
router.get("/getcontactpage", getContactPage);


module.exports = router;

