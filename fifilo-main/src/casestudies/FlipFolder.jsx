import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import $ from "jquery";
import { another, getdata } from "./New";
import AOS from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";

export default function TribeStays() {
  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    function cleanup() {
      $(window).off("scroll");
      $(".stroke-circle").removeClass("active");
      $(".card__bx").removeClass("active");
      $(".stroke-border").css("height", "0%");
    }
    another();

    return cleanup;
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Helmet>
        <title>Flip Folder | Revolutionizing Sheet Music | Fifilo Design</title>
        <meta
          name="description"
          content="Explore how Fifilo Design redesigned Flip Folder, a cutting-edge app for college marching bands that simplifies music management and rehearsal processes. Learn how our user-centric approach enhanced navigation and user engagement for band directors."
        />
      </Helmet>
      <div className="caseStudies__bnr flipFolder__bnr">
        <div className="container">
          <div className="top__bx" data-aos="fade-up" data-aos-duration="800">
            <h1>FlipFolder</h1>
            <h6>Dive into the hassle free world of sheet music</h6>
          </div>
          <div className="center__bx" data-aos="fade-up" data-aos-duration="900">
            <p>How did we help them:</p>
            <h6>UI/UX Design</h6>
          </div>
          <div className="bottom__bx" data-aos="fade-up" data-aos-duration="1000">
            <img src="assets/img/flipfolder-bnr.jpg" alt="banner" />
          </div>
        </div>
      </div>

      <div className="caseStudies__overview rn__section__gapTop">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="content__box" data-aos="fade-up" data-aos-duration="800">
                <h3>Brief Insight of the Project</h3>
                <p>Flip Folder, a cutting-edge digital solution for college marching bands, needed a redesign to enhance its user experience. The app allows band directors to share music and conduct rehearsals seamlessly using smartphones and tablets. The goal was to streamline the interface and navigation for a hassle-free experience in selecting music and managing rehearsals.</p>
              </div>
              <div className="card__bx" data-aos="fade-up" data-aos-duration="800">
                <div>
                  <p>Client</p>
                  <h5>J.W. Pepper & Sons</h5>
                </div>
                <div>
                  <p>Timeline</p>
                  <h5>2 Months</h5>
                </div>
                <div>
                  <p>Screens</p>
                  <h5>100+</h5>
                </div>
                <div>
                  <p>Business Type</p>
                  <h5>Music Industry</h5>
                </div>
              </div>
            </div>

            <div className="col-lg-10">
              <div className="row">
                <div className="col-12">
                  <div className="content__box" data-aos="fade-up" data-aos-duration="800">
                    <h3>Core Issue We Addressed</h3>
                    <p>The main challenge was that the existing app interface was not user-friendly, leading to confusion and inefficiency for band directors. Users struggled with navigation and accessing essential features quickly, which hindered their overall experience. Our aim was to create a more intuitive design that would enhance usability and engagement</p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="content__box" data-aos="fade-up" data-aos-duration="800">
                    <h3>Strategy and Approach</h3>
                    <p><b>Discover:</b> We started by gathering insights from users and the client to identify key pain points in the current app. This phase was crucial for understanding the needs of band directors and the specific challenges they faced.</p>
                    <p><b>Define:</b> Collaborating with the original developers, we defined the core requirements for a smoother interface and improved navigation. We focused on simplifying the design to cater to users' short attention spans and ensuring that the app reflected the values of efficiency and ease of use.</p>
                    <p><b>Design:</b> Our design process included sketching out wireframes that featured a modern and appealing interface. We emphasized a coherent color palette and intuitive navigation, aiming to create a seamless user experience without sacrificing aesthetic appeal.</p>
                    <p><b>Deliver:</b> After thorough testing for usability, we finalized the design and delivered a revamped app that made navigation effortless and engaging for users, ensuring quick access to all essential features.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="design__process bg__dark d-none d-lg-block" data-aos="fade-up" data-aos-duration="800">
        <div className="sticky-wrapper">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="main__heading">
                  <h2>
                    Design <span>Process</span>
                  </h2>
                </div>

                <div className="inner__gapTop card__inr horizontal-scroll-wrapper">
                  <div className="card__bx horizontal-scroll-container">
                    <div className="scroll-border">
                      <div className="horizontal-border"></div>
                      <div className="horizontal-stroke active">
                        <img src="assets/img/search-refraction.svg" alt="icon" />
                      </div>
                      <div className="horizontal-stroke-arrow">
                        <div className="arrow-down">
                          <img src="assets/img/arrow-rt.svg" alt="icon" />
                        </div>
                      </div>
                    </div>

                    <div className="content__box highlight">
                      <h5>Discover</h5>
                      <p>During the Discover phase, we delve deep into user needs and business goals to inform the design strategy and ensure tailored solutions.</p>
                    </div>
                  </div>
                  <div className="card__bx horizontal-scroll-container">
                    <div className="scroll-border">
                      <div className="horizontal-border"></div>
                      <div className="horizontal-stroke">
                        <img src="assets/img/pen-tool-02.svg" alt="icon" />
                      </div>
                      <div className="horizontal-stroke-arrow">
                        <div className="arrow-down">
                          <img src="assets/img/arrow-rt.svg" alt="icon" />
                        </div>
                      </div>
                    </div>

                    <div className="content__box">
                      <h5>Design</h5>
                      <p>In the Design phase, we transform insights and ideas into visually compelling interfaces that enhance user interaction and experience.</p>
                    </div>
                  </div>
                  <div className="card__bx horizontal-scroll-container">
                    <div className="scroll-border">
                      <div className="horizontal-border"></div>
                      <div className="horizontal-stroke">
                        <img src="assets/img/stand.svg" alt="icon" />
                      </div>
                      <div className="horizontal-stroke-arrow">
                        <div className="arrow-down">
                          <img src="assets/img/arrow-rt.svg" alt="icon" />
                        </div>
                      </div>
                    </div>

                    <div className="content__box">
                      <h5>Implementation</h5>
                      <p>In the Implementation phase, we meticulously integrate and execute the designed solutions, ensuring functionality aligns with user expectations and design intent.</p>
                    </div>
                  </div>
                  <div className="card__bx horizontal-scroll-container">
                    <div className="scroll-border">
                      <div className="horizontal-border"></div>
                      <div className="horizontal-stroke">
                        <img src="assets/img/stars-02.svg" alt="icon" />
                      </div>
                      <div className="horizontal-stroke-arrow">
                        <div className="arrow-down">
                          <img src="assets/img/arrow-rt.svg" alt="icon" />
                        </div>
                      </div>
                    </div>

                    <div className="content__box">
                      <h5>Development</h5>
                      <p>In the Implementation phase, we meticulously integrate and execute the designed solutions, ensuring functionality aligns with user expectations and design intent.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="our__process rn__section__gapTop bg__dark d-block d-lg-none">
        <div className="container">
          <div className="main__heading" data-aos="fade-up" data-aos-duration="800">
            <h2>
              Design <span>Process</span>
            </h2>
          </div>

          <div className="inner__gapTop row justify-content-center">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-5 col-10 offset-xl-2 offset-lg-1" data-aos="fade-up" data-aos-duration="800">
                  <div className="card__bx">
                    <h5>Discover</h5>
                    <p>During the Discover phase, we delve deep into user needs and business goals to inform the design strategy and ensure tailored solutions.</p>
                  </div>
                </div>
                <div className="col-lg-1 col-2 center__bx">
                  <div className="border-section">
                    <div className="stroke-circle">
                      <img src="assets/img/search-refraction.svg" alt="icon" />
                    </div>
                    <div className="stroke-border">
                      <div className="arrow-down">
                        <img src="assets/img/arrow-down.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-1 col-md-1 col-2 center__bx">
                  <div className="border-section">
                    <div className="stroke-circle">
                      <img src="assets/img/pen-tool-02.svg" alt="icon" />
                    </div>
                    <div className="stroke-border">
                      <div className="arrow-down">
                        <img src="assets/img/arrow-down.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-5 col-10 offset-md-7">
                  <div className="card__bx" data-aos="fade-up" data-aos-duration="800">
                    <h5>Design</h5>
                    <p>In the Design phase, we transform insights and ideas into visually compelling interfaces that enhance user interaction and experience.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-5 col-10 offset-xl-2 offset-lg-1" data-aos="fade-up" data-aos-duration="800">
                  <div className="card__bx">
                    <h5>Implementation</h5>
                    <p>In the Implementation phase, we meticulously integrate and execute the designed solutions, ensuring functionality aligns with user expectations and design intent.</p>
                  </div>
                </div>
                <div className="col-lg-1 col-md-1 col-2 center__bx">
                  <div className="border-section">
                    <div className="stroke-circle">
                      <img src="assets/img/stand.svg" alt="icon" />
                    </div>
                    <div className="stroke-border">
                      <div className="arrow-down">
                        <img src="assets/img/arrow-down.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-1 col-md-1 col-2 center__bx">
                  <div className="border-section">
                    <div className="stroke-circle">
                      <img src="assets/img/stars-02.svg" alt="icon" />
                    </div>
                    <div className="stroke-border">
                      <div className="arrow-down">
                        <img src="assets/img/arrow-down.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-5 col-10 offset-md-7" data-aos="fade-up" data-aos-duration="800">
                  <div className="card__bx">
                    <h5>Program Inception</h5>
                    <p>Program inception sets the stage for aligning your vision with our UI/UX expertise, laying the groundwork for innovative design solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="caseStudies__overview bottom__overview">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="content__box" data-aos="fade-up" data-aos-duration="800">
                <h3>Style Guide and Key Components</h3>
                <p>We developed a comprehensive style guide that focused on clear typography, engaging visuals, and a harmonious color palette. Key components included simplified navigation buttons, responsive layouts, and a focus on delivering essential information prominently.</p>
              </div>

              <div className="color__palette flipFolder__color" data-aos="fade-up" data-aos-duration="800">
                <h3>Colors</h3>
                <div className="brand__colors">
                  <h5>Brand Colors</h5>
                  <div className="color-inr">
                    <span className="color color-red"></span>
                    <p>
                      Primary / <span>#E7584A</span>
                    </p>
                  </div>
                </div>

                <div className="other__colors tribe__color">
                  <h5>Other Secondary Colors</h5>
                  <div className="color-inr">
                    <span className="color color-cream"></span>
                    <p>
                      <span>#FEFEF4</span>
                    </p>
                  </div>
                  <div className="color-inr">
                    <span className="color color-black"></span>
                    <p>
                      <span>#263D4A</span>
                    </p>
                  </div>
                  <div className="color-inr">
                    <span className="color color-white"></span>
                    <p>
                      <span>#F1F1F1</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="typography flipFolder__typography" data-aos="fade-up" data-aos-duration="800">
                <h3>Typography</h3>

                <div className="font__family">
                  <h2>Montserrat</h2>

                  <div className="font__table">
                    <div className="font__heading">
                      <h5>Name</h5>
                      <h5>Font size</h5>
                      <h5>Line Height</h5>
                    </div>

                    <div className="font__body">
                      <div className="font__row">
                        <div className="font__data">
                          <div className="large">
                            <span className="bold">Large Text Bold</span>
                            <span className="regular">Large Text Regular</span>
                          </div>
                        </div>

                        <div className="font__data">
                          <h5>20</h5>
                        </div>

                        <div className="font__data">
                          <h5>28 px</h5>
                        </div>
                      </div>

                      <div className="font__row">
                        <div className="font__data">
                          <div className="medium">
                            <span className="bold">Medium Text Bold</span>
                            <span className="regular">Medium Text Regular</span>
                          </div>
                        </div>

                        <div className="font__data">
                          <h5>18</h5>
                        </div>

                        <div className="font__data">
                          <h5>25.2px</h5>
                        </div>
                      </div>

                      <div className="font__row">
                        <div className="font__data">
                          <div className="normal">
                            <span className="bold">Normal Text Bold</span>
                            <span className="regular">Normal Text Regular</span>
                          </div>
                        </div>

                        <div className="font__data">
                          <h5>16</h5>
                        </div>

                        <div className="font__data">
                          <h5>22.4 px</h5>
                        </div>
                      </div>

                      <div className="font__row">
                        <div className="font__data">
                          <div className="small">
                            <span className="bold">Small Text Bold</span>
                            <span className="regular">Small Text Regular</span>
                          </div>
                        </div>

                        <div className="font__data">
                          <h5>14</h5>
                        </div>

                        <div className="font__data">
                          <h5>19.6 px</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container" data-aos="fade-up" data-aos-duration="800">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="content__box">
                <h3>Updated Look and Feel</h3>
                <p>The new design presents a modern, user-centric interface that makes it easy for band directors to navigate and utilize the app. The layout is clean and intuitive, ensuring users can quickly find music and manage rehearsals with minimal effort.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row gx-0">
          <div className="col-lg-6 col-md-6">
            <div className="img__fullWidth" data-aos="fade-up" data-aos-duration="800">
              <img src="assets/img/flipfolder-02.jpg" alt="" />
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="img__fullWidth" data-aos="fade-up" data-aos-duration="800">
              <img src="assets/img/flipfolder-03.jpg" alt="" />
            </div>
          </div>
        </div>

        <div className="img__fullWidth" data-aos="fade-up" data-aos-duration="800">
          <img src="assets/img/flipfolder-04.jpg" alt="" />
        </div>

        <div className="img__fullWidth" data-aos="fade-up" data-aos-duration="800">
          <img src="assets/img/flipfolder-05.jpg" alt="" />
        </div>

        <div className="container" data-aos="fade-up" data-aos-duration="800">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="content__box">
                <h3>How Fifilo Designs Drives Value for FlipFolder</h3>
                <p>Fifilo Designs provided Flip Folder with a polished and user-friendly app that enhances its value for band directors. The streamlined interface not only improves usability but also positions Flip Folder as a leading solution for marching bands, driving higher user engagement and satisfaction in the competitive landscape of digital music solutions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="our__work bg__dark explore__more rn__section__gapTop">
        <div className="container">
          <div className="main__heading" data-aos="fade-up" data-aos-duration="800">
            <h2>
              Explore <span> More Projects</span>
            </h2>
          </div>
          <div className="inner__gapTop row">
            <div className="col-lg-6 col-md-6" data-aos="fade-right" data-aos-duration="800">
              <div className="card__caseStudies">
                <div className="top__keywords">
                  <span>Website Development</span>
                  <span>UI/UX Design</span>
                </div>
                <h4>
                  <NavLink to="/tw-challenge/">
                    TWChallenge{" "}
                    <img src="./assets/img/arrow-up-right.svg" alt="case-studies" />
                  </NavLink>
                </h4>
                <p>Cultivating culture of engagement</p>
                <div className="img__box">
                  <NavLink to="/tw-challenge/">
                    <img src="./assets/img/cs-6.png" alt="case-studies" />
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6" data-aos="fade-left" data-aos-duration="800">
              <div className="card__caseStudies">
                <div className="top__keywords">
                  <span>UI/UX Design</span>
                  <span>Website Developmenty</span>
                </div>
                <h4>
                  <NavLink to="/festive-folks/">
                    Festive Folks{" "}
                    <img src="assets/img/arrow-up-right.svg" alt="case-studies" />
                  </NavLink>
                </h4>
                <p>Take your shopping Fashion needs to next level</p>
                <div className="img__box">
                  <NavLink to="/festive-folks/">
                    <img src="./assets/img/cs-5.png" alt="" />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
