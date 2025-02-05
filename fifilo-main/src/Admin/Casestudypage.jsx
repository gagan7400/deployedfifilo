import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SeoImg from './SeoImg';
import { getPublishCasestudyPage, updateCasestudyPageAction } from '../redux/actions/casestudyAction';

const Casestudypage = () => {
    const { pageData } = useSelector((state) => state.page);
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPublishCasestudyPage())
    }, [])
    const { publishedcasestudydata, casestudyloading } = useSelector((state) => state.casestudy);

    const [heroSection, setHeroSection] = useState({
        heading: "",
        subHeading: "",
        heroButtons: { CTA1: { url: "", name: "" } },
    });

    const [seoSection, setSeoSection] = useState({
        title: "",
        keywords: "",
        description: "",
        seoImg: { filename: "", path: "" },
    });

    useEffect(() => {
        if (publishedcasestudydata) {
            setHeroSection({ ...publishedcasestudydata.heroSection });
            setSeoSection({ ...publishedcasestudydata.seoSection });
        }
    }, [publishedcasestudydata]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(
            updateCasestudyPageAction({
                casestudydata: { heroSection, seoSection },
                id: publishedcasestudydata._id,
            })
        );
        alert("Case study updated successfully");
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
                            <li className="breadcrumb-item active">Case Studies</li>
                        </ol>
                    </nav>
                    <div className="page__title">
                        <h5>Case Studies</h5>
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
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="herosubHeading">Sub Text</label>
                                                    <input required type="text"
                                                        id="herosubHeading"
                                                        rows="4"
                                                        name="heroSection.subHeading"
                                                        className="form-control"
                                                        value={heroSection.subHeading}
                                                        onChange={(e) => setHeroSection({ ...heroSection, subHeading: e.target.value })}
                                                        placeholder="Enter Sub Heading"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="input__inr">
                                                    <label htmlFor="CTA1name">CTA Button 01</label>
                                                    <input required type="text"
                                                        id="CTA1name"
                                                        name="CTA1name"
                                                        className="form-control"
                                                        value={heroSection.heroButtons.CTA1.name}
                                                        onChange={(e) => setHeroSection({ ...heroSection, heroButtons: { ...heroSection.heroButtons, CTA1: { ...heroSection.heroButtons.CTA1, name: e.target.value } } })}
                                                        placeholder="Enter Button Text" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="input__inr">
                                                    <label htmlFor="CTA1url">CTA Button Url</label>
                                                    <input required type="text"
                                                        id="CTA1url"
                                                        name="CTA1url"
                                                        className="form-control"
                                                        value={heroSection.heroButtons.CTA1.url}
                                                        onChange={(e) => setHeroSection({ ...heroSection, heroButtons: { ...heroSection.heroButtons, CTA1: { ...heroSection.heroButtons.CTA1, url: e.target.value } } })}
                                                        placeholder="Enter Button Url"
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

export default Casestudypage;