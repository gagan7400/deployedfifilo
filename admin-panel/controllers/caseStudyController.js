// controllers/JobController.js
const mongoose = require("mongoose");
const { caseStudyModel, caseStudyPageModel } = require("../models/caseStudyModel.js");

const createCaseStudy = async (req, res) => {
    try {
        const { heroSection, overviewSection, designProcessSection, sketches, styleGuideSection, typographyData, impactAndImprovement, howFifiloDesignsDrives, updatedLook, fullWidthImg } = req.body;
        const caseStudy = new caseStudyModel({ heroSection, overviewSection, designProcessSection, sketches, styleGuideSection, impactAndImprovement, typographyData, howFifiloDesignsDrives, updatedLook, fullWidthImg });
        await caseStudy.save();
        res.status(201).json({ success: true, data: caseStudy });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getCaseStudy = async (req, res) => {
    try {
        const result = await caseStudyModel.find();
        res.send({ success: true, data: result });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
const getCaseStudyByName = async (req, res) => {
    try {
        let { name } = req.params;
        const result = await caseStudyModel.findOne({ "heroSection.casestudyName": name });
        res.send({ success: true, data: result });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

const deleteCaseStudy = async (req, res) => {

    try {
        const casestudypage = await caseStudyModel.findById(req.params.id);

        if (!casestudypage) {
            return res.status(404).json({ success: false, message: 'casestudy not found' });
        }
        await caseStudyModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: 'casestudy deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const updateCaseStudy = async (req, res) => {
    try {
        const { id } = req.params; // We're updating the about  by ID
        const { heroSection, overviewSection, designProcessSection, sketches, styleGuideSection, typographyData, impactAndImprovement, howFifiloDesignsDrives, updatedLook, fullWidthImg } = req.body;

        const casestudy = await caseStudyModel.findById(id);

        if (!casestudy) {
            return res.status(404).json({ success: false, message: "casestudy not found" });
        }
        if (heroSection) {
            casestudy.heroSection = {
                ...casestudy.heroSection,
                ...heroSection
            };
        }

        if (overviewSection) {
            casestudy.overviewSection = {
                ...casestudy.overviewSection,
                ...overviewSection
            };
        }
        if (designProcessSection) {
            casestudy.designProcessSection = {
                ...casestudy.designProcessSection,
                ...designProcessSection
            };
        }
        if (sketches) {
            casestudy.sketches = {
                ...casestudy.sketches,
                ...sketches
            };
        }
        if (styleGuideSection) {
            casestudy.styleGuideSection = {
                ...casestudy.styleGuideSection,
                ...styleGuideSection
            };
        }
        if (typographyData) {
            casestudy.typographyData = {
                ...casestudy.typographyData,
                ...typographyData
            };
        }
        if (howFifiloDesignsDrives) {
            casestudy.howFifiloDesignsDrives = {
                ...casestudy.howFifiloDesignsDrives,
                ...howFifiloDesignsDrives
            };
        }
        if (impactAndImprovement) {
            casestudy.impactAndImprovement = {
                ...casestudy.impactAndImprovement,
                ...impactAndImprovement
            };
        }
        if (updatedLook) {
            casestudy.updatedLook = {
                ...casestudy.updatedLook,
                ...updatedLook
            };
        }
        if (fullWidthImg) {
            casestudy.fullWidthImg = {
                ...casestudy.fullWidthImg,
                ...fullWidthImg
            };
        }
        casestudy.updatedAt = Date.now();

        await casestudy.save();

        res.status(200).json({ success: true, data: casestudy });
    } catch (err) {
        console.error("Error updating casestudy:", err);
        res.status(500).json({ success: false, message: err });
    }
};

const getCaseStudyPage = async (req, res) => {

    try {
        const service = await caseStudyPageModel.find();
        res.send({ data: service });
    } catch (err) {
        res.status(400).send(err);
    }
};
const getPublishedCaseStudyPage = async (req, res) => {
    try {
        const service = await caseStudyPageModel.findOne({ published: true });
        res.send({ data: service });
    } catch (err) {
        res.status(400).send(err);
    }
};
const publishCaseStudyPage = async (req, res) => {
    try {
        const newPublishedId = req.params.id;
        await caseStudyPageModel.updateMany({ published: true }, { $set: { published: false } });
        const publishedData = await caseStudyPageModel.findByIdAndUpdate(newPublishedId, { $set: { published: true } }, { new: true });
        res.send(publishedData);
    } catch (err) {
        res.status(400).send(err);
    }

};

const deleteCaseStudyPage = async (req, res) => {
    try {
        // Step 1: Find the CaseStudy page by ID
        const CaseStudyPage = await caseStudyPageModel.findById(req.params.id);

        if (!CaseStudyPage) {
            return res.status(404).json({ success: false, message: 'CaseStudy page not found' });
        }

        // // Step 2: Delete associated images
        // if (CaseStudyPage.cardsSection && CaseStudyPage.cardsSection.length > 0) {
        //     CaseStudyPage.cardsSection.forEach((card) => {
        //         const imagePath = path.join(__dirname, '../', card.cardImg.path);
        //         // Check if file exists and delete
        //         if (fs.existsSync(imagePath)) {
        //             fs.unlinkSync(imagePath); // Delete the image file
        //         }
        //     });
        // }

        // Step 3: Delete the CaseStudy page document
        await caseStudyPageModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: 'CaseStudy page and images deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const createCaseStudyPage = async (req, res) => {
    try {
        const { heroSection, seoSection, } = req.body;

        let CaseStudyPage = new caseStudyPageModel({ heroSection, seoSection })
        await CaseStudyPage.save();

        res.status(201).json({ success: true, data: CaseStudyPage });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const updateCaseStudyPage = async (req, res) => {
    try {
        const { id } = req.params; // we're updating the CaseStudy page by ID
        const { heroSection, seoSection, } = req.body;
        // Find the existing CaseStudy page by ID
        const CaseStudyPage = await caseStudyPageModel.findById(id);

        if (!CaseStudyPage) {
            return res.status(404).json({ success: false, message: "CaseStudy page not found" });
        }

        // Update hero section
        if (heroSection) {
            CaseStudyPage.heroSection = {
                ...CaseStudyPage.heroSection,
                ...heroSection
            };
        }
        if (seoSection) {
            CaseStudyPage.seoSection = {
                ...CaseStudyPage.seoSection,
                ...seoSection
            };
        }

        // Update timestamps
        CaseStudyPage.updatedAt = Date.now();

        // Save the updated CaseStudy page
        await CaseStudyPage.save();

        res.status(200).json({ success: true, data: CaseStudyPage });
    } catch (err) {
        console.error("Error updating CaseStudy page:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};



module.exports = {
    createCaseStudy,
    getCaseStudy,
    updateCaseStudy,
    deleteCaseStudy,
    getCaseStudyByName,
    getCaseStudyPage,
    getPublishedCaseStudyPage,
    publishCaseStudyPage,
    deleteCaseStudyPage,
    createCaseStudyPage,
    updateCaseStudyPage,
};

