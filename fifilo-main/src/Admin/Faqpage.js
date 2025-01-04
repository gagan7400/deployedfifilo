import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

import { useDispatch, useSelector } from 'react-redux';
import { getPublishFaqPage, updateFaqAction } from '../redux/actions/faqAction';

import { NavLink, useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader';

const Faqpage = () => {
    const dispatch = useDispatch();
    const { publishedfaqdata, publishedfaqloading } = useSelector((state) => state.faq);

    const [heroSection, setHeroSection] = useState({
        heading: "",
        subHeading: ""
    });

    const [faqSection, setFaqSection] = useState([{ question: "", answer: "" }]);

    useEffect(() => {
        dispatch(getPublishFaqPage());
    }, [dispatch]);

    useEffect(() => {
        if (!publishedfaqloading && publishedfaqdata) {
            setHeroSection({
                heading: publishedfaqdata.heroSection.heading,
                subHeading: publishedfaqdata.heroSection.subHeading
            });
            setFaqSection(publishedfaqdata.faqSection.map((v) => ({
                question: v.question,
                answer: v.answer
            })));
        }
    }, [publishedfaqloading, publishedfaqdata]);

    const handleFaqChange = (index, event) => {
        const values = [...faqSection];
        values[index][event.target.name] = event.target.value;
        setFaqSection(values);
    };

    const handleAddCard = () => {
        setFaqSection([...faqSection, { question: '', answer: "" }]);
    };

    const handleRemoveCard = (index) => {
        const values = [...faqSection];
        values.splice(index, 1);
        setFaqSection(values);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateFaqAction({
            faqData: { heroSection, faqSection },
            id: publishedfaqdata._id
        }));
        alert("FAQ Page updated successfully");
    };
    return (
        <>
            <Sidebar titles="Faq's Page" />
            <div className="main__content"  >
                <div className="page__editors">
                    <div className="page__title">
                        <h5>FAQ Page</h5>
                    </div>

                    <div className="page__editContent">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-heading-tab" data-bs-toggle="pill" data-bs-target="#pills-heading" type="button" role="tab" aria-controls="pills-heading"
                                    aria-selected="true">Heading</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-question-tab" data-bs-toggle="pill" data-bs-target="#pills-question" type="button" role="tab" aria-controls="pills-question"
                                    aria-selected="false">Question-Answer Section</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-heading" role="tabpanel" aria-labelledby="pills-heading-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="heroheading">Main Heading</label>
                                                    <input required type="text"
                                                        name="heroSection.heading"
                                                        id="heroheading"
                                                        className="form-control"
                                                        value={heroSection.heading}
                                                        onChange={(e) => setHeroSection({ ...heroSection, heading: e.target.value })}
                                                        placeholder="Enter Main Heading"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="herosubHeading">Sub Heading</label>
                                                    <textarea rows="2"
                                                        id="herosubHeading"
                                                        name="heroSection.subHeading"
                                                        className="form-control"
                                                        value={heroSection.subHeading}
                                                        onChange={(e) => setHeroSection({ ...heroSection, subHeading: e.target.value })}
                                                        placeholder="Enter Sub Heading"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="update__block">
                                            <NavLink className="btn btn__cancel" to="/dashboard">Cancel</NavLink>
                                            <button className="btn btn__update" onClick={handleSubmit}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-question" role="tabpanel" aria-labelledby="pills-question-tab">
                                <div className="edit__tools">
                                    {faqSection.map((card, index) => (
                                        <div className="card__block" key={index}>
                                            <div className="testimonial__box">
                                                <div className="top__heading">
                                                    <p>Question {index + 1}</p>
                                                    {faqSection.length > 1 && <button className="btn" onClick={() => handleRemoveCard(index)}><img src="/assets/imgs/trash.svg" alt="" />Delete</button>}
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="input__inr">
                                                            <label htmlFor="question">Question</label>
                                                            <input required type="text"
                                                                className="form-control"
                                                                name="question"
                                                                id={`question${index}`}
                                                                value={card.question}
                                                                onChange={(event) => handleFaqChange(index, event)}
                                                                placeholder="Enter Question"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="input__inr">
                                                            <label htmlFor="answer">Answer</label>
                                                            <textarea className="form-control"
                                                                name="answer"
                                                                rows={4}
                                                                required
                                                                id={`answer${index}`}
                                                                value={card.answer}
                                                                onChange={(event) => handleFaqChange(index, event)}
                                                                placeholder="Enter Answer"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="add__review">
                                        <button className="btn" onClick={handleAddCard}><img src="/assets/imgs/plus.svg" alt="" />Add New Question</button>
                                    </div>
                                    <div className="update__block">
                                        <NavLink className="btn btn__cancel" to="/dashboard">Cancel</NavLink>
                                        <button className="btn btn__update" onClick={handleSubmit}>Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ >
    );
};

export default Faqpage;