import React from "react";
import { NavLink } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="thankYou__box bg__dark">
      <div className="container">
        <div className="inr__box">
          <h1>
            Thank you for your <br />
            <span>submission!</span>
          </h1>
          <p>A member of our team will be in touch with you shortly.</p>
          <NavLink to="/" className="btn btn__primary m-auto">
            Continue to Homepage
          </NavLink>
        </div>
      </div>
    </div>
  );
}
