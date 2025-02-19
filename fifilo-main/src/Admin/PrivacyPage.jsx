import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getPublishPrivacyPage, updatePrivacyAction } from '../redux/actions/privacyAction';
import { NavLink } from 'react-router-dom';
import JoditEditor from 'jodit-react';

const PrivacyPage = () => {
    const dispatch = useDispatch();
    const editor = useRef(null);
    const { publishedprivacydata, privacyloading } = useSelector((state) => state.privacy);

    const [heroSection, setHeroSection] = useState({ heading: "" });
    const [content, setContent] = useState("");

    useEffect(() => {
        dispatch(getPublishPrivacyPage());
    }, [dispatch]);

    useEffect(() => {
        if (!privacyloading && publishedprivacydata) {
            setHeroSection({ heading: publishedprivacydata.heroSection.heading, });
            setContent(publishedprivacydata.content);
        }
    }, [privacyloading, publishedprivacydata]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updatePrivacyAction({
            privacyData: { heroSection, content },
            id: publishedprivacydata._id
        }));
        alert("privacy Page updated successfully");
    };
    return (
        <>
            <Sidebar titles="Privacy Policy Page" />
            <div className="main__content"  >
                <div className="page__editors">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><NavLink to="/pages">Pages</NavLink></li>
                            <li className="breadcrumb-item"><img src="assets/imgs/chevron-right.svg" alt="" /></li>
                            <li className="breadcrumb-item active">Privacy Policy Page</li>
                        </ol>
                    </nav>

                    <div className="page__title">
                        <h5>Privacy Policy Page</h5>
                    </div>
                    <div className="page__editContent">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-heading-tab" data-bs-toggle="pill" data-bs-target="#pills-heading" type="button" role="tab" aria-controls="pills-heading"
                                    aria-selected="true">Heading</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-question-tab" data-bs-toggle="pill" data-bs-target="#pills-question" type="button" role="tab" aria-controls="pills-question"
                                    aria-selected="false">Content</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-heading" role="tabpanel" aria-labelledby="pills-heading-tab">
                                <div className="edit__tools">
                                    <div className="card__block">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="heroheading">Heading</label>
                                                    <input required type="text"
                                                        name="heroSection.heading"
                                                        id="heroheading"
                                                        className="form-control"
                                                        value={heroSection.heading}
                                                        onChange={(e) => setHeroSection({ heading: e.target.value })}
                                                        placeholder="Enter Heading"
                                                    />
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
                                    <div className="card__block">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="input__inr">
                                                    <label htmlFor="heroheading">Content</label>
                                                    <JoditEditor
                                                        ref={editor}
                                                        value={content}
                                                        onChange={(newContent) => setContent(newContent)} // Save content on every keystroke
                                                    />
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
                        </div>
                    </div>
                </div>
            </div>
        </ >
    );
};

export default PrivacyPage;