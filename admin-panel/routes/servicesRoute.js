const router = require("express").Router();
const { createService, getService, publishService, getPublishedService, deleteServicePage, updateService } = require("../controllers/servicesController");
const { isAdmin, authenticate } = require("../auth/Auth")

router.post("/createservice", authenticate, isAdmin, createService);
router.put("/publishservice/:id", authenticate, isAdmin, publishService);
router.put("/updateservicepage/:id", authenticate, isAdmin, updateService);
router.get("/getpublishedservice", getPublishedService);
router.get("/getservice", getService);
router.delete("/deleteservice/:id", authenticate, isAdmin, deleteServicePage);

module.exports = router;