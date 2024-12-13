import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getpublishServicePage, updateServicePageAction } from '../redux/actions/servicesAction';
import ToolSection from './ToolSection';
import SeoImg from './SeoImg';
import { NavLink } from 'react-router-dom';
import HomepageuploadSection from './HomepageuploadSection';
import Loader from '../layout/Loader';
import JoditEditor from 'jodit-react';
const ServicesForm = () => {
    const editor = useRef(null);
    let dispatch = useDispatch();
    const { pageData } = useSelector((state) => state.page);
    useEffect(() => {
        dispatch(getpublishServicePage())
    }, [])
    const { publishedServicePage, publishedServiceLoading } = useSelector((state) => state.services);

    const [heroSection, setHeroSection] = useState({
        heading: "",
        subHeading: "",
        heroButtons: {
            CTA1: { name: "", url: "" },
        },
    });

    const [servicesCards, setServicesCards] = useState([
        {
            cardName: "",
            cardDescription: [""],
            cardList: "",
            cardId: "",
        },
    ]);

    const [toolSection, setToolSection] = useState({
        heading: "",
    });

    const [toolsLogo, setToolsLogo] = useState([
        { filename: "", path: "" },
    ]);

    const [seoSection, setSeoSection] = useState({
        title: "",
        keywords: "",
        description: "",
        seoImg: { filename: "", path: "" },
    });

    useEffect(() => {
        console.log(publishedServicePage)
        if (publishedServicePage) {
            setHeroSection({
                heading: publishedServicePage.heroSection.heading,
                subHeading: publishedServicePage.heroSection.subHeading,
                heroButtons: { ...publishedServicePage.heroSection.heroButtons },
            });

            setServicesCards(
                publishedServicePage.servicesCards.map(card => ({
                    ...card,
                    cardDescription: [...card.cardDescription],
                }))
            );

            setToolSection({
                heading: publishedServicePage.toolSection.heading,
            });

            setToolsLogo(
                publishedServicePage.toolSection.toolsLogo.map(tool => ({ ...tool }))
            );

            setSeoSection({ ...publishedServicePage.seoSection });
        }
    }, [publishedServicePage]);


    // Handle input change for hero section
    const handleHeroChange = (e) => {
        const { name, value } = e.target;
        setHeroSection((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    // Handle input change for services cards
    const handleServiceCardChange = (index, event, data) => {
        const values = servicesCards.map((card) => ({
            ...card,
            cardDescription: [...card.cardDescription],
        }));
        values[index][event.target.name] = event.target.value;
        setServicesCards(values);
    };
    // Handle input for cardDescription
    const handleCardDescriptionChange = (index, descIndex, e) => {
        const { value } = e.target;
        const newServicesCards = servicesCards.map((card) => ({
            ...card,
            cardDescription: [...card.cardDescription],
        }));
        // const newServicesCards = [...servicesCards];
        newServicesCards[index].cardDescription[descIndex] = value;
        setServicesCards(newServicesCards);
    };
    const handleCardListChange = (index, newContent) => {
        const newServicesCards = servicesCards.map((card) => ({
            ...card,
            cardDescription: [...card.cardDescription],
            cardList: card.cardList
        }));
        newServicesCards[index].cardList = newContent;
        setServicesCards(newServicesCards);
    };
    // Add new cardDescription entry
    const addCardDescription = (index) => {
        const newServicesCards = servicesCards.map((card, i) =>
            i === index ? { ...card, cardDescription: [...card.cardDescription, ""] } : card
        );
        setServicesCards(newServicesCards);
    };
    // Add new CardList entry
    // const addCardList = (index) => {
    //     const newServicesCards = servicesCards.map((card, i) =>
    //         i === index ? { ...card, cardList: [...card.cardList, ""] } : card
    //     );
    //     setServicesCards(newServicesCards);
    // };
    const removeCardList = (cardIndex, listIndex) => {
        const newServicesCards = servicesCards.map((card, i) => {
            if (i === cardIndex) {
                // Filter out the item from cardList at the specified listIndex
                return {
                    ...card,
                    cardList: card.cardList.filter((_, idx) => idx !== listIndex)
                };
            }
            return card;
        });
        setServicesCards(newServicesCards);
    };

    // Add a new service card
    const addServiceCard = () => {
        setServicesCards([...servicesCards, { cardId: "", cardName: '', cardDescription: [''], cardList: [''], cardId: "" }]);
    };

    let removeCardDescription = (cardIndex, descriptionIndex) => {
        const newServicesCards = servicesCards.map((card, i) => {
            if (i === cardIndex) {
                // Filter out the item from cardList at the specified listIndex
                return {
                    ...card,
                    cardDescription: card.cardDescription.filter((_, idx) => idx !== descriptionIndex)
                };
            }
            return card;
        });
        setServicesCards(newServicesCards);
    }

    // Remove a service card
    const removeServiceCard = (index) => {
        if (window.confirm("Are You Sure ,You Want To This Delete This")) {
            const updatedCards = servicesCards.filter((_, cardIndex) => cardIndex !== index);
            setServicesCards(updatedCards);
        }
    };

    const addTools = () => {
        setToolsLogo([...toolsLogo, { filename: '', path: '' }]);
    };
    // Remove a service card
    const removeTools = (index) => {
        const updatedCards = toolsLogo.filter((_, cardIndex) => cardIndex !== index);
        setToolsLogo(updatedCards);
    };
    const handleTools = (index, data) => {
        const updatedTools = toolsLogo.map((tool, i) =>
            i === index ? { ...data } : { ...tool }
        );
        setToolsLogo(updatedTools);
    };

    // Handle input change for toolSection heading
    const handleToolSectionChange = (e) => {
        const { name, value } = e.target;
        setToolSection((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    // Handle image uploads for toolsLogo
    const handleToolsLogoChange = (e) => {
        const files = Array.from(e.target.files);
        setToolSection((prevState) => ({
            ...prevState,
            toolsLogo: [...prevState.toolsLogo, ...files]
        }));
    };
    // Submit form data to API
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateServicePageAction({ servicedata: { heroSection, seoSection, servicesCards, toolSection: { ...toolSection, toolsLogo } }, id: publishedServicePage._id }));
        alert("servicePage updated successfully");
    };

    return (
        <>
            <Sidebar titles="Services  Page" />
            <div className="main__content">
                {publishedServiceLoading && <Loader />}
                <div className="page__editors">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><NavLink to="/pages">Pages</NavLink></li>
                            <li className="breadcrumb-item"><img src="assets/imgs/chevron-right.svg" alt="" /></li>
                            <li className="breadcrumb-item active">Services Page</li>
                        </ol>
                    </nav>

                    <div className="page__title">
                        <h5>Services Page</h5>
                    </div>

                    <div className="page__editContent">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-hero-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-hero" type="button" role="tab" aria-controls="pills-hero"
                                    aria-selected="true">Hero</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-servicesCards-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-servicesCards" type="button" role="tab" aria-controls="pills-servicesCards"
                                    aria-selected="true">Services Cards</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-tools-tab" data-bs-toggle="pill"
                                    data-bs-target="#pills-tools" type="button" role="tab" aria-controls="pills-tools"
                                    aria-selected="true">Tools</button>
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
                                                    <label htmlFor="heading">Heading</label>
                                                    <input required
                                                        name="heading"
                                                        type="text"
                                                        placeholder="Enter Heading"
                                                        onChange={handleHeroChange}
                                                        value={heroSection.heading}
                                                        className="form-control"
                                                        id="heading"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="headingSpan">Sub Text</label>
                                                    <input required
                                                        type="text"
                                                        className="form-control"
                                                        value={heroSection.subHeading}
                                                        onChange={handleHeroChange}
                                                        placeholder="Enter Sub text"
                                                        name="subHeading"
                                                        id="headingSpan"
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
                                            <button className="btn btn__update" type="button" onClick={handleSubmit}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-servicesCards" role="tabpanel" aria-labelledby="pills-servicesCards-tab">
                                <div className="edit__tools">
                                    {servicesCards.map((card, index) => (
                                        <div className="card__block" key={index}>
                                            <div className="testimonial__box">
                                                <div className="top__heading">
                                                    <p>Service {index + 1}</p>
                                                    <button className="btn" onClick={() => removeServiceCard(index)}><img src="assets/imgs/trash.svg" alt="trash icon" />Delete</button>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="input__inr">
                                                            <label htmlFor={`cardId${index}`} className="form-label">Service Id</label>
                                                            <input required
                                                                id={`cardId${index}`}
                                                                type="text"
                                                                name="cardId"
                                                                value={card.cardId}
                                                                onChange={(e) => handleServiceCardChange(index, e)}
                                                                placeholder="Enter Service Id"
                                                                className="form-control"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="input__inr">
                                                            <label htmlFor={`cardName${index}`} className="form-label">Service Name</label>
                                                            <input required
                                                                id={`cardName${index}`}
                                                                type="text"
                                                                name="cardName"
                                                                value={card.cardName}
                                                                onChange={(e) => handleServiceCardChange(index, e)}
                                                                placeholder="Enter Service Name"
                                                                className="form-control"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <label htmlFor={`servicesdescription${index}`}>Description</label>
                                                        <div className="row">
                                                            {card.cardDescription.map((desc, descIndex) => (
                                                                <div className="col-lg-12" key={descIndex}>
                                                                    <div className="input__inr">
                                                                        <textarea rows={3} required
                                                                            name="carddescription"
                                                                            type="text"
                                                                            value={desc}
                                                                            onChange={(e) => handleCardDescriptionChange(index, descIndex, e)}
                                                                            placeholder="Enter Description"
                                                                            className="form-control"
                                                                        />
                                                                        <button type="button" className='btn btn__delete' onClick={() => removeCardDescription(index, descIndex)}>
                                                                            <img src="assets/imgs/trash.svg"></img></button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div className="add__review">
                                                                <button className="btn" onClick={() => addCardDescription(index)}><img src="assets/imgs/plus.svg" alt="" />Add New Paragraph</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="input__inr">
                                                            <label htmlFor={`servicesCardList${index}`}>Unordered List</label>
                                                            {/* <Editor
                                                                value={card.cardList}
                                                                apiKey="jd3e97w8li70lbzue44vverzarnpb6y52c1aht6swqstquwz"
                                                                init={{
                                                                    height: 400,
                                                                    menubar: true,
                                                                    plugins: [
                                                                        "advlist",
                                                                        "lists",
                                                                        "link", "image", "charmap", "preview", "anchor", // Optional additional features
                                                                        "searchreplace", "visualblocks", "code", "fullscreen",
                                                                        "insertdatetime", "media", "table", "paste", "help", "wordcount"
                                                                    ],
                                                                    toolbar:
                                                                        "undo redo | formatselect | bold italic backcolor  | \ alignleft aligncenter alignright alignjustify | \ bullist numlist | removeformat | help",
                                                                }}
                                                                onEditorChange={(newContent) => handleCardListChange(index, newContent)}
                                                            /> */}
                                                            <JoditEditor
                                                                ref={editor}
                                                                value={card.cardList}
                                                                onChange={(newContent) => handleCardListChange(index, newContent)} // Save content on every keystroke
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="add__review">
                                        <button className="btn" onClick={addServiceCard}><img src="assets/imgs/plus.svg" alt="" />Add New Service</button>
                                    </div>
                                    <div className="update__block">
                                        <button className="btn btn__update" onClick={handleSubmit}>Update</button>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-tools" role="tabpanel"
                                aria-labelledby="pills-tools-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="toolheading">Headline</label>
                                                    <input required
                                                        id="toolheading"
                                                        type="text"
                                                        name="heading"
                                                        value={toolSection.heading}
                                                        onChange={handleToolSectionChange}
                                                        placeholder="Enter Headline"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card__block">
                                        <HomepageuploadSection setToolsLogo={setToolsLogo} toolsLogo={toolsLogo} />
                                        <div className="uploaded__images">
                                            {toolsLogo.map((tool, index) => (
                                                <ToolSection key={index} tool={tool} index={index} handleTools={handleTools} removeTools={removeTools} />
                                            ))}
                                        </div>
                                        <div className="update__block">
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
                                            <button className="btn btn__update" onClick={handleSubmit}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </>
    );
};
export default ServicesForm;