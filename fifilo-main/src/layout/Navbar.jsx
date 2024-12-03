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
        $(".menu-open").hide();
      });

      // Prevent closing the menu when clicking inside the menu
      $(".menu-open").on("click", function (e) {
        e.stopPropagation();
      });
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
  if (path.includes("casestudy")) {
    console.log(path)
  }
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
                    <NavLink to="https://fifilo.com/blogs/" target="_blank">Blogs</NavLink>
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
                        <NavLink to="https://fifilo.com/blogs/" target="_blank" data-animation="spin" className="wobble">
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
                      {/* <li>
                        <NavLink to="https://www.behance.net/fifilodesigns" target="_blank">
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="#1157FF" />
                            <path
                              d="M12.6537 11C13.1155 11 13.5418 11.0355 13.9326 11.1421C14.3234 11.2131 14.6431 11.3552 14.9273 11.5329C15.2115 11.7105 15.4246 11.9592 15.5667 12.2789C15.7088 12.5986 15.7799 12.9894 15.7799 13.4157C15.7799 13.913 15.6733 14.3393 15.4246 14.659C15.2115 14.9788 14.8562 15.263 14.43 15.4761C15.0339 15.6537 15.4957 15.9734 15.7799 16.3997C16.0641 16.826 16.2417 17.3589 16.2417 17.9628C16.2417 18.4602 16.1351 18.8865 15.9575 19.2417C15.7799 19.5969 15.4957 19.9167 15.176 20.1298C14.8562 20.343 14.4655 20.5206 14.0392 20.6272C13.6129 20.7337 13.1866 20.8048 12.7603 20.8048H8V11H12.6537ZM12.3695 14.9788C12.7603 14.9788 13.08 14.8722 13.3287 14.6946C13.5774 14.5169 13.6839 14.1972 13.6839 13.8064C13.6839 13.5933 13.6484 13.3801 13.5774 13.238C13.5063 13.096 13.3997 12.9894 13.2576 12.8828C13.1155 12.8118 12.9734 12.7407 12.7958 12.7052C12.6182 12.6697 12.4406 12.6697 12.2274 12.6697H10.167V14.9788H12.3695ZM12.4761 19.1707C12.6892 19.1707 12.9024 19.1351 13.08 19.0996C13.2576 19.0641 13.4353 18.993 13.5774 18.8865C13.7195 18.7799 13.826 18.6733 13.9326 18.4957C14.0037 18.3181 14.0747 18.1049 14.0747 17.8562C14.0747 17.3589 13.9326 17.0037 13.6484 16.755C13.3642 16.5418 12.9734 16.4353 12.5116 16.4353H10.167V19.1707H12.4761ZM19.3323 19.1351C19.6165 19.4193 20.0428 19.5614 20.6112 19.5614C21.002 19.5614 21.3572 19.4549 21.6414 19.2772C21.9256 19.0641 22.1033 18.8509 22.1743 18.6378H23.915C23.6308 19.4904 23.2045 20.0943 22.6361 20.4851C22.0677 20.8403 21.3928 21.0535 20.5757 21.0535C20.0073 21.0535 19.51 20.9469 19.0481 20.7693C18.5863 20.5916 18.2311 20.343 17.9114 19.9877C17.5916 19.668 17.343 19.2772 17.2009 18.8154C17.0232 18.3536 16.9522 17.8562 16.9522 17.2879C16.9522 16.755 17.0232 16.2576 17.2009 15.7958C17.3785 15.334 17.6272 14.9432 17.9469 14.588C18.2666 14.2683 18.6574 13.9841 19.0837 13.8064C19.5455 13.6288 20.0073 13.5222 20.5757 13.5222C21.1796 13.5222 21.7125 13.6288 22.1743 13.8775C22.6361 14.1262 22.9914 14.4104 23.2756 14.8367C23.5598 15.2274 23.7729 15.6892 23.915 16.1866C23.9861 16.6839 24.0216 17.1813 23.9861 17.7497H18.835C18.835 18.3181 19.0481 18.8509 19.3323 19.1351ZM21.5704 15.405C21.3217 15.1564 20.9309 15.0143 20.4691 15.0143C20.1494 15.0143 19.9007 15.0853 19.6876 15.1919C19.4744 15.2985 19.3323 15.4406 19.1902 15.5827C19.0481 15.7248 18.9771 15.9024 18.9416 16.08C18.906 16.2576 18.8705 16.3997 18.8705 16.5418H22.0677C21.9967 16.009 21.8191 15.6537 21.5704 15.405ZM18.4442 11.675H22.423V12.6341H18.4442V11.675Z"
                              fill="white"
                            />
                          </svg>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="https://dribbble.com/fifilodesigns" target="_blank">
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16Z" fill="#EA4C89" />
                            <path
                              d="M16 8C11.584 8 8 11.584 8 16C8 20.416 11.584 24 16 24C20.4 24 24 20.416 24 16C24 11.584 20.4 8 16 8ZM21.28 11.68C22.24 12.848 22.8 14.32 22.832 15.936C22.608 15.888 20.352 15.44 18.08 15.712C18.032 15.6 17.984 15.472 17.936 15.36C17.792 15.024 17.648 14.688 17.488 14.368C19.984 13.36 21.136 11.872 21.28 11.68ZM16 9.184C17.728 9.184 19.328 9.84 20.528 10.896C20.4 11.072 19.376 12.448 16.944 13.36C15.824 11.296 14.576 9.616 14.4 9.36C14.912 9.248 15.44 9.184 16 9.184ZM13.088 9.824C13.264 10.064 14.48 11.76 15.616 13.776C12.416 14.624 9.6 14.608 9.296 14.608C9.76 12.48 11.184 10.72 13.088 9.824ZM9.168 16.016C9.168 15.952 9.168 15.872 9.168 15.808C9.456 15.824 12.784 15.856 16.192 14.832C16.384 15.216 16.576 15.6 16.752 16C16.672 16.032 16.576 16.048 16.48 16.08C12.96 17.216 11.088 20.32 10.928 20.576C9.824 19.36 9.168 17.76 9.168 16.016ZM16 22.832C14.416 22.832 12.96 22.288 11.808 21.392C11.936 21.136 13.312 18.464 17.168 17.12C17.184 17.104 17.2 17.104 17.216 17.104C18.176 19.6 18.576 21.68 18.672 22.288C17.856 22.64 16.944 22.832 16 22.832ZM19.808 21.664C19.744 21.248 19.376 19.248 18.48 16.8C20.624 16.464 22.496 17.024 22.736 17.088C22.432 18.992 21.344 20.64 19.808 21.664Z"
                              fill="white"
                            />
                          </svg>
                        </NavLink>
                      </li> */}
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
