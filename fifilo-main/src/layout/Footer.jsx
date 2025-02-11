import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="footer rn__section__gapTop pb-0">
        <div className="container">
          <div className="top__box">
            <h2>
              <span data-aos="fade-right">Let’s Work Together</span>{" "}
              <NavLink to="/contact-us/" className="btn" data-aos="fade-left">
                <img src="assets/img/arrow-up-right-b.svg" alt="" />
              </NavLink>
            </h2>
          </div>

          <div className="center__bx">
            <ul className="ftr__menu">
              <li>
                <NavLink to="/case-studies/">Case Studies</NavLink>
              </li>
              <li>
                <NavLink to="/about/">About</NavLink>
              </li>
              <li>
                <NavLink to="/services/">Services</NavLink>
              </li>
              <li>
                <NavLink to="/career/">Career</NavLink>
              </li>
              <li>
                <NavLink to="/blogs/">Blogs</NavLink>
              </li>
              <li>
                <NavLink to="/contact-us/">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/privacy-policy/">Privacy Policy</NavLink>
              </li>
            </ul>
            <div className="center__inr">
              <div className="ftr__logo">
                <NavLink to="/">
                  <img src="assets/img/logo.png" alt="footer" />
                </NavLink>
              </div>
              <ul className="social__media">
                <li>
                  <NavLink to="https://www.facebook.com/fifilodesign" target="_blank">
                    <img src="assets/img/facebook.svg" alt="facebook" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="https://x.com/Fifilodesigns" target="_blank">
                    <img src="assets/img/x.svg" alt="x" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="https://www.instagram.com/fifilodesigns/" target="_blank">
                    <img src="assets/img/instagram.svg" alt="instagram" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="https://www.linkedin.com/company/fifilodesigns/" target="_blank">
                    <img src="assets/img/linkedin.svg" alt="linkedin" />
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          <div className="bottom__bx">
            <p>2025 FIFILO Designs. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}
