import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getpublishHomePage, updateHomePageAction } from '../redux/actions/homeAction';
import ReviewCard from './ReviewCard';
import HomepageServiceCard from './HomepageServicecard';
import HomepageClients from './HomepageClients';
import HomepageuploadSection from './HomepageuploadSection';
import SeoImg from './SeoImg';
import { NavLink, useNavigate } from 'react-router-dom';
// import { oldData } from '../redux/actions/pagedataAction';
import Loader from '../layout/Loader';
import { pageAction } from '../redux/actions/pagedataAction';

const Homepage = () => {
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getpublishHomePage())
    }, [])
    const { publishedhomepage, homeloading } = useSelector((state) => state.homepage);

    const [heroSection, setHeroSection] = useState({
        heading: "",
        subHeading: "",
        heroButtons: {
            CTA1: { name: "", url: "" },
            CTA2: { name: "", url: "" },
            CTA3: { name: "", url: "" },
        },
    });

    const [aboutSection, setAboutSection] = useState("");

    const [servicesSection, setServicesSection] = useState({
        preHeading: "",
        heading: "",
    });

    const [servicesCardSection, setServicesCardSection] = useState([
        {
            heading: "",
            servicePointList: [],
            description: "",
            serviceImgs: { filename: "", path: "" },
            buttonText: "",
            buttonUrl: "",
        },
    ]);

    const [testimonialSection, setTestimonialSection] = useState({
        heading: "",
        preHeading: "",
    });

    const [seoSection, setSeoSection] = useState({
        title: "",
        keywords: "",
        description: "",
        seoImg: { filename: "", path: "" },
    });

    const [reviewsSection, setReviewsSection] = useState([
        {
            company: "",
            clientName: "",
            description: "",
            clientImgs: { filename: "", path: "" },
        },
    ]);

    const [clientSection, setClientSection] = useState({
        heading: "",
        subHeading: "",
    });

    const [clientLogos, setClientLogos] = useState([
        { filename: "", path: "" },
    ]);
    useEffect(() => {
        if (publishedhomepage) {
            setHeroSection({
                heading: publishedhomepage.heroSection.heading,
                subHeading: publishedhomepage.heroSection.subHeading,
                heroButtons: publishedhomepage.heroSection.heroButtons,
            });

            setAboutSection(publishedhomepage.aboutSection);

            setServicesSection({
                preHeading: publishedhomepage.servicesSection.preHeading,
                heading: publishedhomepage.servicesSection.heading,
            });

            setServicesCardSection(
                publishedhomepage.servicesCardSection.map(card => ({
                    ...card,
                    servicePointList: [...card.servicePointList],
                }))
            );

            setTestimonialSection({
                heading: publishedhomepage.testimonialSection.heading,
                preHeading: publishedhomepage.testimonialSection.preHeading,
            });

            setSeoSection({ ...publishedhomepage.seoSection });

            setReviewsSection(
                publishedhomepage.reviewsSection.map(review => ({ ...review }))
            );

            setClientSection({
                heading: publishedhomepage.clientSection.heading,
                subHeading: publishedhomepage.clientSection.subHeading,
            });

            setClientLogos([...publishedhomepage.clientSection.clientLogos]);
        }
    }, [publishedhomepage]);

    const handleServicesCardChange = (index, event, data) => {
        const values = servicesCardSection.map((card) => ({ ...card, servicePointList: [...card.servicePointList] }));
        if (event === 'serviceImgs') {
            values[index]['serviceImgs'] = { ...data };
        } else {
            values[index][event.target.name] = event.target.value;
        }
        setServicesCardSection(values);
    };

    const handleAddServicesCard = () => {
        setServicesCardSection([
            ...servicesCardSection,
            { heading: '', servicePointList: [], description: '', serviceImgs: { filename: "", path: "" }, buttonText: "", buttonUrl: "" }]);
    };
    const handleRemoveServicesCard = (index) => {
        let isDelete = window.confirm("Are You Sure ,You Want To Delete This")
        if (isDelete) {
            const values = servicesCardSection.slice();
            values.splice(index, 1); // Remove the card at the given index
            setServicesCardSection(values);
        }

    };
    // Handle input for CardList
    const handleCardListChange = (index, listIndex, e) => {
        const { value } = e.target;
        const values = servicesCardSection.map((card) => ({
            ...card,
            servicePointList: [...card.servicePointList], // Copy each servicePointList as well
        }));
        values[index].servicePointList[listIndex] = value;
        setServicesCardSection(values);
    };
    // Add new CardList entry
    const addCardList = (index) => {
        const values = servicesCardSection.map((card, i) =>
            i === index
                ? { ...card, servicePointList: [...card.servicePointList, ""] }
                : card
        );
        setServicesCardSection(values);
    };

    const handleRemoveServicesCardList = (index, listIndex) => {
        const values = servicesCardSection.map((card) => ({
            ...card,
            servicePointList: [...card.servicePointList], // Copy each servicePointList array
        }));

        values[index].servicePointList.splice(listIndex, 1); // Remove the card at the given index
        setServicesCardSection(values);
    };

    const handleReviewCardChange = (index, event, data) => {
        const values = reviewsSection.map((card) => ({ ...card }));
        if (event === 'clientImgs') {
            values[index]['clientImgs'] = data;
        } else {
            values[index][event.target.name] = event.target.value;
        }
        setReviewsSection(values);
    };

    const handleAddReviewCard = () => {
        setReviewsSection([...reviewsSection, { company: '', clientName: '', description: '', clientImgs: { filename: "", path: "" } }]);
    };
    const handleRemoveReviewCard = (index) => {
        let isDelete = window.confirm("Are You Sure ,You Want To Delete This")
        if (isDelete) {
            const values = reviewsSection.slice();
            values.splice(index, 1); // Remove the card at the given index
            setReviewsSection(values);
        }
    };

    // Handle input change for ClientSection heading
    const handleClientSectionChange = (e) => {
        const { name, value } = e.target;
        setClientSection((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const addClients = (image) => {
        if (image) {
            setClientLogos([...clientLogos, { filename: image.filename, path: image.path }]);
        } else {
            setClientLogos([...clientLogos, { filename: "", path: "" }]);
        }
    };

    // Remove a service card
    const removeClients = (index) => {
        const updatedClients = clientLogos.filter((_, cardIndex) => cardIndex !== index);
        setClientLogos(updatedClients);
    };
    const handleClients = (index, data) => {
        const updatedDclients = clientLogos.map((Client, i) =>
            i === index ? { ...data } : { ...Client }
        );
        setClientLogos(updatedDclients);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (publishedhomepage && publishedhomepage._id) {
            dispatch(updateHomePageAction({ homedata: { heroSection, servicesSection, aboutSection, seoSection, servicesCardSection, testimonialSection, reviewsSection, clientSection: { ...clientSection, clientLogos } }, id: publishedhomepage._id }));
        }
        alert("homePage updated successfully");
    };


    return (
        <>
            <Sidebar titles="Home Page" />
            <div className="main__content">
                <div className="page__editors">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><NavLink to="/pages">Pages</NavLink></li>
                            <li className="breadcrumb-item"><img src="assets/imgs/chevron-right.svg" alt="" /></li>
                            <li className="breadcrumb-item active">Home Page</li>
                        </ol>
                    </nav>

                    <div className="page__title">
                        <h5>Home Page</h5>
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
                                <button className="nav-link" id="pills-service-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-service" type="button" role="tab" aria-controls="pills-service"
                                    aria-selected="false">Services</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-testimonials-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-testimonials" type="button" role="tab"
                                    aria-controls="pills-testimonials" aria-selected="false">Testimonials</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-clients-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-clients" type="button" role="tab" aria-controls="pills-clients"
                                    aria-selected="false">Clients</button>
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
                                                    <label htmlFor="heroheading.heading">Main Heading</label>
                                                    <input required type="text"
                                                        name="heroSection.heading"
                                                        id="heroheading.heading"
                                                        className="form-control"
                                                        value={heroSection.heading}
                                                        onChange={(e) => setHeroSection({ ...heroSection, heading: e.target.value })}
                                                        placeholder="Enter Main Heading"
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
                                                    <label htmlFor="CTA1name">Floating Button 01</label>
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
                                                    <label htmlFor="CTA1url">Floating Button Url</label>
                                                    <input required type="text"
                                                        id="CTA1url"
                                                        name="CTA1url"
                                                        className="form-control"
                                                        value={heroSection.heroButtons.CTA1.url}
                                                        onChange={(e) => setHeroSection({ ...heroSection, heroButtons: { ...heroSection.heroButtons, CTA1: { ...heroSection.heroButtons.CTA1, url: e.target.value } } })}
                                                        placeholder="Enter Button Url"
                                                    /></div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="input__inr">
                                                    <label htmlFor="CTA2name" >Floating Button 02</label>
                                                    <input required type="text"
                                                        id="CTA2name"
                                                        name="CTA2name"
                                                        className="form-control"
                                                        value={heroSection.heroButtons.CTA2.name}
                                                        onChange={(e) => setHeroSection({ ...heroSection, heroButtons: { ...heroSection.heroButtons, CTA2: { ...heroSection.heroButtons.CTA2, name: e.target.value } } })}
                                                        placeholder="Enter Button Text"
                                                    /> </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="input__inr">
                                                    <label htmlFor="CTA2url" >Floating Button Url</label>
                                                    <input required type="text"
                                                        id="CTA2url"
                                                        name="CTA2url"
                                                        className="form-control"
                                                        value={heroSection.heroButtons.CTA2.url}
                                                        onChange={(e) => setHeroSection({ ...heroSection, heroButtons: { ...heroSection.heroButtons, CTA2: { ...heroSection.heroButtons.CTA2, url: e.target.value } } })}
                                                        placeholder="Enter Button Url"
                                                    /></div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="input__inr">
                                                    <label htmlFor="CTA3name" >Floating Button 03</label>
                                                    <input required type="text"
                                                        id="CTA3name"
                                                        name="CTA3name"
                                                        className="form-control"
                                                        value={heroSection.heroButtons.CTA3.name}
                                                        onChange={(e) => setHeroSection({ ...heroSection, heroButtons: { ...heroSection.heroButtons, CTA3: { ...heroSection.heroButtons.CTA3, name: e.target.value } } })}
                                                        placeholder="Enter Button Text"
                                                    /> </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="input__inr">
                                                    <label htmlFor="CTA3url" >Floating Button Url</label>
                                                    <input required type="text"
                                                        id="CTA3url"
                                                        name="CTA3url"
                                                        className="form-control"
                                                        value={heroSection.heroButtons.CTA3.url}
                                                        onChange={(e) => setHeroSection({ ...heroSection, heroButtons: { ...heroSection.heroButtons, CTA3: { ...heroSection.heroButtons.CTA3, url: e.target.value } } })}
                                                        placeholder="Enter Button Url"
                                                    /> </div>
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
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="aboutSection">Content</label>
                                                    <textarea rows="4" required
                                                        name="aboutSection"
                                                        id="aboutSection"
                                                        className="form-control"
                                                        value={aboutSection}
                                                        onChange={(e) => setAboutSection(e.target.value)} placeholder="Enter Content"></textarea>
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
                            <div className="tab-pane fade" id="pills-service" role="tabpanel" aria-labelledby="pills-service-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="input__inr">
                                                    <label htmlFor="servicepreHeading">Eyebrow</label>
                                                    <input required type="text"
                                                        name="servicesSection.preHeading"
                                                        id="servicepreHeading"
                                                        className="form-control"
                                                        value={servicesSection.preHeading}
                                                        onChange={(e) => setServicesSection({ ...servicesSection, preHeading: e.target.value })}
                                                        placeholder="Enter Eyebrow"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="input__inr">
                                                    <label htmlFor="serviceheading">Headline</label>
                                                    <input required type="text"
                                                        name="servicesSection.heading"
                                                        id="serviceheading"
                                                        className="form-control"
                                                        value={servicesSection.heading}
                                                        onChange={(e) => setServicesSection({ ...servicesSection, heading: e.target.value })}
                                                        placeholder="Enter Headline"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {servicesCardSection.map((card, index) => (
                                        <div className="card__block" key={index}>
                                            <div className="testimonial__box">
                                                <div className="top__heading">
                                                    <p>Service {index + 1}</p>
                                                    <button className="btn" onClick={() => handleRemoveServicesCard(index)}><img src="assets/imgs/trash.svg" alt="trash icon" />Delete</button>
                                                </div>
                                                <div className="row">
                                                    <HomepageServiceCard card={card} index={index} handleServicesCardChange={handleServicesCardChange} />
                                                    <div className="col-lg-12">
                                                        <div className="input__inr">
                                                            <label htmlFor={`servicesheading${index}`}>Heading</label>
                                                            <input required type="text"
                                                                name="heading"
                                                                id={`servicesheading${index}`}
                                                                className="form-control"
                                                                value={card.heading}
                                                                onChange={(e) => handleServicesCardChange(index, e)}
                                                                placeholder="Enter Heading"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="input__inr">
                                                            <label htmlFor={`servicesdescription${index}`}>Description</label>
                                                            <textarea required rows={4}
                                                                name="description"
                                                                id={`servicesdescription${index}`}
                                                                className="form-control"
                                                                value={card.description}
                                                                onChange={(e) => handleServicesCardChange(index, e)}
                                                                placeholder="Enter Description"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="input__inr">
                                                            <label htmlFor={`buttonText${index}`}>Button Text</label>
                                                            <input type="text"
                                                                name="buttonText"
                                                                id={`buttonText${index}`}
                                                                className="form-control"
                                                                value={card.buttonText}
                                                                onChange={(e) => handleServicesCardChange(index, e)}
                                                                placeholder="Enter Button Text" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="input__inr">
                                                            <label htmlFor={`buttonUrl${index}`}>Button Url</label>
                                                            <input type="text" className="form-control" style={{ textTransform: "lowercase" }}
                                                                id={`buttonUrl${index}`}
                                                                name="buttonUrl"
                                                                value={card.buttonUrl}
                                                                onChange={(e) => handleServicesCardChange(index, e)}
                                                                placeholder="Enter Button Url" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    ))}
                                    <div className="add__review">
                                        <button className="btn" onClick={handleAddServicesCard}><img src="assets/imgs/plus.svg" alt="" />Add New Service</button>
                                    </div>
                                    <div className="update__block">
                                        <NavLink className="btn btn__cancel" to="/pages">Cancel</NavLink>
                                        <button className="btn btn__update" onClick={handleSubmit}>Update</button>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-testimonials" role="tabpanel"
                                aria-labelledby="pills-testimonials-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="input__inr">
                                                    <label htmlFor="testimonialSectionpreHeading">Eyebrow</label>
                                                    <input required type="text"
                                                        id="testimonialSectionpreHeading"
                                                        name="testimonialSection.preHeading"
                                                        className="form-control"
                                                        value={testimonialSection.preHeading}
                                                        onChange={(e) => setTestimonialSection({ ...testimonialSection, preHeading: e.target.value })}
                                                        placeholder="Enter Eyebrow"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="input__inr">
                                                    <label htmlFor="testimonialSectionheading">Headline</label>
                                                    <input required type="text"
                                                        name="testimonialSection.heading"
                                                        id="testimonialSectionheading"
                                                        className="form-control"
                                                        value={testimonialSection.heading}
                                                        onChange={(e) => setTestimonialSection({ ...testimonialSection, heading: e.target.value })}
                                                        placeholder="Enter Headline"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {reviewsSection.map((card, index) => (
                                        <div className="card__block" key={index} >
                                            <div className="testimonial__box">
                                                <div className="top__heading">
                                                    <p>Review {index + 1}</p>
                                                    <button className="btn" onClick={() => handleRemoveReviewCard(index)}><img src="assets/imgs/trash.svg" alt="" />Delete</button>
                                                </div>
                                                <ReviewCard handleReviewCardChange={handleReviewCardChange} card={card} index={index} />
                                            </div>
                                        </div>
                                    ))}
                                    <div className="add__review">
                                        <button className="btn" onClick={handleAddReviewCard}><img src="assets/imgs/plus.svg" alt="" />Add New Testimonial</button>
                                    </div>
                                    <div className="update__block">
                                        <NavLink className="btn btn__cancel" to="/pages">Cancel</NavLink>
                                        <button className="btn btn__update" onClick={handleSubmit}>Update</button>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-clients" role="tabpanel" aria-labelledby="pills-clients-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="input__inr">
                                                    <label htmlFor="Clientheading" >Eyebrow</label>
                                                    <input required
                                                        type="text"
                                                        name="heading"
                                                        id="Clientheading"
                                                        value={clientSection.heading}
                                                        onChange={handleClientSectionChange}
                                                        placeholder="Enter Eyebrow"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="input__inr">
                                                    <label htmlFor="ClientsubHeading"  >Headline</label>
                                                    <input required
                                                        type="text"
                                                        name="subHeading"
                                                        id="ClientsubHeading"
                                                        value={clientSection.subHeading}
                                                        onChange={handleClientSectionChange}
                                                        placeholder="Enter Headline"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card__block">
                                        <HomepageuploadSection addClients={addClients} setClientLogos={setClientLogos} clientLogos={clientLogos} />
                                        <div className="uploaded__images">
                                            {clientLogos.map((client, index) => (
                                                <HomepageClients key={index} client={client} index={index} handleClients={handleClients} removeClients={removeClients} />
                                            ))}
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

export default Homepage;