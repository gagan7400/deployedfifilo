import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import $ from "jquery";
import { another, getdata } from "../casestudies/New";
import AOS from "aos";
import "aos/dist/aos.css";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import DOMPurify from 'dompurify';
import Loader from "../layout/Loader";
export default function Casestudy() {
    let { name } = useParams();
    let [casestudy, setCasestudy] = useState(null);
    let [casestudies, setCasestudies] = useState(null);
    let [loading, setLoading] = useState(true);
    let nav = useNavigate();
    let location = useLocation();
    useEffect(() => {
        getCasestudy();
    }, [location]);
    let getCasestudy = async () => {
        try {
            let { data } = await axios.get('/admin/casestudy/getcasestudy/' + name);
            if (data.success) {
                setCasestudy(data.data);
                setLoading(false)
            } else {
                setCasestudy(null);
                nav("/not-found")
            }
        } catch (error) {
            setCasestudy(null)
            setCasestudy(null);
            nav("/not-found")
        }
    }
    let alldata = async () => {
        try {
            let { data } = await axios.get('/admin/casestudy/getcasestudy');
            if (data.success) {
                setCasestudies(data.data);
                setLoading(false)
            } else {
                setCasestudies(null);
                alert("error occured");
            }
        } catch (error) {
            setCasestudy(null)
            setCasestudy(null);
        }
    }
    useEffect(() => {
        getCasestudy();
        alldata();
    }, [])
    useEffect(() => {
        if (casestudy) {
            setLoading(false);
        }
    }, [casestudy]);
    useEffect(() => {
        getdata();
    }, [casestudy, loading]);

    useEffect(() => {
        function cleanup() {
            $(window).off("scroll");
            $(".stroke-circle").removeClass("active");
            $(".card__bx").removeClass("active");
            $(".stroke-border").css("height", "0%");
        }
        another();

        return cleanup;
    }, []);

    useEffect(() => {
        AOS.init();
    }, [casestudy, casestudies]);

    let classes = ["large", "medium", "normal", "small"]
    return (

        <>
            <Helmet>
                <title>{(!loading && casestudy && casestudy.seoSection) && casestudy.seoSection.title}</title>
                <meta name="keywords" content={(!loading && casestudy && casestudy.seoSection) && casestudy.seoSection.keywords}></meta>
                <meta name="description" content={(!loading && casestudy && casestudy.seoSection) && casestudy.seoSection.description}></meta>
                {(!loading && casestudy && casestudy.seoSection) && casestudy.seoSection.seoImg.filename && <meta property="og:image" content={`/images/${(!loading && casestudy && casestudy.seoSection) && casestudy.seoSection.seoImg.filename}`} />}
                <meta property="og:image:alt" content="Description of the feature image" />
            </Helmet>
            <div className={`caseStudies__bnr ${!loading && casestudy ? casestudy.heroSection.casestudyName.toLowerCase() : ``} `}>
                {(loading && !casestudy) && <Loader />}
                <div className="container">

                    <div className="top__bx" data-aos="fade-up" data-aos-duration="800">
                        <h1 dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(!loading && casestudy ? casestudy.heroSection.casestudyName : ``)
                        }} />
                        <h6 dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(!loading && casestudy ? casestudy.heroSection.description : ``)
                        }} />
                    </div>
                    <div className="center__bx" data-aos="fade-up" data-aos-duration="900">
                        <p dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(!loading && casestudy ? casestudy.heroSection.buttonsContent : ``)
                        }} />
                        {(!loading && casestudy) && casestudy.heroSection.workButtons.map((btn, index) => {
                            return <h6 key={index}>{btn.name}</h6>
                        })}
                    </div>
                    <div className="bottom__bx" data-aos="fade-up" data-aos-duration="1000">
                        <img src={(!loading && casestudy) ? `/images/${casestudy.heroSection.heroImg.filename}` : ""} alt="banner" />
                    </div>
                </div>
            </div>


            <div className="caseStudies__overview rn__section__gapTop">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="content__box" data-aos="fade-up" data-aos-duration="800">
                                <h3 dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(!loading && casestudy ? casestudy.overviewSection.briefInsight.contentBox.heading : ``)
                                }} />
                                <p dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(!loading && casestudy ? casestudy.overviewSection.briefInsight.contentBox.description : ``)
                                }} />
                            </div>
                            <div className="card__bx" data-aos="fade-up" data-aos-duration="800">
                                {(!loading && casestudy) && casestudy.overviewSection.briefInsight.overviewBox.map((value, index) => (
                                    <div key={index}>
                                        <p>{value.name}</p>
                                        <h5>{value.value}</h5>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-lg-10">
                            <div className="row">
                                <div className="col-12">
                                    <div className="content__box" data-aos="fade-up" data-aos-duration="800">
                                        <h3 dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(!loading && casestudy ? casestudy.overviewSection.coreIssue.heading : ``)
                                        }} />
                                        <p dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(!loading && casestudy ? casestudy.overviewSection.coreIssue.description : ``)
                                        }} />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="content__box" data-aos="fade-up" data-aos-duration="800">
                                        <h3 dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(!loading && casestudy ? casestudy.overviewSection.Strategy.heading : ``)
                                        }} />
                                        <p dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(!loading && casestudy ? casestudy.overviewSection.Strategy.description : ``)
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="design__process bg__dark d-none d-lg-block" data-aos="fade-up" data-aos-duration="800">
                <div className="sticky-wrapper">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div className="main__heading">
                                    <h2 dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(!loading && casestudy ? casestudy.designProcessSection.heading : ``)
                                    }} />
                                </div>

                                <div className="inner__gapTop card__inr horizontal-scroll-wrapper">
                                    {!loading && casestudy && casestudy.designProcessSection.content.map((card, index) => (
                                        <div className="card__bx horizontal-scroll-container" key={index}>
                                            <div className="scroll-border">
                                                <div className="horizontal-border"></div>
                                                <div className="horizontal-stroke active">
                                                    <img src={card && card.icon && card.icon.filename && `/images/${card.icon.filename}`} alt="icon" />
                                                </div>
                                                <div className="horizontal-stroke-arrow">
                                                    <div className="arrow-down">
                                                        <img src="assets/img/arrow-rt.svg" alt="icon" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="content__box highlight">
                                                <h5>{card.heading}</h5>
                                                <p>{card.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* design process for mobile version */}
            <div className="our__process rn__section__gapTop bg__dark d-block d-lg-none">
                <div className="container">
                    <div className="main__heading" data-aos="fade-up" data-aos-duration="800">
                        <h2 dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(!loading && casestudy ? casestudy.designProcessSection.heading : ``)
                        }} />
                    </div>

                    <div className="inner__gapTop row justify-content-center">
                        {!loading && casestudy && casestudy.designProcessSection.content.map((card, index) => (
                            <div className="col-lg-12" key={index}>
                                <div className="row">
                                    <div className="col-xl-3 col-lg-4 col-md-5 col-10 offset-xl-2 offset-lg-1" data-aos="fade-up" data-aos-duration="800">
                                        <div className="card__bx">
                                            <h5>{card.heading}</h5>
                                            <p>{card.description}</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-1 col-2 center__bx">
                                        <div className="border-section">
                                            <div className="stroke-circle">
                                                <img src={card && card.icon && card.icon.filename && `/images/${card.icon.filename}`} alt="icon" />
                                            </div>
                                            <div className="stroke-border">
                                                <div className="arrow-down">
                                                    <img src="assets/img/arrow-down.svg" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            <div className="caseStudies__overview bottom__overview">
                {!loading && casestudy && casestudy.sketches.heading && <>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div className="content__box" data-aos="fade-up" data-aos-duration="800">
                                    <h3 dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(!loading && casestudy ? casestudy.sketches.heading : ``)
                                    }} />
                                    <p dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(!loading && casestudy ? casestudy.sketches.description : ``)
                                    }} />

                                </div>
                            </div>
                        </div>
                    </div>
                    {!loading && casestudy && casestudy.sketches.imgs.map((img, index) => (
                        <div className="img__fullContainer" data-aos="fade-up" data-aos-duration="800" key={index}>
                            <img src={img && img.filename && `/images/${img.filename}`} alt="" />
                        </div>
                    ))}

                </>}

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="content__box" data-aos="fade-up" data-aos-duration="800">
                                <h3 dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(!loading && casestudy && casestudy.styleGuideSection.heading)
                                }} />
                                <p dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(!loading && casestudy && casestudy.styleGuideSection.description)
                                }} />
                            </div>

                            <div className="color__palette myChoize__color" data-aos="fade-up" data-aos-duration="800">
                                <h3 dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(!loading && casestudy && casestudy.styleGuideSection.sectionName)
                                }} />
                                <div className="brand__colors">
                                    <h5>Brand Colors</h5>
                                    {!loading && casestudy && casestudy.styleGuideSection.BrandcolorSections.map((color, index) => (
                                        <div className="color-inr" key={index}>
                                            <span className="color" style={{ background: color.hex }}></span>
                                            <p>
                                                {color.name} / <span>{color.hex}</span>
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="other__colors tribe__color">
                                    <h5>Other Secondary Colors</h5>
                                    {!loading && casestudy && casestudy.styleGuideSection.SecondaryColorSections.map((color, index) => (
                                        <div className="color-inr" key={index}>
                                            <span className="color" style={{ background: color.hex }}></span>
                                            <p>
                                                <span>{color.hex}</span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="typography" data-aos="fade-up" data-aos-duration="800">
                                <h3 dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(!loading && casestudy && casestudy.typographyData.heading)
                                }} />
                                <div className="font__family">
                                    <h2 style={{ fontFamily: !loading && casestudy && casestudy.typographyData.fontFamily }} dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(!loading && casestudy && casestudy.typographyData.fontFamilyName)
                                    }} />

                                    <div className="font__table">
                                        <div className="font__heading">
                                            <h5>Name</h5>
                                            <h5>Font size</h5>
                                            <h5>Line Height</h5>
                                        </div>

                                        <div className="font__body">
                                            {!loading && casestudy && casestudy.typographyData.fontTable.map((typo, index) => (
                                                <div className="font__row" key={index}>
                                                    <div className="font__data">
                                                        <div className={classes[index]}>
                                                            <span className="bold">{typo.name} Text Bold</span>
                                                            <span className="regular">{typo.name} Text Regular</span>
                                                        </div>
                                                    </div>

                                                    <div className="font__data">
                                                        <h5>{typo.fontSize}</h5>
                                                    </div>

                                                    <div className="font__data">
                                                        <h5>{typo.lineHeight} px</h5>
                                                    </div>
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-10">
                            <div className="content__box" data-aos="fade-up" data-aos-duration="800">
                                <h3 dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(!loading && casestudy && casestudy.updatedLook.heading)
                                }} />
                                <p dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(!loading && casestudy && casestudy.updatedLook.description)
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
                {!loading && casestudy && casestudy.updatedLook.imgs.map((img, index) => (
                    <div className="img__fullWidth" data-aos="fade-up" data-aos-duration="800" key={index}>
                        <img src={img && img.filename && `/images/${img.filename}`} alt="" />
                    </div>
                ))}
                {!loading && casestudy?.impactAndImprovement &&
                    <div className="container" data-aos="fade-up" data-aos-duration="800">
                        <div className="row justify-content-center">
                            {!loading && casestudy?.impactAndImprovement && casestudy.impactAndImprovement.heading !== "" && <div className="col-lg-10">
                                <div className="content__box" data-aos="fade-up" data-aos-duration="800">
                                    <h3 dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(!loading && casestudy && casestudy.impactAndImprovement.heading)
                                    }} />
                                    <div dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(!loading && casestudy && casestudy.impactAndImprovement.description)
                                    }} />
                                </div>
                            </div>}
                            <div className="col-lg-10">
                                <div className="content__box">
                                    <h3 dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(!loading && casestudy && casestudy.howFifiloDesignsDrives.heading)
                                    }} />
                                    <p dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(!loading && casestudy && casestudy.howFifiloDesignsDrives.description)
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                }{console.log(!loading && casestudy && casestudy.fullWidthImg.length)}
                {!loading && casestudy && casestudy.fullWidthImg.length !== 0 && casestudy.fullWidthImg.map((img, index) => (
                    <div className="img__fullWidth" data-aos="fade-up" data-aos-duration="800" key={index}>
                        <img src={img && img.filename && `/images/${img.filename}`} alt="" />
                    </div>
                ))}
            </div>

            <div className="our__work bg__dark explore__more rn__section__gapTop">
                <div className="container">
                    <div className="main__heading" data-aos="fade-up" data-aos-duration="800">
                        <h2>
                            Explore <span> More Projects</span>
                        </h2>
                    </div>
                    <div className="inner__gapTop row">
                        {!loading && casestudies && casestudy && casestudies.filter((item) => item.heroSection.casestudyName !== casestudy.heroSection.casestudyName).slice(0, 2).map((value, index) => (
                            <div className="col-lg-6 col-md-6" data-aos={index % 2 == 0 ? "fade-right" : "fade-left"} data-aos-duration="800" key={index}>
                                <div className="card__caseStudies">
                                    <div className="top__keywords">
                                        {(!loading && value) && value.heroSection.workButtons.map((btn, index) => {
                                            return <span key={index}>{btn.name}</span>
                                        })}
                                    </div>
                                    <h4>
                                        <NavLink to={`/${value.heroSection.pageName}/`} >
                                            {value.heroSection.casestudyName}{" "}
                                            <img src="./assets/img/arrow-up-right.svg" alt="case-studies" />
                                        </NavLink>
                                    </h4>
                                    <p>{value.heroSection.description}</p>
                                    <div className="img__box">
                                        <NavLink to={`/${value.heroSection.pageName}/`}  >
                                            <img src={(value.heroSection.cardImg && value.heroSection.cardImg.filename) && `/images/${value.heroSection.cardImg.filename}`} alt={value.heroSection.casestudyName} />
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
}
