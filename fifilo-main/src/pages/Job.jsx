import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom';
import DOMPurify from 'dompurify';

export default function Job({ job, isVisible, toggleDetails }) {
    const detailsRef = useRef(null);
    useEffect(() => {
        if (detailsRef.current) {
            detailsRef.current.style.maxHeight = isVisible
                ? `${detailsRef.current.scrollHeight}px`
                : "0px";
        }
    }, [isVisible]);
    return (
        <div className={`col-12 grid-item ${job.category}`}>
            <div className="card__bx">
                <div className="left__bx w-100">
                    <div className='d-flex justify-content-between align-items-start '>
                        <h5>{job.jobTitle}</h5>
                        <NavLink to={`/careerform/${job.jobTitle}`} className="btn btn__primary" data-bs-toggle="modal" data-bs-target="#careerModal" >
                            Apply
                            <img src="assets/img/arrow-up-right.svg" alt="apply" />
                        </NavLink>
                    </div>

                    <div className="btm__box">
                        <p>
                            <img src="assets/img/marker-pin-01.svg" alt="location" />
                            {job.location}
                        </p>

                        <p>
                            <img src="assets/img/time.svg" alt="location" />
                            {job.jobType}
                        </p>
                        <p>
                            <img src="assets/img/experiance.svg" alt="location" />
                            {job.experience}
                        </p>

                        <a className="btn btn__view" onClick={() => toggleDetails(job._id)}>View Detail</a>

                    </div>
                    <div ref={detailsRef} className={`job__details`}   >
                        <div className="inr__job">
                            {job.aboutUs.length && <>
                                <h5>AboutUs:</h5>

                                <p>{job.aboutUs && job.aboutUs}</p></>}

                            <h5>About The Role:</h5>

                            <p>{job.aboutRole && job.aboutRole}</p>

                            <h5>Responsibilities:</h5>

                            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job ? `${job.responsibilities} ` : "") }} />

                            <h5>Qualifications & Skills:</h5>

                            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job ? `${job.qualifications} ` : "") }} />

                            {job.requirements && <>
                                <h5>What We Offer:</h5>
                                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job ? `${job.requirements && job.requirements} ` : "") }} />
                            </>
                            }
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}
