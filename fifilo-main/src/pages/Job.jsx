import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom';
import DOMPurify from 'dompurify';
import $ from 'jquery'
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
                <div className="left__bx">
                    <h5>{job.jobTitle}</h5>
                    <div className="btm__box">
                        <p>
                            <img src="assets/img/marker-pin-01.svg" alt="location" />
                            {job.location}
                        </p>

                        <p>
                            <img src="assets/img/time.svg" alt="location" />
                            Full Time
                        </p>
                        <p>
                            <img src="assets/img/experiance.svg" alt="location" />
                            {job.yearsOfExperience} Years
                        </p>

                        <a className="btn btn__view" onClick={() => toggleDetails(job._id)}>View Detail</a>

                    </div>
                    <div ref={detailsRef} className={`job__details`}   >
                        <p>{job.description}</p>
                        <h5>Responsibilities:</h5>

                        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job ? `${job.responsibilities} ` : "") }} />

                        {/* {job.responsibilites} */}

                        <h5>Qualifications:</h5>
                        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job ? `${job.qualifications} ` : "") }} />

                    </div>
                </div>

                <NavLink to={`/careerform/${job.jobTitle}`} className="btn btn__primary" data-bs-toggle="modal" data-bs-target="#careerModal" >
                    Apply
                    <img src="assets/img/arrow-up-right.svg" alt="apply" />
                </NavLink>

            </div>
        </div>
    )
}
