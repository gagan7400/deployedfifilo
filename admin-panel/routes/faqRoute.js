const router = require("express").Router();
const {
    createfaqPage,
    getfaqPage,
    getPublishedfaqPage,
    publishfaqPage,
    deletefaqPage,
    updatefaqPage
} = require("../controllers/faqController");

const { isAdmin, authenticate } = require("../auth/Auth")

router.post('/createfaqpage', authenticate, isAdmin, createfaqPage);
router.get("/getfaqpage", getfaqPage);
router.put("/publishfaqpage/:id", authenticate, isAdmin, publishfaqPage);
router.put("/updatefaqpage/:id", authenticate, isAdmin, updatefaqPage);
router.delete("/deletefaqpage/:id", authenticate, isAdmin, deletefaqPage);
router.get("/getpublishedfaqpage", getPublishedfaqPage);

module.exports = router;


