// controllers/JobController.js
const path = require("path");
const fs = require("fs");
const homepageModel = require("../models/HomepageModel.js");
const createHomePage = async (req, res) => {
    try {
        const { heroSection, servicesSection, aboutSection, servicesCardSection, testimonialSection, reviewsSection } = req.body;

        // Handling image upload
        const serviceImgs = req.files['serviceImgs'] ? req.files['serviceImgs'].map(file => ({
            filename: file.filename, // Use filename from Multer
            path: file.path          // Use path from Multer
        })) : [];

        //serivcecard section
        const newServicesCardSection = servicesCardSection.map((card, index) => ({
            servicePointList: card.servicePointList,
            heading: card.heading,
            description: card.description,
            serviceImgs: { filename: serviceImgs[index].filename, path: serviceImgs[index].path }
        }));
        // review section
        const newreviewsSection = reviewsSection.map((card, index) => ({
            company: card.company,
            description: card.description,
            clientName: card.clientName,
            clientImgs: card.clientImgs
        }))

        const homePage = new homepageModel({
            heroSection,
            servicesSection,
            aboutSection,
            servicesCardSection: newServicesCardSection,
            testimonialSection,
            reviewsSection: newreviewsSection,
        });

        await homePage.save();
        res.status(201).json({ success: true, data: homePage });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getHomePage = async (req, res) => {
    try {
        const result = await homepageModel.find();
        res.send({ data: result });
    } catch (err) {
        res.status(400).send(err);
    }
};
const getPublishedHomePage = async (req, res) => {
    try {
        const result = await homepageModel.findOne({ published: true });
        res.send({ data: result });
    } catch (err) {
        res.status(400).send(err);
    }
};
const publishHomePage = async (req, res) => {
    try {
        const newPublishedId = req.params.id;
        await homepageModel.updateMany({ published: true }, { $set: { published: false } });
        const publishedData = await homepageModel.findByIdAndUpdate(newPublishedId, { $set: { published: true } }, { new: true });
        res.send({ data: publishedData });
    } catch (err) {
        res.status(400).send(err);
    }
};

const deleteHomePage = async (req, res) => {

    try {
        // Step 1: Find the home page by ID
        const homepage = await homepageModel.findById(req.params.id);

        if (!homepage) {
            return res.status(404).json({ success: false, message: 'home page not found' });
        }

        // Step 2: Delete associated images
        if (homepage.servicesCardSection && homepage.servicesCardSection.length > 0) {
            homepage.servicesCardSection.forEach((card) => {
                const imagePath = path.join(__dirname, '../', card.serviceImgs.path);
                // Check if file exists and delete
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath); // Delete the image file
                }
            });

        }
        if (homepage.reviewsSection && homepage.reviewsSection.length > 0) {
            homepage.reviewsSection.forEach((card) => {
                const imagePath = path.join(__dirname, '../', card.clientImgs.path);
                // Check if file exists and delete
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath); // Delete the image file
                }
            });

        }

        // Step 3: Delete the home page document
        await homepageModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: 'home page and images deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const updateHomePage = async (req, res) => {
    try {
        const { id } = req.params; // Assuming we're updating the homepage by ID
        const { heroSection, servicesSection, seoSection, aboutSection, servicesCardSection, testimonialSection, reviewsSection, clientSection } = req.body;
        // Find the existing homepage by ID
        const homePage = await homepageModel.findById(id);

        if (!homePage) {
            return res.status(404).json({ success: false, message: "Home page not found" });
        }

        // Update hero section
        if (heroSection) {
            homePage.heroSection = {
                ...homePage.heroSection,
                ...heroSection
            };
        }
        // Update seoSection
        if (seoSection) {
            homePage.seoSection = {
                ...homePage.seoSection,
                ...seoSection
            };
        }

        // Update services section
        if (servicesSection) {
            homePage.servicesSection = {
                ...homePage.servicesSection,
                ...servicesSection
            };
        }

        // Update about section
        if (aboutSection) {
            homePage.aboutSection = aboutSection;
        }

        // Update services card section (with image handling)
        if (servicesCardSection) {
            homePage.servicesCardSection = servicesCardSection.map((card, index) => ({
                servicePointList: card.servicePointList || homePage.servicesCardSection[index]?.servicePointList || [],
                heading: card.heading || homePage.servicesCardSection[index]?.heading || "Default Heading",
                description: card.description || homePage.servicesCardSection[index]?.description || "No description",
                serviceImgs: card.serviceImgs || homePage.servicesCardSection[index]?.serviceImgs || {},
                buttonText: card.buttonText || homePage.servicesCardSection[index]?.buttonText || "",
                buttonUrl: card.buttonUrl || homePage.servicesCardSection[index]?.buttonUrl || ""
            }));
        }

        // Update testimonial section
        if (testimonialSection) {
            homePage.testimonialSection = {
                ...homePage.testimonialSection,
                ...testimonialSection
            };
        }

        // Update reviews section (with image handling)
        if (reviewsSection) {
            homePage.reviewsSection = reviewsSection.map((review, index) => ({
                company: review.company || homePage.reviewsSection[index]?.company || "Unknown Company",
                description: review.description || homePage.reviewsSection[index]?.description || "No description",
                clientName: review.clientName || homePage.reviewsSection[index]?.clientName || "Anonymous",
                clientImgs: review.clientImgs || homePage.reviewsSection[index]?.clientImgs || {}
            }));
        }
        if (clientSection) {
            homePage.clientSection = {
                ...homePage.clientSection,
                heading: clientSection.heading || homePage.clientSection?.heading || "Default cardName",
                subHeading: clientSection.subHeading || homePage.clientSection?.subHeading || "Default cardName",
                clientLogos: clientSection.clientLogos || homePage.clientSection?.clientLogos || []
            };
        }

        // Update timestamps
        homePage.updatedAt = Date.now();

        // Save the updated homepage
        await homePage.save();
        res.status(200).json({ success: true, data: homePage });
    } catch (err) {
        console.error("Error updating home page:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};




module.exports = {
    createHomePage,
    getHomePage,
    getPublishedHomePage,
    publishHomePage,
    deleteHomePage,
    updateHomePage
};