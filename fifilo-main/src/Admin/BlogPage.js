import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { NavLink } from 'react-router-dom';
import SeoImg from './SeoImg';
import axios from 'axios';

const BlogPage = () => {
    const [blogPageData, setBlogPageData] = useState({});
    const [heroSection, setHeroSection] = useState({
        heading: "",
    });

    const [seoSection, setSeoSection] = useState({
        title: "",
        keywords: "",
        description: "",
        seoImg: { filename: "", path: "" },
    });


    let getPublishData = async () => {
        const { data } = await axios.get('http://localhost:5000/admin/blogs/getpublishedblogpage');
        setBlogPageData({ ...data.data })
    }

    useEffect(() => {
        getPublishData();
    }, []);

    useEffect(() => {
           if (blogPageData) {
            setHeroSection({ ...blogPageData.heroSection });
            setSeoSection({ ...blogPageData.seoSection });
        }
    }, [blogPageData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/admin/blogs/updateblogpage/${blogPageData._id}`, { heroSection, seoSection },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.getItem("token")
                }
            }
        );
        alert("Blog Page  updated successfully");
    };

    return (
        <>
            <Sidebar titles="Career Page" />
            <div className="main__content" >
                <div className="page__editors">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><NavLink to="/pages">Pages</NavLink></li>
                            <li className="breadcrumb-item"><img src="/assets/imgs/chevron-right.svg" alt="" /></li>
                            <li className="breadcrumb-item active">Blog Page</li>
                        </ol>
                    </nav>
                    <div className="page__title">
                        <h5>Blog Page</h5>
                    </div>
                    <div className="page__editContent">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-hero-tab" data-bs-toggle="pill" data-bs-target="#pills-hero" type="button" role="tab" aria-controls="pills-hero"
                                    aria-selected="true">Hero</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-seo-tab" data-bs-toggle="pill" data-bs-target="#pills-seo" type="button" role="tab" aria-controls="pills-seo"
                                    aria-selected="false">SEO</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-hero" role="tabpanel" aria-labelledby="pills-hero-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="heroheading">Main Heading</label>
                                                    <input required type="text"
                                                        id="heroheading"
                                                        name="heroSection.heading"
                                                        className="form-control"
                                                        value={heroSection.heading}
                                                        onChange={(e) => setHeroSection({ ...heroSection, heading: e.target.value })}
                                                        placeholder="Enter Main Heading"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="update__block">
                                            <NavLink className="btn btn__cancel" to="/pages">Cancel</NavLink>
                                            <button className="btn btn__update" onClick={handleSubmit}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-seo" role="tabpanel" aria-labelledby="pills-seo-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="seotitle">Meta Title</label>
                                                    <input required
                                                        type="text"
                                                        name="seotitle"
                                                        id="seotitle"
                                                        value={seoSection.title}
                                                        onChange={(e) => setSeoSection({ ...seoSection, title: e.target.value })}
                                                        placeholder="Enter Meta Title"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="seo__card">
                                                    <div className="card__block">
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="input__inr">
                                                                    <label htmlFor="keywords">Keywords</label>
                                                                    <input type="text" id="keywords" className="form-control"
                                                                        value={seoSection.keywords}
                                                                        onChange={(e) => setSeoSection({ ...seoSection, keywords: e.target.value })}
                                                                        placeholder="Enter Keywords" />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="input__inr">
                                                                    <label htmlFor="Description">Meta Description</label>
                                                                    <textarea rows="4" className="form-control"
                                                                        value={seoSection.description}
                                                                        id="Description"
                                                                        onChange={(e) => setSeoSection({ ...seoSection, description: e.target.value })}
                                                                        placeholder="Enter Meta Description"></textarea>
                                                                </div>
                                                            </div>
                                                            <SeoImg seoSection={seoSection} setSeoSection={setSeoSection} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="update__block">
                                            <NavLink className="btn btn__cancel" to="/pages">Cancel</NavLink>
                                            <button className="btn btn__update" onClick={handleSubmit}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default BlogPage;