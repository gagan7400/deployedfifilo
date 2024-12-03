import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import $ from "jquery";
import { another, getdata } from "./New";
import AOS from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";

export default function Interact() {
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
        <title>Interact Case Study | UI/UX Revamp with AI, React & NodeJS</title>
        <meta
          name="description"
          content="Explore how we enhanced Interact's UI/UX with AI integration, React, and NodeJS. Our solution improved real-time guidance, added transcription and noise cancellation features, and personalized the user experience for better sales performance."
        />
        <meta
          name="keywords"
          content="Interact UI/UX redesign, AI integration, React development, NodeJS solutions, sales tool UI/UX, transcription features, noise cancellation, user personalization, SaaS prospecting tool, real-time guidance"
        />
      </Helmet>
      <div className="caseStudies__bnr interact__bnr">
        <div className="container">
          <div className="top__bx" data-aos="fade-up" data-aos-duration="800">
            <h1>Interact</h1>
            <h6>Turn all your Calls into AI-Powered conversation intelligence tools</h6>
          </div>
          <div className="center__bx" data-aos="fade-up" data-aos-duration="900">
            <p>How did we help them:</p>
            <h6>UI/UX Design</h6>
            <h6>AI</h6>
            <h6>React</h6>
            <h6>NodeJS</h6>
          </div>
          <div className="bottom__bx" data-aos="fade-up" data-aos-duration="1000">
            <img src="assets/img/interact-bnr-01.jpg" alt="" />
          </div>
        </div>
      </div>

      <div className="caseStudies__overview rn__section__gapTop">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="content__box" data-aos="fade-up" data-aos-duration="800">
                <h3>Brief Insight of the Project</h3>
                <p>
                  Interact is an innovative SaaS application designed to empower sales representatives in their prospecting efforts by offering real-time guidance, behavior analysis, and noise
                  cancellation. Interact provides sales teams with actionable insights and tailored recommendations during live interactions, helping them to engage more effectively with prospects.
                  The app leverages advanced behavior analysis to understand and predict customer responses, enabling sales representatives to adapt their strategies on the fly. Additionally,
                  Interact’s noise cancellation feature ensures clear and uninterrupted communication, allowing sales professionals to focus on their conversations without distractions. By combining
                  these powerful features into a seamless platform, Interact enhances the efficiency and effectiveness of sales prospecting, driving better outcomes and higher conversion rates.
                </p>
              </div>
              <div className="card__bx" data-aos="fade-up" data-aos-duration="800">
                <div>
                  <p>Client</p>
                  <h5>Interact</h5>
                </div>
                <div>
                  <p>Timeline</p>
                  <h5>6 Months</h5>
                </div>
                <div>
                  <p>Screens</p>
                  <h5>100+</h5>
                </div>
                <div>
                  <p>Business Type</p>
                  <h5>SaaS</h5>
                </div>
              </div>
            </div>

            <div className="col-lg-10">
              <div className="row">
                <div className="col-12">
                  <div className="content__box" data-aos="fade-up" data-aos-duration="800">
                    <h3>Core Issue We Addressed</h3>
                    <p>
                      The current UI/UX of Interact lacks intuitive real-time guidance, making it difficult for sales representatives to navigate and interpret data. Missing features like
                      transcription, AI integration, and script management in the Chrome extension hinder workflow efficiency. Additionally, the absence of a noise-cancellation feature affects call
                      quality, while the interface fails to adapt to user needs and preferences, lacking necessary personalization features.
                    </p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="content__box" data-aos="fade-up" data-aos-duration="800">
                    <h3>Strategy and Approach</h3>
                    <p>
                      To improve Interact's UI/UX for sales representatives, the following solutions are proposed: revamp the user interface for a cleaner, more intuitive design and implement
                      responsive design principles; enrich features with transcription, AI integration for deeper insights, and a script management tool within the Chrome extension; integrate noise
                      cancellation technology to enhance call quality; and incorporate personalization options and user feedback loops. These enhancements aim to boost efficiency, productivity, and
                      sales performance, positioning Interact as a leading AI-powered prospecting tool in the SaaS industry.
                    </p>
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
                <h3>Sketches/Low-fidelity Wireframes</h3>
                <p>
                  As we embarked on Panther's project, our initial step involved sketching. We transitioned concepts onto paper, envisioning screen-to-screen interactions to shape our design process.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="img__fullContainer" data-aos="fade-up" data-aos-duration="800">
          <img src="assets/img/wireframe-interact.jpg" alt="" />
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="content__box" data-aos="fade-up" data-aos-duration="800">
                <h3>Style Guide and Key Components</h3>
                <p>
                  As a team, we collaborated on the style guide to ensure consistency and enhance the overall quality of the product. Our primary focus was on typography, icons, and updating colors to
                  align with WCAG standards.
                </p>

                <p>To achieve a cohesive and unified look across all elements, we led the creation of the component library. This involved developing components and variants.</p>
              </div>

              <div className="color__palette interact__color" data-aos="fade-up" data-aos-duration="800">
                <h3>Colors</h3>
                <div className="brand__colors">
                  <h5>Brand Colors</h5>
                  <div className="color-inr">
                    <span className="color color-blue"></span>
                    <p>
                      Blue / <span>#2196F3</span>
                    </p>
                  </div>
                  <div className="color-inr">
                    <span className="color color-yellow"></span>
                    <p>
                      Yellow / <span>#FFC107</span>
                    </p>
                  </div>
                </div>

                <div className="other__colors interact__color">
                  <h5>Other Secondary Colors</h5>
                  <div className="color-inr">
                    <span className="color color-first"></span>
                    <p>
                      <span>#11142D</span>
                    </p>
                  </div>
                  <div className="color-inr">
                    <span className="color color-white"></span>
                    <p>
                      <span>#FFFFFF</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="typography" data-aos="fade-up" data-aos-duration="800">
                <h3>Typography</h3>

                <div className="font__family">
                  <h2>Poppins</h2>

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

            <div className="col-lg-10">
              <div className="content__box" data-aos="fade-up" data-aos-duration="800">
                <h3>Updated Look and Feel</h3>
                <p>
                  The new design by us features a modern, intuitive layout, clear financial information, simplified navigation, and full mobile optimization, resulting in improved user experience and
                  higher engagement.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row gx-0">
          <div className="col-md-12">
            <div className="img__fullWidth" data-aos="fade-up" data-aos-duration="800">
              <img src="assets/img/interact-img-01.jpg" alt="" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="img__fullWidth" data-aos="fade-up" data-aos-duration="800">
              <img src="assets/img/interact-img-02.jpg" alt="" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="img__fullWidth" data-aos="fade-up" data-aos-duration="800">
              <img src="assets/img/interact-img-03.jpg" alt="" />
            </div>
          </div>
          {/* <div className="col-12">
            <div className="img__fullWidth" data-aos="fade-up" data-aos-duration="800">
              <img src="assets/img/interact-img-04.jpg" alt="" />
            </div>
          </div> */}
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="content__box" data-aos="fade-up" data-aos-duration="800">
                <h3>How Fifilo Designs Drives Value for Interact</h3>
                <p>
                  After implementing these enhancements, Interact will significantly improve its UI/UX, providing sales representatives with a more intuitive, efficient, and personalized prospecting
                  tool. The platform will feature a cleaner design and responsive interface, ensuring usability across various devices. Enhanced functionalities like transcription, AI integration,
                  script management, and noise cancellation will streamline workflows, improve call quality, and offer deeper insights, leading to better decision-making. Personalization options and
                  continuous user feedback will ensure the tool evolves with user needs, increasing satisfaction and productivity. Ultimately, these improvements will solidify Interact's position as a
                  leading AI-powered prospecting tool, driving higher sales performance and user engagement.
                </p>
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
                  <span>Branding</span>
                  <span>UI/UX Design</span>
                </div>
                <h4>
                  <NavLink to="/curehub/">
                    Cure Hub{" "}
                    <img src="assets/img/arrow-up-right.svg" alt="case-studies" />
                  </NavLink>
                </h4>
                <p>Make hitting the GYM a habit you will love the App.</p>
                <div className="img__box">
                  <NavLink to="/curehub/">
                    <img src="./assets/img/cs-2.png" alt="" />
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6" data-aos="fade-left" data-aos-duration="800">
              <div className="card__caseStudies">
                <div className="top__keywords">
                  <span>Development</span>
                  <span>UI/UX Design</span>
                </div>
                <h4>
                  <NavLink to="/tribe-stays/">
                    TribeStays{" "}
                    <img src="assets/img/arrow-up-right.svg" alt="case-studies" />
                  </NavLink>
                </h4>
                <p>Creating a new hub for vital research & resources</p>
                <div className="img__box">
                  <NavLink to="/tribe-stays/">
                    <img src="./assets/img/cs-1.png" alt="" />
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
