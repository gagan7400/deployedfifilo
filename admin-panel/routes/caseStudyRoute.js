const router = require("express").Router();
const { createCaseStudy, getCaseStudy, getCaseStudyByName, updateCaseStudy, deleteCaseStudy,
    getCaseStudyPage,
    getPublishedCaseStudyPage,
    publishCaseStudyPage,
    deleteCaseStudyPage,
    createCaseStudyPage,
    updateCaseStudyPage,
} = require("../controllers/caseStudyController.js");
const { isAdmin, authenticate } = require("../auth/Auth")

router.post('/createcasestudy', authenticate, isAdmin, createCaseStudy);
router.get('/getcasestudy', getCaseStudy);
router.get('/getcasestudy/:name', getCaseStudyByName);
router.put('/updatecasestudy/:id', authenticate, isAdmin, updateCaseStudy);
router.delete('/deletecasestudy/:id', authenticate, isAdmin, deleteCaseStudy);


router.post('/createcasestudypage', authenticate, isAdmin, createCaseStudyPage);
router.put('/updatecasestudypage/:id', authenticate, isAdmin, updateCaseStudyPage);
router.put("/publishcasestudypage/:id", authenticate, isAdmin, publishCaseStudyPage);
router.delete("/deletecasestudypage/:id", authenticate, isAdmin, deleteCaseStudyPage);
router.get("/getpublishedcasestudypage", getPublishedCaseStudyPage);
router.get("/getcasestudypage", getCaseStudyPage);

module.exports = router;


