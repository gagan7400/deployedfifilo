import React, { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from 'react-router-dom';
import $ from "jquery"; // import jQuery
export default function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [headerFixed, setHeaderFixed] = useState(false);

  useEffect(() => {
    $(document).ready(function () {
      // Toggle menu on menu button click
      $(".menu-btn").on("click", function () {
        $(this).toggleClass("active");
        $("body").toggleClass("open overflow-hidden");
      });

      // Close menu when clicking on any link or button inside the menu
      $(document).on("click", ".menu-open a, .menu-open button", function (e) {
        $(".menu-btn").removeClass("active");
        $("body").removeClass("open overflow-hidden");
        // $(".menu-open").hide();
      });

      // Prevent closing the menu when clicking inside the menu
      // $(".menu-open").on("click", function (e) {
      //   e.stopPropagation();
      // });
    });

    // Wobble animation
    var wobbleElements = document.querySelectorAll(".wobble");

    wobbleElements.forEach(function (el) {
      el.addEventListener("mouseover", function () {
        if (!el.classList.contains("animating") && !el.classList.contains("mouseover")) {
          el.classList.add("animating", "mouseover");

          var letters = el.innerText.split("");

          setTimeout(function () {
            el.classList.remove("animating");
          }, (letters.length + 1) * 50);

          var animationName = el.dataset.animation;

          if (!animationName) {
            animationName = "jump";
          }

          el.innerText = "";

          letters.forEach(function (letter) {
            if (letter === " ") {
              letter = "&nbsp;";
            }

            el.innerHTML += '<span class="letter">' + letter + "</span>";
          });

          var letterElements = el.querySelectorAll(".letter");

          letterElements.forEach(function (letter, i) {
            setTimeout(function () {
              letter.classList.add(animationName);
            }, 50 * i);
          });
        }
      });

      el.addEventListener("mouseout", function () {
        el.classList.remove("mouseover");
      });
    });

    return () => {
      // Clean up event listeners on unmount
      $(".menu-btn").off("click");
      wobbleElements.forEach((el) => {
        el.removeEventListener("mouseover", () => { });
        el.removeEventListener("mouseout", () => { });
      });
      $(window).off("scroll");
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);

      if (position > 50) {
        setHeaderFixed(true);
      } else {
        setHeaderFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const location = useLocation();
  const path = location.pathname.replace(/\//g, '') || 'home';
  
  return (
    <>
      <header className={`${headerFixed ? "fixed" : ""} header ${path}`}>
        <div className="container">
          <div className="navbar">
            <div className="logo">
              <NavLink to="/">
                <img src="assets/img/logo.png" alt="logo" />
              </NavLink>
            </div>
            <div className="nav-bar">
              <nav className="nav-menu">
                <ul>
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
                </ul>
              </nav>
              <button className="menu-btn">
                <span></span>
              </button>
            </div>
            <nav className="menu-open">
              <div className="menu-inr">
                <div className="row">
                  <div className="col-lg-5 col-md-5">
                    <ul className="menu">
                      <li>
                        <NavLink to="/case-studies/" data-animation="spin" className="wobble">
                          Case Studies
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/about/" data-animation="spin" className="wobble">
                          About
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/services/" data-animation="spin" className="wobble">
                          Services
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/career/" data-animation="spin" className="wobble">
                          Career
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/blogs/" data-animation="spin" className="wobble">
                          Blogs
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/contact-us/" data-animation="spin" className="wobble">
                          Contact
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-7 col-md-7">
                    <div className="card-enquiry">
                      <p>PROJECT ENQUIRY</p>
                      <h4>We Can help you with your ideas, Challanges & Ambitions!!</h4>
                      <NavLink to="/contact-us/" className="btn btn__primary">
                        Let's Talk
                      </NavLink>
                      <h6>
                        Want to be Part of FIFILO Design Studio?<NavLink to="/contact-us/"> Apply Now</NavLink>
                      </h6>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <ul className="social-media">
                      <li>
                        <NavLink to="https://www.linkedin.com/company/fifilodesigns/" target="_blank">
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16Z" fill="#2867B2" />
                            <path
                              d="M11.6 24H8.2V13.3H11.6V24ZM9.9 11.8C8.8 11.8 8 11 8 9.9C8 8.8 8.9 8 9.9 8C11 8 11.8 8.8 11.8 9.9C11.8 11 11 11.8 9.9 11.8ZM24 24H20.6V18.2C20.6 16.5 19.9 16 18.9 16C17.9 16 16.9 16.8 16.9 18.3V24H13.5V13.3H16.7V14.8C17 14.1 18.2 13 19.9 13C21.8 13 23.8 14.1 23.8 17.4V24H24Z"
                              fill="white"
                            />
                          </svg>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="https://youtube.com/@fifilodesignstudio1791" target="_blank">
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16Z" fill="#FF0000" />
                            <path
                              d="M23.6 12.0999C23.4 11.3999 22.9 10.8999 22.2 10.6999C21 10.3999 15.9 10.3999 15.9 10.3999C15.9 10.3999 10.9 10.3999 9.60001 10.6999C8.90001 10.8999 8.4 11.3999 8.2 12.0999C8 13.3999 8 15.9999 8 15.9999C8 15.9999 8 18.5999 8.3 19.8999C8.5 20.5999 9 21.0999 9.7 21.2999C10.9 21.5999 16 21.5999 16 21.5999C16 21.5999 21 21.5999 22.3 21.2999C23 21.0999 23.5 20.5999 23.7 19.8999C24 18.5999 24 15.9999 24 15.9999C24 15.9999 24 13.3999 23.6 12.0999ZM14.4 18.3999V13.5999L18.6 15.9999L14.4 18.3999Z"
                              fill="white"
                            />
                          </svg>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="https://www.instagram.com/fifilodesigns/" target="_blank">
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16Z" fill="#F00073" />
                            <path
                              d="M16.0002 9.19995C18.2002 9.19995 18.5002 9.19995 19.4002 9.19995C20.2002 9.19995 20.6002 9.39995 20.9002 9.49995C21.3002 9.69995 21.6002 9.79995 21.9002 10.1C22.2002 10.4 22.4002 10.7 22.5002 11.1C22.6002 11.4 22.7002 11.8 22.8002 12.6C22.8002 13.5 22.8002 13.7 22.8002 16C22.8002 18.3 22.8002 18.5 22.8002 19.4C22.8002 20.2 22.6002 20.6 22.5002 20.9C22.3002 21.3 22.2002 21.6 21.9002 21.9C21.6002 22.2 21.3002 22.4 20.9002 22.5C20.6002 22.6 20.2002 22.7 19.4002 22.8C18.5002 22.8 18.3002 22.8 16.0002 22.8C13.7002 22.8 13.5002 22.8 12.6002 22.8C11.8002 22.8 11.4002 22.6 11.1002 22.5C10.7002 22.3 10.4002 22.2 10.1002 21.9C9.8002 21.6 9.6002 21.3 9.5002 20.9C9.4002 20.6 9.3002 20.2 9.2002 19.4C9.2002 18.5 9.2002 18.3 9.2002 16C9.2002 13.7 9.2002 13.5 9.2002 12.6C9.2002 11.8 9.4002 11.4 9.5002 11.1C9.7002 10.7 9.8002 10.4 10.1002 10.1C10.4002 9.79995 10.7002 9.59995 11.1002 9.49995C11.4002 9.39995 11.8002 9.29995 12.6002 9.19995C13.5002 9.19995 13.8002 9.19995 16.0002 9.19995ZM16.0002 7.69995C13.7002 7.69995 13.5002 7.69995 12.6002 7.69995C11.7002 7.69995 11.1002 7.89995 10.6002 8.09995C10.1002 8.29995 9.6002 8.59995 9.1002 9.09995C8.6002 9.59995 8.4002 9.99995 8.1002 10.6C7.9002 11.1 7.8002 11.7 7.7002 12.6C7.7002 13.5 7.7002 13.8 7.7002 16C7.7002 18.3 7.7002 18.5 7.7002 19.4C7.7002 20.3 7.9002 20.9 8.1002 21.4C8.3002 21.9 8.6002 22.4 9.1002 22.9C9.6002 23.4 10.0002 23.6 10.6002 23.9C11.1002 24.1 11.7002 24.1999 12.6002 24.2999C13.5002 24.2999 13.8002 24.2999 16.0002 24.2999C18.2002 24.2999 18.5002 24.2999 19.4002 24.2999C20.3002 24.2999 20.9002 24.1 21.4002 23.9C21.9002 23.7 22.4002 23.4 22.9002 22.9C23.4002 22.4 23.6002 22 23.9002 21.4C24.1002 20.9 24.2002 20.3 24.3002 19.4C24.3002 18.5 24.3002 18.2 24.3002 16C24.3002 13.8 24.3002 13.5 24.3002 12.6C24.3002 11.7 24.1002 11.1 23.9002 10.6C23.7002 10.1 23.4002 9.59995 22.9002 9.09995C22.4002 8.59995 22.0002 8.39995 21.4002 8.09995C20.9002 7.89995 20.3002 7.79995 19.4002 7.69995C18.5002 7.69995 18.3002 7.69995 16.0002 7.69995Z"
                              fill="white"
                            />
                            <path
                              d="M16.0002 11.7C13.6002 11.7 11.7002 13.6 11.7002 16C11.7002 18.4 13.6002 20.3 16.0002 20.3C18.4002 20.3 20.3002 18.4 20.3002 16C20.3002 13.6 18.4002 11.7 16.0002 11.7ZM16.0002 18.8C14.5002 18.8 13.2002 17.6 13.2002 16C13.2002 14.5 14.4002 13.2 16.0002 13.2C17.5002 13.2 18.8002 14.4 18.8002 16C18.8002 17.5 17.5002 18.8 16.0002 18.8Z"
                              fill="white"
                            />
                            <path
                              d="M20.4002 12.6C20.9525 12.6 21.4002 12.1522 21.4002 11.6C21.4002 11.0477 20.9525 10.6 20.4002 10.6C19.8479 10.6 19.4002 11.0477 19.4002 11.6C19.4002 12.1522 19.8479 12.6 20.4002 12.6Z"
                              fill="white"
                            />
                          </svg>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="https://x.com/Fifilodesigns" target="_blank">
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16Z" fill="black" />
                            <path
                              d="M17.5222 14.7749L23.4785 8H22.0671L16.8952 13.8826L12.7644 8H8L14.2466 16.8955L8 24H9.41155L14.8732 17.7878L19.2356 24H24L17.5218 14.7749H17.5222ZM15.5889 16.9738L14.956 16.0881L9.92015 9.03974H12.0882L16.1522 14.728L16.7851 15.6137L22.0677 23.0075H19.8997L15.5889 16.9742V16.9738Z"
                              fill="white"
                            />
                          </svg>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
