import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import DOMPurify from 'dompurify';
export default function Job({ job }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Toggle function to show/hide details
    const toggleDetails = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className={`col-12 grid-item ${job.category}`}>
            <div className="card__bx">
                <div className="left__bx">
                    <h5>{job.jobTitle}</h5>
                    <h6>
                        <span>
                            <img src="assets/img/marker-pin-01.svg" alt="location" />
                            {job.location}
                        </span>{" "}
                        | <span>{job.yearsOfExperience} Years</span>
                    </h6>
                    {isExpanded && (
                        <div style={{ marginTop: "10px", transition: 'all 0.3s ease', display: "flex", flexDirection: "column", gap: "30px", justifyContent: "center" }}>
                            <p><strong>Job Description:</strong> {job.description}</p>
                            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job ? `<strong>Responsibility :</strong>  ${job.responsibilities} ` : "Where Talent Meets<br /> <span>Opportunity!</span>") }} />

                            <p><strong>JobType:</strong> {job.jobType}</p>
                            <p><strong>jobStatus:</strong> {job.jobStatus}</p>
                            {/* Add any other details you want to show here */}
                        </div>
                    )}
                </div>
                <NavLink to={`/careerform/${job.jobTitle}`} className="btn btn__primary" data-bs-toggle="modal" data-bs-target="#careerModal" >
                    Apply
                    <img src="assets/img/arrow-up-right.svg" alt="apply" />
                </NavLink>

            </div>
            {/* <button onClick={toggleDetails} className="btn btn__secondary">
                {isExpanded ? 'Show Less' : 'More Details'}
            </button> */}
        </div>
    )
}
