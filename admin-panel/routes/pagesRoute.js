const router = require("express").Router();

const { isAdmin, authenticate } = require("../auth/Auth");
const { getAllPages } = require("../controllers/pagesController");


router.get("/getallpages", getAllPages);


module.exports = router;


