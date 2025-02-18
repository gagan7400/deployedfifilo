
const router = require("express").Router();
const {
    createprivacyPage,
    getprivacyPage,
    getPublishedprivacyPage,
    publishprivacyPage,
    deleteprivacyPage,
    updateprivacyPage
} = require("../controllers/privacyController");

const { isAdmin, authenticate } = require("../auth/Auth")

router.post('/createprivacypage', authenticate, isAdmin, createprivacyPage);
router.get("/getprivacypage", getprivacyPage);
router.put("/publishprivacypage/:id", authenticate, isAdmin, publishprivacyPage);
router.put("/updateprivacypage/:id", authenticate, isAdmin, updateprivacyPage);
// router.delete("/deleteprivacypage/:id", authenticate, isAdmin, deleteprivacyPage);
router.get("/getpublishedprivacypage", getPublishedprivacyPage);

module.exports = router;


