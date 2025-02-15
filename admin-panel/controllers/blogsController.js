// controllers/blogController.js
const { blogsModel, blogPageModel } = require("../models/blogsModel.js");

const createBlog = async (req, res) => {
    try {
        req.body;
        const blog = new blogsModel(req.body);
        await blog.save();
        res.status(201).json({ success: true, data: blog });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
const getBlog = async (req, res) => {
    try {
        const blog = await blogsModel.find();
        res.send({ success: true, data: blog });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
const getBlogByName = async (req, res) => {
    try {
        let { name } = req.params;
        const result = await blogsModel.findOne({ blogUrl: name });
        if (!result) { return res.status(404).json({ success: false, message: `Blog with Name '${name}' not found.` }); }
        res.send({ success: true, data: result });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const Blog = await blogsModel.findById(req.params.id);

        if (!Blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        await blogsModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: 'Blog deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params; // We're updating the about  by ID
        const { blogTitle, blogUrl, uploadedBy, approxTime, heading, blogCategory, seoSection, bannerImg, blogContent, tableOfContent, } = req.body;

        const blog = await blogsModel.findById(id);

        if (!blog) {
            return res.status(404).json({ success: false, message: "blog not found" });
        }
        if (blogTitle) {
            blog.blogTitle = blogTitle
        }

        if (blogUrl) {
            blog.blogUrl = blogUrl
        }
        if (heading) {
            blog.heading = heading
        }
        if (uploadedBy) {
            blog.uploadedBy = uploadedBy
        }
        if (approxTime) {
            blog.approxTime = approxTime
        }
        if (blogCategory) {
            blog.blogCategory = blogCategory
        }
        if (blogContent) {
            blog.blogContent = blogContent
        }
        if (bannerImg) {
            blog.bannerImg = {
                ...blog.bannerImg,
                ...bannerImg
            };
        }
        if (tableOfContent) {
            blog.tableOfContent = [
                ...tableOfContent
            ];
        }
        if (seoSection) {
            blog.seoSection = {
                ...blog.seoSection,
                ...seoSection
            };
        }
        blog.updatedAt = Date.now();

        await blog.save();

        res.status(200).json({ success: true, data: blog });
    } catch (err) {
        console.error("Error updating blog:", err);
        res.status(500).json({ success: false, message: err });
    }
};

// blog page controllers 

const getBlogPage = async (req, res) => {
    try {
        const blogpage = await blogPageModel.find();
        res.send({ data: blogpage });
    } catch (err) {
        res.status(400).send(err);
    }
};

// Blog page Controller 
const createBlogPage = async (req, res) => {
    try {
        const { heroSection, seoSection, } = req.body;
        let blogpage = new blogPageModel({ heroSection, seoSection })
        await blogpage.save();
        res.status(201).json({ success: true, data: blogpage });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getPublishedBlogPage = async (req, res) => {
    try {
        const service = await blogPageModel.findOne({ published: true });
        res.send({ data: service });
    } catch (err) {
        res.status(400).send(err);
    }
};
const publishBlogPage = async (req, res) => {
    try {
        const newPublishedId = req.params.id;
        await blogPageModel.updateMany({ published: true }, { $set: { published: false } });
        const publishedData = await blogPageModel.findByIdAndUpdate(newPublishedId, { $set: { published: true } }, { new: true });
        res.send(publishedData);
    } catch (err) {
        res.status(400).send(err);
    }

};

const deleteBlogPage = async (req, res) => {
    try {
        // Step 1: Find the Blogpage page by ID
        const BlogPage = await blogPageModel.findById(req.params.id);

        if (!BlogPage) {
            return res.status(404).json({ success: false, message: 'Blogpage page not found' });
        }
        await blogPageModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Blogpage page and images deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


const updateBlogPage = async (req, res) => {
    try {
        const { id } = req.params; // we're updating the Blog page by ID
        const { heroSection, seoSection, } = req.body;

        const BlogPage = await blogPageModel.findById(id);

        if (!BlogPage) {
            return res.status(404).json({ success: false, message: "Blog page not found" });
        }

        // Update hero section
        if (heroSection) {
            BlogPage.heroSection = {
                ...BlogPage.heroSection,
                ...heroSection
            };
        }
        if (seoSection) {
            BlogPage.seoSection = {
                ...BlogPage.seoSection,
                ...seoSection
            };
        }

        // Update timestamps
        BlogPage.updatedAt = Date.now();

        // Save the updated Blog page
        await BlogPage.save();

        res.status(200).json({ success: true, data: BlogPage });
    } catch (err) {
        console.error("Error updating Blog page:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    createBlog,
    getBlogByName,
    getBlog,
    deleteBlog,
    updateBlog,
    createBlogPage,
    updateBlogPage,
    getBlogPage,
    getPublishedBlogPage,
    publishBlogPage,
    deleteBlogPage,
};

