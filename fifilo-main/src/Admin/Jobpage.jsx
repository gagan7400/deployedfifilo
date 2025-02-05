import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createjob, getjobs, deleteJob, updatejobAction, } from '../redux/actions/careeraction';
import Sidebar from './Sidebar';
import JoditEditor from 'jodit-react';

export default function Jobpage() {
    const [jobTitle, setJobtitle] = useState("")
    const [category, setCategory] = useState("UI-UX")
    const [experience, setExperience] = useState("")
    const [location, setLocation] = useState("")
    const [jobType, setJobType] = useState("Full-time")
    const [jobStatus, setJobStatus] = useState("Active");
    const [aboutUs, setAboutUs] = useState("");
    const [aboutRole, setAboutRole] = useState("");
    const [responsibilities, setResponsibilities] = useState("")
    const [qualifications, setQualifications] = useState("")
    const [requirements, setRequirements] = useState("");
    const [section, setSection] = useState(false);
    const [isUpdateJob, setIsUpdateJob] = useState({ isupdate: false, data: null, id: null })
    let dispatch = useDispatch();
    let { jobs } = useSelector((state) => state.jobs);
    const editor = useRef(null);
    useEffect(() => {
        dispatch(getjobs());
    }, [dispatch]);

    let submithandler = (e) => {
        e.preventDefault();
        if (!jobTitle || !category || !aboutUs || !aboutRole || !qualifications || !experience || !location || !responsibilities || !jobType || !jobStatus) {
            console.log(jobTitle, category, aboutUs, aboutRole, qualifications, experience, location, responsibilities, jobType, jobStatus)
            alert("please fill all the field")
        } else {
            if (isUpdateJob.isupdate && isUpdateJob.id) {
                dispatch(updatejobAction({ Jobdata: { requirements, jobTitle, aboutRole, aboutUs, qualifications, category, experience, location, responsibilities, qualifications, jobType, jobStatus }, id: isUpdateJob.id }));
                setIsUpdateJob({ isupdate: false, data: null, id: null });
                alert("job updated successfully")
                setSection(false);
            } else {
                dispatch(createjob({ Jobdata: { requirements, jobTitle, aboutRole, aboutUs, qualifications, category, experience, location, responsibilities, qualifications, jobType, jobStatus } }));
                alert("job created successfully")
                setSection(false);
            }
            setJobtitle("");
            setCategory("UI-UX");
            setExperience("");
            setLocation("")
            setJobType("Full-time")
            setAboutUs("")
            setAboutRole("")
            setQualifications("")
            setResponsibilities("")
            setRequirements("")
            setJobStatus("Active")
        }
    }
    let deleted = (id) => {
        let ask = window.confirm("Are you want to Delete this Job");
        if (ask) {
            dispatch(deleteJob(id))
        }
    }
    let updatejob = ({ id, data }) => {
        setIsUpdateJob({ isupdate: true, data, id })
        setSection(true);
        setJobtitle(data.jobTitle);
        setCategory(data.category);
        setExperience(data.experience);
        setLocation(data.location)
        setJobType(data.jobType)
        setAboutUs(data.aboutUs)
        setAboutRole(data.aboutRole)
        setQualifications(data.qualifications)
        setRequirements(data.requirements)
        setResponsibilities(data.responsibilities)
        setJobStatus(data.jobStatus)
    }
    let backBtn = () => {
        setSection(false)
        setIsUpdateJob({ isupdate: false, data: null, id: null })
    }
    let createJobBtn = () => {
        setIsUpdateJob({ isupdate: false, data: null, id: null })
        setJobtitle("");
        setCategory("UI-UX");
        setExperience("");
        setLocation("")
        setJobType("Full-time")
        setAboutUs("")
        setAboutRole("")
        setQualifications("")
        setResponsibilities("")
        setRequirements("")
        setJobStatus("Active")
        setSection(true)
    }
    let cancelForm = () => {
        setSection(!section);
        setIsUpdateJob({ isupdate: false, data: null, id: null });
        setJobtitle("");
        setCategory("UI-UX");
        setExperience("");
        setLocation("")
        setJobType("Full-time")
        setAboutUs("")
        setAboutRole("")
        setQualifications("")
        setResponsibilities("")
        setRequirements("")
        setJobStatus("Active")
    }

    return (
        <div>
            <Sidebar titles="Job section" />
            <div className="main__content">
                <div className="card__box" style={{ display: "block" }} >
                    <div className="page__editors">
                        <div className="page__title">
                            <h5>Jobs</h5>
                            {(!isUpdateJob.isupdate && !isUpdateJob.id && !section) ? <button className="btn btn__update" onClick={() => { createJobBtn() }}>
                                <img src="/assets/imgs/plusyellow.svg" alt="" /> Create a New Job</button>
                                :
                                <button className="btn btn__update" onClick={() => { backBtn() }}>
                                    <img src="assets/imgs/arrow-back.svg" /> Back</button>
                            }
                        </div>
                    </div>
                    {section ?
                        <div className='page__editContent'>
                            <div className="edit__tools">
                                <div className="card__block">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="input__inr">
                                                <label htmlFor="jobTitle">Job Title</label>
                                                <input required type="text"
                                                    name="jobTitle"
                                                    id="jobTitle"
                                                    className="form-control"
                                                    value={jobTitle}
                                                    onChange={(e) => { setJobtitle(e.target.value) }}
                                                    placeholder="Enter Jobtitle"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="input__inr">
                                                <label htmlFor="Category">Category</label>
                                                <select className="form-select form-select-sm mb-3" value={category} onChange={(e) => { setCategory(e.target.value) }} aria-label="Small select example" id="Category">
                                                    <option defaultValue="UI-UX">UI-UX</option>
                                                    <option value="Development">Development</option>
                                                    <option value="Sales&Marketing">Sales & Marketing</option>
                                                    <option value="Hr">Hr</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6">
                                            <div className="input__inr">
                                                <label htmlFor="experience">Experience</label>
                                                <input required type="text"
                                                    name="experience"
                                                    id="experience"
                                                    className="form-control"
                                                    value={experience}
                                                    onChange={(e) => { setExperience(e.target.value) }}
                                                    placeholder="Enter Experience"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="input__inr">
                                                <label htmlFor="location">Location</label>
                                                <input required type="text"
                                                    name="location"
                                                    id="location"
                                                    className="form-control"
                                                    value={location}
                                                    onChange={(e) => { setLocation(e.target.value) }}
                                                    placeholder="Enter Location"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="input__inr">
                                                <label htmlFor="aboutUs">AboutUs</label>
                                                <textarea required type="text"
                                                    name="aboutUs"
                                                    id="aboutUs"
                                                    className="form-control"
                                                    value={aboutUs}
                                                    onChange={(e) => { setAboutUs(e.target.value) }}
                                                    placeholder="Enter AboutUs"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="input__inr">
                                                <label htmlFor="aboutRole">AboutRole</label>
                                                <textarea required type="text"
                                                    name="aboutRole"
                                                    id="aboutRole"
                                                    className="form-control"
                                                    value={aboutRole}
                                                    onChange={(e) => { setAboutRole(e.target.value) }}
                                                    placeholder="Enter About Role"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="input__inr">
                                                <label htmlFor="responsibilities">Responsibilities</label>
                                                <JoditEditor
                                                    ref={editor}
                                                    value={responsibilities}
                                                    onChange={(newContent) => setResponsibilities(newContent)} // Save content on every keystroke
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="input__inr">
                                                <label htmlFor="qualifications">Qualifications</label>
                                                <JoditEditor
                                                    ref={editor}
                                                    value={qualifications}
                                                    onChange={(newContent) => setQualifications(newContent)} // Save content on every keystroke
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="input__inr">
                                                <label htmlFor="requirements">What We Offer</label>
                                                <JoditEditor
                                                    ref={editor}
                                                    value={requirements}
                                                    onChange={(newContent) => setRequirements(newContent)} // Save content on every keystroke
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="input__inr">
                                                <label htmlFor="jobStatus">Job Status</label>
                                                <select className="form-select form-select-sm mb-3" value={jobStatus} onChange={(e) => { setJobStatus(e.target.value) }} aria-label="Small select example" id="jobStatus">
                                                    <option defaultValue="Active"  >Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="input__inr">
                                                <label htmlFor="jobType">Job Type</label>
                                                <select className="form-select form-select-sm mb-3" value={jobType} onChange={(e) => { setJobType(e.target.value) }} aria-label="Small select example" id="jobType">
                                                    <option defaultValue="Full-time">Full-time</option>
                                                    <option value="Full-time On-Site">Full-time On-Site</option>
                                                    <option value="Part-time">Part-time</option>
                                                    <option value="Temporary">Temporary</option>
                                                    <option value="Internship">Internship</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="update__block" >
                                        <button className="btn btn__cancel" type="button" onClick={cancelForm}>Cancel</button>
                                        <button className="btn btn__update" type="button" onClick={submithandler}>{isUpdateJob.isupdate ? "Update" : "Submit"}</button>
                                    </div>
                                </div>
                            </div>
                        </div> :
                        <div className="table__block">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" >S.NO</th>
                                        <th scope="col" >Job Title</th>
                                        <th scope="col" >Category </th>
                                        <th scope="col" >Experience</th>
                                        <th scope="col" >Job Type </th>
                                        <th scope="col" >Job Status </th>
                                        <th scope="col" >Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobs && jobs.map((v, i) => {
                                        return <tr key={i}   >
                                            <td>{jobs.length - i}</td>
                                            <td>{v.jobTitle}</td>
                                            <td>{v.category} </td>
                                            <td>{v.experience}</td>
                                            <td>{v.jobType} </td>
                                            <td>{v.jobStatus}</td>
                                            <td style={{ display: "flex", gap: "16px" }}>
                                                <button className="btn" onClick={() => { updatejob({ id: v._id, data: v }) }}> <img src="/assets/imgs/edit.svg"></img></button>

                                                <button className="btn" onClick={() => { deleted(v._id) }}><img src="/assets/imgs/trash.svg"></img></button>
                                            </td>
                                        </tr>

                                    }).reverse()}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </div>

    )
}
