import React from 'react';
import { NavLink } from "react-router-dom";

const NotFound = () => {
    return (
        <div className='not__found bg__dark'>
            <div className='container'>
                <h1>404<br /> <span>Page Not Found</span></h1>
                <h6>The page you are looking for does not exist.</h6>
                <NavLink to="/" className="btn btn__primary m-auto">
                    Continue to Homepage
                </NavLink>
            </div>
        </div>
    );
};

export default NotFound;
