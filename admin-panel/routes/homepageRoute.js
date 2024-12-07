const router = require("express").Router();
const { createHomePage, getHomePage,
    getPublishedHomePage,
    publishHomePage,
    deleteHomePage,
    updateHomePage
} = require("../controllers/homepageController");
const path = require('path');
const auth = require("../auth/Auth");

const { isAdmin, authenticate } = require("../auth/Auth")



router.post('/createhomepage', authenticate, isAdmin, createHomePage); // allowing up to 10 card images
router.put('/updatehomepage/:id', authenticate, isAdmin, updateHomePage);
router.get("/gethomepage", getHomePage);
router.put("/publishhomepage/:id", authenticate, isAdmin, publishHomePage);
router.get("/getpublishedhomepage", getPublishedHomePage);
router.delete("/deletehomepage/:id", authenticate, isAdmin, deleteHomePage);

module.exports = router;


