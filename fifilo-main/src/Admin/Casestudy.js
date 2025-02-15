import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import ProcessIcon from './ProcessIcon';
import SketchesImg from './SketchesImg';
import "./dashboard.css";
import CasestudyImg from './CasestudyImg';
import SeoImg from './SeoImg';
import Loader from '../layout/Loader';
import JoditEditor from 'jodit-react';
const Casestudy = () => {
    let { name } = useParams();
    const editor = useRef(null);
    let [casestudy, setCasestudy] = useState(null);
    let [loading, setLoading] = useState(true);
    const [heroSection, setHeroSection] = useState({
        casestudyName: "",
        pageName: "",
        description: "",
        buttonsContent: "",
        workButtons: [{ name: "" }],
        heroImg: { filename: "", path: "" },
        cardImg: { filename: "", path: "" },
        homeImg: { filename: "", path: "" },
    });

    const [overviewSection, setOverviewSection] = useState({
        briefInsight: {
            contentBox: { heading: "", description: "" },
            overviewBox: [{ name: "Client", value: "" }, { name: "Timeline", value: "" }, { name: "Screens", value: "" }, { name: "Business Type", value: "" }],
        },
        coreIssue: { heading: "", description: "" },
        Strategy: { heading: "", description: "" },
        StrategyImages: ""
    });

    const [designProcessSection, setDesignProcessSection] = useState({
        heading: "",
        content: [{ heading: "", description: "", icon: { filename: "", path: "" } }],
    });

    const [sketches, setSketches] = useState({
        heading: "",
        description: "",
        imgs: [{ filename: "", path: "" }],
    });

    const [styleGuideSection, setStyleGuideSection] = useState({
        heading: "",
        description: "",
        sectionName: "Colors",
        BrandcolorSections: [{ name: "", hex: "" }],
        SecondaryColorSections: [{ hex: "" }],
    });

    const [typographyData, setTypographyData] = useState({
        heading: "",
        fontFamily: "",
        fontFamilyName: "",
        fontTable: [{ name: "", fontSize: "", lineHeight: "" }],
    });

    const [impactAndImprovement, setImpactAndImprovement] = useState({
        heading: "",
        description: "",
    });

    const [howFifiloDesignsDrives, setHowFifiloDesignsDrives] = useState({
        heading: "",
        description: "",
    });

    const [updatedLook, setUpdatedLook] = useState({
        heading: "",
        description: "",
        updatedLookImages: "",
        imgs: [{ filename: "", path: "" }],
    });
    const [seoSection, setSeoSection] = useState({
        title: "",
        keywords: "",
        description: "",
        seoImg: { filename: "", path: "" },
    });


    const [fullWidthImg, setFullWidthImg] = useState([{ filename: "", path: "" }]);

    useEffect(() => {
        const getCasestudy = async () => {
            try {
                let { data } = await axios.get(`/admin/casestudy/getcasestudy/${name}`);
                if (data.success) {
                    setCasestudy(data.data);
                    setHeroSection({ ...data.data.heroSection });
                    setOverviewSection({ ...data.data.overviewSection });
                    setDesignProcessSection({ ...data.data.designProcessSection });
                    setSketches({ ...data.data.sketches });
                    setStyleGuideSection({ ...data.data.styleGuideSection });
                    setTypographyData({ ...data.data.typographyData });
                    setImpactAndImprovement({ ...data.data.impactAndImprovement });
                    setHowFifiloDesignsDrives({ ...data.data.howFifiloDesignsDrives });
                    setUpdatedLook({ ...data.data.updatedLook });
                    setFullWidthImg([...data.data.fullWidthImg]);
                    setSeoSection({ ...data.data.seoSection });
                    setLoading(false);
                } else {
                    setCasestudy(null);
                    alert("Error occurred p");
                }
            } catch (error) {
                setCasestudy(null);
                setLoading(false);
            }
        };

        getCasestudy();
    }, [name]);

    const addFontTable = () => {
        setTypographyData((prevState) => ({
            ...prevState,
            fontTable: [...prevState.fontTable, { name: "", fontSize: "", lineHeight: "" }],
        }));
    };
    const removeFontTable = (index) => {
        setTypographyData((prevState) => ({
            ...prevState,
            fontTable: prevState.fontTable.filter((_, i) => i !== index),
        }));
    };
    const handleFontTableChange = (index, field, value) => {
        setTypographyData((prevState) => {
            const updatedFontTable = [...prevState.fontTable];
            updatedFontTable[index][field] = value;
            return { ...prevState, fontTable: updatedFontTable };
        });
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStyleGuideSection((prevState) => ({ ...prevState, [name]: value, }));
    };
    const handleColorInputChange = (e, sectionType, index, field) => {
        const { value } = e.target;
        const updatedSections = [...styleGuideSection[sectionType]];

        updatedSections[index][field] = value;

        setStyleGuideSection((prevState) => ({
            ...prevState,
            [sectionType]: updatedSections,
        }));
    };
    const addColorSection = (sectionType) => {
        const updatedSections = [...styleGuideSection[sectionType]];
        updatedSections.push({ name: "", hex: "" });

        setStyleGuideSection((prevState) => ({
            ...prevState,
            [sectionType]: updatedSections,
        }));
    };
    const removeColorSection = (sectionType, index) => {
        const updatedSections = [...styleGuideSection[sectionType]];
        updatedSections.splice(index, 1);

        setStyleGuideSection((prevState) => ({
            ...prevState,
            [sectionType]: updatedSections,
        }));
    };
    const addSketchesImg = () => {
        let newImg = { filename: "", path: "" }
        setSketches(prevState => ({ ...prevState, imgs: [...prevState.imgs, newImg] }));
    }
    const removeSketchesImg = (index) => {
        if (window.confirm("Are You Sure ,You Want To Delete This")) {
            const updatedContent = sketches.imgs.filter((_, i) => i !== index);
            setSketches({ ...sketches, imgs: updatedContent });
        }
    }
    const HandleSketchesImg = (index, name, data) => {
        const newImg = sketches.imgs.map((img) => ({ ...img }));
        newImg[index] = data;
        setSketches({ ...sketches, imgs: [...newImg] })
    }
    const addupdatedLookImg = () => {
        let newImg = { filename: "", path: "" }
        setUpdatedLook(prevState => ({ ...prevState, imgs: [...prevState.imgs, newImg] }));
    }
    const removeupdatedLookImg = (index) => {
        if (window.confirm("Are You Sure ,You Want To Delete This")) {
            const updatedContent = updatedLook.imgs.filter((_, i) => i !== index);
            setUpdatedLook({ ...updatedLook, imgs: updatedContent });
        }
    }
    const HandleupdatedLookImg = (index, name, data) => {
        const newImg = updatedLook.imgs.map((img) => ({ ...img }));
        newImg[index] = data;
        setUpdatedLook({ ...updatedLook, imgs: [...newImg] })
    }
    const handleContentCardChange = (index, event, data) => {
        const values = designProcessSection.content.map((card) => ({ ...card }));
        if (event === 'icon') {
            values[index]['icon'] = { ...data };
        } else {
            values[index][event.target.name] = event.target.value;
        }
        setDesignProcessSection({ ...designProcessSection, content: values });
    };
    const handleAddContentCard = () => {
        setDesignProcessSection({ ...designProcessSection, content: [...designProcessSection.content, { heading: '', description: '', icon: { filename: "", path: "" } }] });
    };
    const handleRemoveContentCard = (index) => {
        if (window.confirm("Are You Sure ,You Want To Delete This")) {
            const updatedContent = designProcessSection.content.filter((_, i) => i !== index);
            setDesignProcessSection({ ...designProcessSection, content: updatedContent });
        }
    };
    const addWorkButtons = () => {
        let newButton = { url: "", name: "" }
        setHeroSection(prevState => ({ ...prevState, workButtons: [...prevState.workButtons, newButton] }));
    }
    const removeWorkButtons = (index) => {
        if (window.confirm("Are You Sure ,You Want To Delete This")) {
            const updatedContent = heroSection.workButtons.filter((_, i) => i !== index);
            setHeroSection({ ...heroSection, workButtons: updatedContent });
        }
    }
    const HandleWorkButtons = (index, event) => {
        const newworkButton = heroSection.workButtons.map((card) => ({ ...card }));
        newworkButton[index][event.target.name] = event.target.value;
        setHeroSection({ ...heroSection, workButtons: [...newworkButton] })
    }
    const handleOverviewSectionChange = (section, field, value, index = null) => {
        setOverviewSection((prev) => {
            const updatedSection = { ...prev };
            if (field === "contentBox") {
                // Update specific contentBox fields (heading/description)
                updatedSection[section][field] = {
                    ...updatedSection[section][field],
                    ...value, // Merge the updated field
                };
            } else if (field === "overviewBox" && index !== null) {
                // Update specific index in overviewBox
                updatedSection[section][field][index] = {
                    ...updatedSection[section][field][index],
                    ...value,
                };
            } else {
                // Update regular fields
                updatedSection[section][field] = value;
            }

            return updatedSection;
        });
    };
    const addOverviewBox = () => {
        setOverviewSection((prev) => ({
            ...prev,
            briefInsight: {
                ...prev.briefInsight,
                overviewBox: [...prev.briefInsight.overviewBox, { name: "", value: "" }]
            }
        }));
    };
    const removeOverviewBox = (index) => {
        setOverviewSection((prev) => ({
            ...prev,
            briefInsight: {
                ...prev.briefInsight,
                overviewBox: prev.briefInsight.overviewBox.filter((_, i) => i !== index)
            }
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let { data } = await axios.put('/admin/casestudy/updatecasestudy/' + casestudy._id,
                {
                    heroSection, overviewSection, designProcessSection, impactAndImprovement,
                    sketches, styleGuideSection, typographyData, howFifiloDesignsDrives, updatedLook, fullWidthImg,
                    seoSection
                }, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            if (data.success) {
                console.log(data)
                alert("updated succesfully")
            } else {
                console.log(data)
                alert("error occured");
            }

        } catch (error) {
            console.log(error)
            alert("Error Occured")
        }
    };
    return (
        <>
            <Sidebar titles="casestudy" />
            <div className="main__content" >
                <div className="page__editors">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><NavLink to="/casestudies">Case Studies</NavLink></li>
                            <li className="breadcrumb-item"><img src="assets/imgs/chevron-right.svg" alt="" /></li>
                            <li className="breadcrumb-item active">{!loading && heroSection?.casestudyName}</li>
                        </ol>
                    </nav>
                    <div className="page__title">
                        <h5>{!loading && heroSection?.casestudyName}</h5>
                    </div>
                    <div className="page__editContent">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-hero-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-hero" type="button" role="tab" aria-controls="pills-hero"
                                    aria-selected="true">Hero</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-overviewSection-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-overviewSection" type="button" role="tab" aria-controls="pills-overviewSection"
                                    aria-selected="true">Overview</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-process-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-process" type="button" role="tab" aria-controls="pills-process"
                                    aria-selected="false">Process</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-sketches-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-sketches" type="button" role="tab" aria-controls="pills-sketches"
                                    aria-selected="false">Sketches</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-styleGuideSection-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-styleGuideSection" type="button" role="tab" aria-controls="pills-styleGuideSection"
                                    aria-selected="false">Style Guide</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-typographyData-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-typographyData" type="button" role="tab" aria-controls="pills-typographyData"
                                    aria-selected="false">Typography</button>
                            </li>

                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-updatedLook-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-updatedLook" type="button" role="tab" aria-controls="pills-updatedLook"
                                    aria-selected="false">Updated Look</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-impactAndImprovement-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-impactAndImprovement" type="button" role="tab" aria-controls="pills-impactAndImprovement"
                                    aria-selected="false">Impact and Improvement</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-howFifiloDesignsDrives-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-howFifiloDesignsDrives" type="button" role="tab" aria-controls="pills-howFifiloDesignsDrives"
                                    aria-selected="false">How Fifilo Designs</button>
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
                                        <div className="testimonial__box">
                                            <div className="row">
                                                <div className="col-lg-6 ">
                                                    <div className="input__inr">
                                                        <label htmlFor="heroPagename">Page Url</label>
                                                        <input required type="text"
                                                            name="heroPagename"
                                                            id="heroPagename"
                                                            className="form-control"
                                                            value={heroSection.pageName}
                                                            onChange={(e) => setHeroSection({ ...heroSection, pageName: e.target.value })}
                                                            placeholder="Enter page Url"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="input__inr">
                                                        <label htmlFor="casestudyName">Casestudy Name</label>
                                                        <input required type="text"
                                                            name="casestudyName"
                                                            id="casestudyName"
                                                            className="form-control"
                                                            value={heroSection.casestudyName}
                                                            onChange={(e) => setHeroSection({ ...heroSection, casestudyName: e.target.value })}
                                                            placeholder="Enter Casestudy Name"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="description">Description</label>
                                                        <input id="description"
                                                            name="description"
                                                            className="form-control"
                                                            value={heroSection.description}
                                                            onChange={(e) => setHeroSection({ ...heroSection, description: e.target.value })}
                                                            placeholder="Enter Description" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="buttonsContent">Solution</label>
                                                        <input type="text" id="buttonsContent"
                                                            name="buttonsContent"
                                                            className="form-control"
                                                            value={heroSection.buttonsContent}
                                                            onChange={(e) => setHeroSection({ ...heroSection, buttonsContent: e.target.value })}
                                                            placeholder="Enter Solution Text"></input>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="seo__card">
                                                        {heroSection.workButtons.map((v, index) => (
                                                            <div className="card__block" key={index} >
                                                                <div className="testimonial__box">
                                                                    <div className="top__heading">
                                                                        <p>Tag  {index + 1}</p>
                                                                        <button className="btn" onClick={() => { removeWorkButtons(index) }}><img src="assets/imgs/trash.svg" alt="" />Delete</button>
                                                                    </div>
                                                                    <div className='row'>
                                                                        <div className="col-lg-12">
                                                                            <div className="input__inr">
                                                                                <label htmlFor="workButtonsName">Work Button Name</label>
                                                                                <input required type="text"
                                                                                    id="workButtons"
                                                                                    name="name"
                                                                                    className="form-control"
                                                                                    value={v.name}
                                                                                    onChange={(e) => HandleWorkButtons(index, e)}
                                                                                    placeholder="Enter Button Text" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="add__review">
                                                            <button className="btn" onClick={addWorkButtons}><img src="assets/imgs/plus.svg" alt="" />Add New Button</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="seo__card">
                                                        <div className="card__block">
                                                            <div className="row">
                                                                <CasestudyImg heroSection={heroSection} casestudy="Casestudy Banner Image" name="heroImg" setHeroSection={setHeroSection} />
                                                                <CasestudyImg heroSection={heroSection} casestudy="Casestudy Listing Image" name="cardImg" setHeroSection={setHeroSection} />
                                                                <CasestudyImg heroSection={heroSection} casestudy="Homepage Listing Image" name="homeImg" setHeroSection={setHeroSection} />
                                                            </div>
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
                            </div>
                            <div className="tab-pane fade show" id="pills-overviewSection" role="tabpanel"
                                aria-labelledby="pills-overviewSection-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="testimonial__box">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="briefInsightHeading">Brief Insight Heading</label>
                                                        <input required type="text"
                                                            name="briefInsightHeading"
                                                            id="briefInsightHeading"
                                                            className="form-control"
                                                            value={overviewSection.briefInsight.contentBox.heading}
                                                            onChange={(e) => handleOverviewSectionChange("briefInsight", "contentBox", { heading: e.target.value })}
                                                            placeholder="Enter Brief Insight Heading"
                                                            autoComplete="false"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="briefInsightdescription">Brief Insight Description</label>
                                                        <textarea required rows={5}
                                                            name="briefInsightdescription"
                                                            id="briefInsightdescription"
                                                            className="form-control"
                                                            value={overviewSection.briefInsight.contentBox.description}
                                                            onChange={(e) => handleOverviewSectionChange("briefInsight", "contentBox", { description: e.target.value })}
                                                            placeholder="Enter Brief Insight Description"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="seo__card">
                                                        {overviewSection.briefInsight.overviewBox.map((item, index) => (
                                                            <div className="card__block" key={index} >
                                                                <div className="testimonial__box">
                                                                    <div className="top__heading">
                                                                        <p>Statistics {index + 1}</p>
                                                                        <button type="button" className="btn" onClick={() => removeOverviewBox(index)}><img src="assets/imgs/trash.svg" alt="" />Delete</button>
                                                                    </div>
                                                                    <div className='row'>
                                                                        <div className="col-lg-6 col-md-6">
                                                                            <div className="input__inr">
                                                                                <label htmlFor="Name">Name :</label>
                                                                                <input required type="text"
                                                                                    id="Name"
                                                                                    name="Name"
                                                                                    className="form-control"
                                                                                    value={item.name}
                                                                                    onChange={(e) =>
                                                                                        handleOverviewSectionChange("briefInsight", "overviewBox", { name: e.target.value }, index)
                                                                                    }
                                                                                    placeholder="Enter Name" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-6">
                                                                            <div className="input__inr">
                                                                                <label htmlFor="workButtonsurl">Value :</label>
                                                                                <input required type="text"
                                                                                    id="Value"
                                                                                    name="Value"
                                                                                    className="form-control"
                                                                                    value={item.value}
                                                                                    onChange={(e) =>
                                                                                        handleOverviewSectionChange("briefInsight", "overviewBox", { value: e.target.value }, index)
                                                                                    }
                                                                                    placeholder="Enter Value" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="add__review">
                                                            <button className="btn" type="button" onClick={addOverviewBox}><img src="assets/imgs/plus.svg" alt="" />Add More Content</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="CoreIssue">Core Issue Heading</label>
                                                        <input type="text" required
                                                            name="CoreIssueHeading"
                                                            id="CoreIssueHeading"
                                                            className="form-control"
                                                            value={overviewSection.coreIssue.heading}
                                                            onChange={(e) => handleOverviewSectionChange("coreIssue", "heading", e.target.value)}
                                                            placeholder="Enter Core Issue Heading"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="CoreIssue">Core Issue Description</label>
                                                        <textarea required rows={4}
                                                            name="CoreIssueDescription"
                                                            id="CoreIssueDescription"
                                                            className="form-control"
                                                            value={overviewSection.coreIssue.description}
                                                            onChange={(e) => handleOverviewSectionChange("coreIssue", "description", e.target.value)}
                                                            placeholder="Enter Core Issue Description"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="StrategyHeading">Strategy Heading</label>
                                                        <input type="text" required
                                                            name="StrategyHeading"
                                                            id="StrategyHeading"
                                                            className="form-control"
                                                            value={overviewSection.Strategy.heading}
                                                            onChange={(e) => handleOverviewSectionChange("Strategy", "heading", e.target.value)}
                                                            placeholder="Enter Strategy Heading"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="Strategy Description">Strategy Description</label>
                                                        <JoditEditor
                                                            ref={editor}
                                                            value={overviewSection.Strategy.description}
                                                            onChange={(newContent) => handleOverviewSectionChange("Strategy", "description", newContent)} // Save content on every keystroke
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="StrategyImages">Strategy Images (If Required!)</label>
                                                        <JoditEditor
                                                            ref={editor}
                                                            value={overviewSection.StrategyImages}
                                                            onChange={(newContent) => setOverviewSection({ ...overviewSection, StrategyImages: newContent })} // Save content on every keystroke
                                                        />
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
                            </div>
                            <div className="tab-pane fade" id="pills-process" role="tabpanel" aria-labelledby="pills-process-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="processheading" className="form-label">Headline</label>
                                                    <input required type="text"
                                                        id="processheading"
                                                        name="designProcessSection.heading"
                                                        className="form-control"
                                                        value={designProcessSection.heading}
                                                        onChange={(e) => setDesignProcessSection({ ...designProcessSection, heading: e.target.value })}
                                                        placeholder="Enter Headline"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="seo__card">
                                                    {designProcessSection.content.map((card, index) => (
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
                                                        <button className="btn" onClick={handleAddContentCard}><img src="assets/imgs/plus.svg" alt="" />Add Step</button>
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
                            <div className="tab-pane fade" id="pills-sketches" role="tabpanel" aria-labelledby="pills-sketches-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="sketchesHeading" className="form-label">Heading</label>
                                                    <input required type="text"
                                                        id="sketchesHeading"
                                                        name="sketchesHeading"
                                                        className="form-control"
                                                        value={sketches.heading}
                                                        onChange={(e) => setSketches({ ...sketches, heading: e.target.value })}
                                                        placeholder="Enter Heading"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="sketchesdescription" className="form-label">Description</label>
                                                    <input required type="text"
                                                        id="sketchesDescription"
                                                        name="sketchesDescription"
                                                        className="form-control"
                                                        value={sketches.description}
                                                        onChange={(e) => setSketches({ ...sketches, description: e.target.value })}
                                                        placeholder="Enter Description"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="seo__card">
                                                    {sketches.imgs.map((img, index) => (
                                                        <div className="card__block" key={index} >
                                                            <div className="testimonial__box">
                                                                <div className="top__heading">
                                                                    <p>Low-fidelity Image {index + 1}</p>
                                                                    <button className="btn" onClick={() => removeSketchesImg(index)} ><img src="assets/imgs/trash.svg" alt="" />Delete</button>
                                                                </div>
                                                                <div className="row">
                                                                    <SketchesImg HandleSketchesImg={HandleSketchesImg} index={index} img={img} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="add__review">
                                                        <button className="btn" onClick={addSketchesImg}><img src="assets/imgs/plus.svg" alt="" />Add Img</button>
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
                            <div className="tab-pane fade" id="pills-styleGuideSection" role="tabpanel" aria-labelledby="pills-styleGuideSection-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="styleGuideSectionHeading" className="form-label">Heading</label>
                                                    <input required type="text"
                                                        id="styleGuideSectionHeading"
                                                        name="styleGuideSectionHeading"
                                                        className="form-control"
                                                        value={styleGuideSection.heading}
                                                        onChange={(e) => setStyleGuideSection({ ...styleGuideSection, heading: e.target.value })}
                                                        placeholder="Enter Heading"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="styleGuideSectiondescription" className="form-label">Description</label>
                                                    <textarea required rows={4}
                                                        id="styleGuideSectionDescription"
                                                        name="styleGuideSectionDescription"
                                                        className="form-control"
                                                        value={styleGuideSection.description}
                                                        onChange={(e) => setStyleGuideSection({ ...styleGuideSection, description: e.target.value })}
                                                        placeholder="Enter Description"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="SectionName" className="form-label">Colors</label>
                                                    <input required type="text"
                                                        id="SectionName"
                                                        name="SectionName"
                                                        className="form-control"
                                                        value={styleGuideSection.sectionName}
                                                        onChange={(e) => setStyleGuideSection({ ...styleGuideSection, sectionName: e.target.value })}
                                                        placeholder="Enter Title (e.g. Colors)"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="seo__card">
                                                    {styleGuideSection.BrandcolorSections.map((color, index) => (
                                                        <div className="card__block" key={index} >
                                                            <div className="testimonial__box">
                                                                <div className="top__heading">
                                                                    <p>Brand Color {index + 1}</p>
                                                                    <button className="btn" onClick={() => removeColorSection('BrandcolorSections', index)} ><img src="assets/imgs/trash.svg" alt="" />Delete</button>
                                                                </div>
                                                                <div className='row'>
                                                                    <div className="col-lg-12">
                                                                        <div className="input__inr">
                                                                            <label htmlFor="ColorName" className="form-label">ColorName</label>
                                                                            <input required type="text"
                                                                                id="ColorName"
                                                                                name="ColorName"
                                                                                className="form-control"
                                                                                value={color.name}
                                                                                onChange={(e) => handleColorInputChange(e, 'BrandcolorSections', index, 'name')}
                                                                                placeholder="Enter Color Name"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-12">
                                                                        <div className="input__inr">
                                                                            <label htmlFor="ColorHexcode" className="form-label">Color Hex Code</label>
                                                                            <input required type="text"
                                                                                id="ColorHexcode"
                                                                                name="ColorHexcode"
                                                                                className="form-control"
                                                                                value={color.hex}
                                                                                onChange={(e) => handleColorInputChange(e, 'BrandcolorSections', index, 'hex')}
                                                                                placeholder="Enter Color Hexa"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="add__review">
                                                        <button className="btn" onClick={() => addColorSection('BrandcolorSections')}><img src="assets/imgs/plus.svg" alt="" />Add Color</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="seo__card">
                                                    {styleGuideSection.SecondaryColorSections.map((color, index) => (
                                                        <div className="card__block" key={index} >
                                                            <div className="testimonial__box">
                                                                <div className="top__heading">
                                                                    <p>Secondary Color {index + 1}</p>
                                                                    <button className="btn" onClick={() => removeColorSection('SecondaryColorSections', index)} ><img src="assets/imgs/trash.svg" alt="" />Delete</button>
                                                                </div>
                                                                <div className='row'>
                                                                    <div className="col-lg-12">
                                                                        <div className="input__inr">
                                                                            <label htmlFor="ColorHexcode" className="form-label">Color Hex Code</label>
                                                                            <input required type="text"
                                                                                id="ColorHexcode"
                                                                                name="ColorHexcode"
                                                                                className="form-control"
                                                                                value={color.hex}
                                                                                onChange={(e) => handleColorInputChange(e, 'SecondaryColorSections', index, 'hex')}
                                                                                placeholder="Enter Color Hexa"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="add__review">
                                                        <button className="btn" onClick={() => addColorSection('SecondaryColorSections')}><img src="assets/imgs/plus.svg" alt="" />Add Color</button>
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
                            <div className="tab-pane fade" id="pills-typographyData" role="tabpanel" aria-labelledby="pills-typographyData-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="typographyDataHeading" className="form-label">Heading</label>
                                                    <input required type="text"
                                                        id="typographyDataHeading"
                                                        name="typographyDataHeading"
                                                        className="form-control"
                                                        value={typographyData.heading}
                                                        onChange={(e) => setTypographyData({ ...typographyData, heading: e.target.value })}
                                                        placeholder="Enter Heading (e.g. Typography)"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="typographyDatafontFamily" className="form-label">Font Family Name</label>
                                                    <input required type="text"
                                                        id="typographyDatafontFamily"
                                                        name="typographyDatafontFamily"
                                                        className="form-control"
                                                        value={typographyData.fontFamilyName}
                                                        onChange={(e) => setTypographyData({ ...typographyData, fontFamilyName: e.target.value })}
                                                        placeholder="Enter Font Family Name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="typographyDatafontFamily" className="form-label">Font Family</label>
                                                    <input required type="text"
                                                        id="typographyDatafontFamily"
                                                        name="typographyDatafontFamily"
                                                        className="form-control"
                                                        value={typographyData.fontFamily}
                                                        onChange={(e) => setTypographyData({ ...typographyData, fontFamily: e.target.value })}
                                                        placeholder="Enter Font Family"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="seo__card">
                                                    {typographyData.fontTable.map((font, index) => (
                                                        <div className="card__block" key={index} >
                                                            <div className="testimonial__box">
                                                                <div className="top__heading">
                                                                    <p>Font Table {index + 1}</p>
                                                                    <button className="btn" onClick={() => removeFontTable(index)} ><img src="assets/imgs/trash.svg" alt="" />Delete</button>
                                                                </div>
                                                                <div className='row'>
                                                                    <div className="col-lg-12">
                                                                        <div className="input__inr">
                                                                            <label htmlFor="name" className="form-label">Name</label>
                                                                            <input required type="text"
                                                                                id="name"
                                                                                name="name"
                                                                                className="form-control"
                                                                                value={font.name}
                                                                                onChange={(e) =>
                                                                                    handleFontTableChange(index, "name", e.target.value)
                                                                                }
                                                                                placeholder="Enter Name"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-12">
                                                                        <div className="input__inr">
                                                                            <label htmlFor="fontSize" className="form-label">Font Size</label>
                                                                            <input required type="text"
                                                                                id="fontSize"
                                                                                name="fontSize"
                                                                                className="form-control"
                                                                                value={font.fontSize}
                                                                                onChange={(e) =>
                                                                                    handleFontTableChange(index, "fontSize", e.target.value)
                                                                                }
                                                                                placeholder="Enter Font Size"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-12">
                                                                        <div className="input__inr">
                                                                            <label htmlFor="lineHeight" className="form-label">Line Height</label>
                                                                            <input required type="text"
                                                                                id="lineHeight"
                                                                                name="lineHeight"
                                                                                className="form-control"
                                                                                value={font.lineHeight}
                                                                                onChange={(e) =>
                                                                                    handleFontTableChange(index, "lineHeight", e.target.value)
                                                                                }
                                                                                placeholder="Enter Line Height"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="add__review">
                                                        <button className="btn" onClick={addFontTable} ><img src="assets/imgs/plus.svg" alt="" />Add Font Table</button>
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

                            <div className="tab-pane fade" id="pills-updatedLook" role="tabpanel" aria-labelledby="pills-updatedLook-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="updatedLookHeading" className="form-label">Heading</label>
                                                    <input type="text"
                                                        id="updatedLookHeading"
                                                        name="updatedLookHeading"
                                                        className="form-control"
                                                        value={updatedLook.heading}
                                                        onChange={(e) => setUpdatedLook({ ...updatedLook, heading: e.target.value })}
                                                        placeholder="Enter Heading"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="updatedLookdescription" className="form-label">Description</label>
                                                    <textarea rows={4}
                                                        id="updatedLookDescription"
                                                        name="updatedLookDescription"
                                                        className="form-control"
                                                        value={updatedLook.description}
                                                        onChange={(e) => setUpdatedLook({ ...updatedLook, description: e.target.value })}
                                                        placeholder="Enter Description"
                                                    />

                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="updatedLookImages" className="form-label">Updated Look Images (If Required!)</label>
                                                    <JoditEditor
                                                        ref={editor}
                                                        value={updatedLook.updatedLookImages}
                                                        onChange={(newContent) => setUpdatedLook({ ...updatedLook, updatedLookImages: newContent })} // Save content on every keystroke
                                                    />

                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="seo__card">
                                                    {updatedLook.imgs.map((img, index) => (
                                                        <div className="card__block" key={index} >
                                                            <div className="testimonial__box">
                                                                <div className="top__heading">
                                                                    <p>Updated Image {index + 1}</p>
                                                                    <button className="btn" onClick={() => removeupdatedLookImg(index)} ><img src="assets/imgs/trash.svg" alt="" />Delete</button>
                                                                </div>
                                                                <div className="row">
                                                                    <SketchesImg HandleupdatedLookImg={HandleupdatedLookImg} index={index} img={img} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="add__review">
                                                        <button className="btn" onClick={addupdatedLookImg}><img src="assets/imgs/plus.svg" alt="" />Add Img</button>
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
                            <div className="tab-pane fade" id="pills-impactAndImprovement" role="tabpanel"
                                aria-labelledby="pills-impactAndImprovement-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="testimonial__box">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="heading">Heading</label>
                                                        <input required type="text"
                                                            name="impactAndImprovement"
                                                            id="heading"
                                                            className="form-control"
                                                            value={impactAndImprovement.heading}
                                                            onChange={(e) => setImpactAndImprovement({ ...impactAndImprovement, heading: e.target.value })}
                                                            placeholder="Enter Heading"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="description">Description</label>
                                                        <JoditEditor
                                                            ref={editor}

                                                            value={impactAndImprovement.description}
                                                            onChange={(newContent) => setImpactAndImprovement({ ...impactAndImprovement, description: newContent })} // Save content on every keystroke
                                                        />
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
                            </div>
                            <div className="tab-pane fade" id="pills-howFifiloDesignsDrives" role="tabpanel"
                                aria-labelledby="pills-howFifiloDesignsDrives-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="testimonial__box">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="heading">Heading</label>
                                                        <input required type="text"
                                                            name="howFifiloDesignsDrives"
                                                            id="heading"
                                                            className="form-control"
                                                            value={howFifiloDesignsDrives.heading}
                                                            onChange={(e) => setHowFifiloDesignsDrives({ ...howFifiloDesignsDrives, heading: e.target.value })}
                                                            placeholder="Enter Heading"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="input__inr">
                                                        <label htmlFor="description">Description</label>
                                                        <textarea rows={4} id="description"
                                                            name="description"
                                                            className="form-control"
                                                            value={howFifiloDesignsDrives.description}
                                                            onChange={(e) => setHowFifiloDesignsDrives({ ...howFifiloDesignsDrives, description: e.target.value })}
                                                            placeholder="Enter Description" />
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

export default Casestudy;