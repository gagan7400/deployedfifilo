// controllers/blogController.js
const { blogsModel } = require("../models/blogsModel.js");

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

module.exports = {
    createBlog,
    getBlogByName,
    getBlog,
    deleteBlog,
    updateBlog
};

