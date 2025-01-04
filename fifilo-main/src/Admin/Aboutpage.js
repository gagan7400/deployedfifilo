import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPublishAboutPage, updateAboutPageAction } from '../redux/actions/aboutAction';
import MemberCard from './MemberCard';
import ProcessIcon from './ProcessIcon';
import SeoImg from './SeoImg';
import Loader from '../layout/Loader';
const Aboutpage = () => {
    const { pageData } = useSelector((state) => state.page);
    const { publishedLoading, publishedData } = useSelector((state) => state.about);
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPublishAboutPage())
    }, [])

    const [heroSection, setHeroSection] = useState({
        heading: "",
        subHeading: "",
        heroButtons: {
            CTA1: { url: "", name: "" },
        },
    });

    const [aboutSection, setAboutSection] = useState({
        heading: "",
        preHeading: "",
        description: "",
    });

    const [processSection, setProcessSection] = useState({
        heading: "",
        preHeading: "",
        content: [
            { heading: "", description: "", icon: { filename: "", path: "" } },
        ],
    });

    const [seoSection, setSeoSection] = useState({
        title: "",
        keywords: "",
        description: "",
        seoImg: { filename: "", path: "" },
    });

    const [teamSection, setTeamSection] = useState({
        heading: "",
        preHeading: "",
        description: "",
    });

    const [membersCard, setMembersCard] = useState([
        {
            name: "",
            designation: "",
            linkedinUrl: "",
            memberImg: { filename: "", path: "" },
        },
    ]);

    useEffect(() => {
        if (publishedData) {
            setHeroSection({
                heading: publishedData.heroSection.heading,
                subHeading: publishedData.heroSection.subHeading,
                heroButtons: { ...publishedData.heroSection.heroButtons },
            });

            setAboutSection({
                heading: publishedData.aboutSection.heading,
                preHeading: publishedData.aboutSection.preHeading,
                description: publishedData.aboutSection.description,
            });

            setProcessSection({
                heading: publishedData.processSection.heading,
                preHeading: publishedData.processSection.preHeading,
                content: [...publishedData.processSection.content],
            });

            setSeoSection({ ...publishedData.seoSection });

            setTeamSection({
                heading: publishedData.teamSection.heading,
                preHeading: publishedData.teamSection.preHeading,
                description: publishedData.teamSection.description,
            });

            setMembersCard([...publishedData.membersCard]);
        }
    }, [publishedData]);

    // const [heroSection, setHeroSection] = useState({
    //     heading: pageData ? pageData.heroSection.heading : "",
    //     subHeading: pageData ? pageData.heroSection.subHeading : "",
    //     heroButtons: pageData ? { ...pageData.heroSection.heroButtons } : { CTA1: { url: "", name: "" } }
    // });
    // const [aboutSection, setAboutSection] = useState({
    //     heading: pageData ? pageData.aboutSection.heading : "",
    //     preHeading: pageData ? pageData.aboutSection.preHeading : "",
    //     description: pageData ? pageData.aboutSection.description : ""
    // });
    // const [processSection, setProcessSection] = useState({
    //     heading: pageData ? pageData.processSection.heading : "",
    //     preHeading: pageData ? pageData.processSection.preHeading : "",
    //     content: pageData ? [...pageData.processSection.content] : [{ heading: '', description: '', icon: { filename: "", path: "" } }],
    // });
    // const [seoSection, setSeoSection] = useState(pageData ? { ...pageData.seoSection } :
    //     {
    //         title: "",
    //         keywords: "",
    //         description: "",
    //         seoImg: { filename: "", path: "" }
    //     });
    // const [teamSection, setTeamSection] = useState({
    //     heading: pageData ? pageData.teamSection.heading : "",
    //     preHeading: pageData ? pageData.teamSection.preHeading : "",
    //     description: pageData ? pageData.teamSection.description : ""
    // });
    // const [membersCard, setMembersCard] = useState(pageData ? [...pageData.membersCard] : [{ name: '', designation: '', linkedinUrl: '', memberImg: { filename: "", path: "" } }]);
    const handleMembersCardChange = (index, event, data) => {
        // const values = [...membersCard];
        const values = membersCard.map((card) => ({ ...card }));
        if (event === 'memberImg') {
            values[index]['memberImg'] = { ...data };
        } else {
            values[index][event.target.name] = event.target.value;
        }
        setMembersCard(values);
    };
    const handleAddCard = () => {
        setMembersCard([...membersCard, { name: '', designation: '', linkedinUrl: '', memberImg: { filename: "", path: "" } }]);
    };
    const handleRemoveCard = (index) => {
        if (window.confirm("Are You Sure ,You Want To Delete This")) {
            const updatedMembersCard = membersCard.filter((_, i) => i !== index);
            setMembersCard(updatedMembersCard);
        }
    };
    const handleContentCardChange = (index, event, data) => {
        const values = processSection.content.map((card) => ({ ...card }));
        if (event === 'icon') {
            values[index]['icon'] = { ...data };
        } else {
            values[index][event.target.name] = event.target.value;
        }

        setProcessSection({ ...processSection, content: values });
    };
    const handleAddContentCard = () => {
        setProcessSection({ ...processSection, content: [...processSection.content, { heading: '', description: '', icon: { filename: "", path: "" } }] });
    };
    const handleRemoveContentCard = (index) => {
        if (window.confirm("Are You Sure ,You Want To Delete This")) {
            const updatedContent = processSection.content.filter((_, i) => i !== index);
            setProcessSection({ ...processSection, content: updatedContent });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateAboutPageAction({ aboutData: { heroSection, aboutSection, seoSection, processSection, teamSection, membersCard }, id: publishedData._id }));
        alert("aboutPage updated successfully");
    };
    return (
        <>
            <Sidebar titles="About Page" />
            <div className="main__content" >
                {publishedLoading && <Loader />}
                <div className="page__editors">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><NavLink to="/pages">Pages</NavLink></li>
                            <li className="breadcrumb-item"><img src="assets/imgs/chevron-right.svg" alt="" /></li>
                            <li className="breadcrumb-item active">About Page</li>
                        </ol>
                    </nav>
                    <div className="page__title">
                        <h5>About Page</h5>
                    </div>

                    <div className="page__editContent">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-hero-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-hero" type="button" role="tab" aria-controls="pills-hero"
                                    aria-selected="true">Hero</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-about-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-about" type="button" role="tab" aria-controls="pills-about"
                                    aria-selected="false">About</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-process-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-process" type="button" role="tab" aria-controls="pills-process"
                                    aria-selected="false">Process</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-teamMembers-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-teamMembers" type="button" role="tab"
                                    aria-controls="pills-teamMembers" aria-selected="false">Team Members</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-seo-tab" data-bs-toggle="pill" data-bs-target="#pills-seo"
                                    type="button" role="tab" aria-controls="pills-seo" aria-selected="false">SEO</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-hero" role="tabpanel"
                                aria-labelledby="pills-hero-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="heroheading.heading">Heading</label>
                                                    <input required type="text"
                                                        name="heroSection.heading"
                                                        id="heroheading.heading"
                                                        className="form-control"
                                                        value={heroSection.heading}
                                                        onChange={(e) => setHeroSection({ ...heroSection, heading: e.target.value })}
                                                        placeholder="Enter Heading"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="herosubHeading.subHeading">Sub Text</label>
                                                    <textarea rows="4" id="herosubHeading.subHeading"
                                                        name="heroSection.subHeading"
                                                        className="form-control"
                                                        value={heroSection.subHeading}
                                                        onChange={(e) => setHeroSection({ ...heroSection, subHeading: e.target.value })}
                                                        placeholder="Enter Sub Text"></textarea>
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
                                            <button className="btn btn__update" type="button" onClick={handleSubmit}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-about" role="tabpanel" aria-labelledby="pills-about-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="input__inr">
                                                    <label htmlFor="aboutpreHeading">Eyebrow</label>
                                                    <input required type="text"
                                                        name="aboutSection.preHeading"
                                                        id="aboutpreHeading"
                                                        className="form-control"
                                                        value={aboutSection.preHeading}
                                                        onChange={(e) => setAboutSection({ ...aboutSection, preHeading: e.target.value })}
                                                        placeholder="Enter Eyebrow"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="input__inr">
                                                    <label htmlFor="aboutheading">Headline</label>
                                                    <input required type="text"
                                                        name="aboutSection.heading"
                                                        id="aboutheading"
                                                        className="form-control"
                                                        value={aboutSection.heading}
                                                        onChange={(e) => setAboutSection({ ...aboutSection, heading: e.target.value })}
                                                        placeholder="Enter Headline"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="description">Description</label>
                                                    <textarea rows="5" required
                                                        name="aboutSection.description"
                                                        id="description"
                                                        className="form-control"
                                                        value={aboutSection.description}
                                                        onChange={(e) => setAboutSection({ ...aboutSection, description: e.target.value })}
                                                        placeholder="Enter Description"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="update__block">
                                            <NavLink className="btn btn__cancel" to="/casestudies">Cancel</NavLink>
                                            <button className="btn btn__update" type="button" onClick={handleSubmit}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-process" role="tabpanel" aria-labelledby="pills-process-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="input__inr">
                                                    <label htmlFor="processpreHeading" className="form-label">Eyebrow</label>
                                                    <input required type="text"
                                                        id="processpreHeading"
                                                        name="processSection.preHeading"
                                                        className="form-control"
                                                        value={processSection.preHeading}
                                                        onChange={(e) => setProcessSection({ ...processSection, preHeading: e.target.value })}
                                                        placeholder="Enter Eyebrow"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="input__inr">
                                                    <label htmlFor="processheading" className="form-label">Headline</label>
                                                    <input required type="text"
                                                        id="processheading"
                                                        name="processSection.heading"
                                                        className="form-control"
                                                        value={processSection.heading}
                                                        onChange={(e) => setProcessSection({ ...processSection, heading: e.target.value })}
                                                        placeholder="Enter Headline"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="seo__card">
                                                    {processSection.content.map((card, index) => (
                                                        <div className="card__block" key={index} >
                                                            <div className="testimonial__box">
                                                                <div className="top__heading">
                                                                    <p>Step {index + 1}</p>
                                                                    <button className="btn" onClick={() => handleRemoveContentCard(index)} ><img src="assets/imgs/trash.svg" alt="" />Delete</button>
                                                                </div>
                                                                <div className="row">
                                                                    <ProcessIcon handleContentCardChange={handleContentCardChange} card={card} index={index} />
                                                                    <div className="col-lg-12">
                                                                        <div className="input__inr">
                                                                            <label htmlFor="cardheading">Heading</label>
                                                                            <input required type="text"
                                                                                className="form-control"
                                                                                name="heading"
                                                                                id="cardheading"
                                                                                value={card.heading}
                                                                                onChange={(event) => handleContentCardChange(index, event)}
                                                                                placeholder="Enter Heading"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-12">
                                                                        <div className="input__inr">
                                                                            <label htmlFor="carddescription">Description</label>
                                                                            <textarea
                                                                                rows="4"
                                                                                id="carddescription"
                                                                                className="form-control"
                                                                                name="description"
                                                                                value={card.description}
                                                                                onChange={(event) => handleContentCardChange(index, event)}
                                                                                placeholder="Enter Description"
                                                                            ></textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="add__review">
                                                        <button className="btn" onClick={handleAddContentCard}><img src="assets/imgs/plus.svg" alt="" />Add New Review</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="update__block">
                                            <NavLink className="btn btn__cancel" to="/casestudies">Cancel</NavLink>
                                            <button className="btn btn__update" type="button" onClick={handleSubmit}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-teamMembers" role="tabpanel" aria-labelledby="pills-teamMembers-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="input__inr">
                                                    <label htmlFor="teampreHeading" >Eyebrow</label>
                                                    <input required type="text"
                                                        id="teampreHeading"
                                                        name="teamSection.preHeading"
                                                        className="form-control"
                                                        value={teamSection.preHeading}
                                                        onChange={(e) => setTeamSection({ ...teamSection, preHeading: e.target.value })}
                                                        placeholder="Enter Eyebrow"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="input__inr">
                                                    <label htmlFor="teamheading">Headline</label>
                                                    <input required type="text"
                                                        id="teamheading"
                                                        name="teamSection.heading"
                                                        className="form-control"
                                                        value={teamSection.heading}
                                                        onChange={(e) => setTeamSection({ ...teamSection, heading: e.target.value })}
                                                        placeholder="Enter Headline"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="teamdescription">Description</label>
                                                    <textarea rows={4} required type="text"
                                                        id="teamdescription"
                                                        name="teamSection.description"
                                                        className="form-control"
                                                        value={teamSection.description}
                                                        onChange={(e) => setTeamSection({ ...teamSection, description: e.target.value })}
                                                        placeholder="Enter Description"
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {membersCard.map((card, index) => (
                                        <div className="card__block" key={index}>
                                            <div className="testimonial__box">
                                                <div className="top__heading">
                                                    <p>Member {index + 1}</p>
                                                    <button className="btn" onClick={() => handleRemoveCard(index)}><img src="/assets/imgs/trash.svg" alt="" />Delete</button>
                                                </div>
                                                <div className="row">
                                                    <MemberCard handleMembersCardChange={handleMembersCardChange} card={card} index={index} />
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="input__inr">
                                                            <label htmlFor="">Name</label>
                                                            <input required type="text"
                                                                className="form-control"
                                                                name="name"
                                                                value={card.name}
                                                                onChange={(event) => handleMembersCardChange(index, event)}
                                                                placeholder="Enter Name"
                                                                autoComplete='false'
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="input__inr">
                                                            <label htmlFor="designation">Designation</label>
                                                            <input required type="text"
                                                                className="form-control"
                                                                name="designation"
                                                                value={card.designation}
                                                                onChange={(event) => handleMembersCardChange(index, event)}
                                                                placeholder="Enter Designation"
                                                                autoComplete='false'
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="input__inr">
                                                            <label htmlFor="linkedinUrl">Linkedin URL</label>
                                                            <input required type="text"
                                                                className="form-control"
                                                                name="linkedinUrl"
                                                                value={card.linkedinUrl}
                                                                autoComplete='false'
                                                                onChange={(event) => handleMembersCardChange(index, event)}
                                                                placeholder="Enter Linkedin Url"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="add__review">
                                        <button className="btn" onClick={handleAddCard}><img src="assets/imgs/plus.svg" alt="" />Add New Member</button>
                                    </div>
                                    <div className="update__block">
                                        <NavLink className="btn btn__cancel" to="/casestudies">Cancel</NavLink>
                                        <button className="btn btn__update" onClick={handleSubmit}>Update</button>
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
                                                        onChange={(e) => setSeoSection({ ...seoSection, title: e.target.valueAsDate })}
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
                                            <NavLink className="btn btn__cancel" to="/casestudies">Cancel</NavLink>
                                            <button className="btn btn__update" onClick={handleSubmit}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Aboutpage;