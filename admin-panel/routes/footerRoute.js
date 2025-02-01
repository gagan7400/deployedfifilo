const router = require("express").Router();

const { isAdmin, authenticate } = require("../auth/Auth");
const { createFooterPage, getFooterPage, updateFooterPage } = require("../controllers/footerController");

router.post('/createfooter', isAdmin, authenticate, createFooterPage);
router.get("/getfooterpage", getFooterPage);
router.put("/updatefooterpage/:id", isAdmin, authenticate, updateFooterPage);

module.exports = router;


