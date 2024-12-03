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
        <title>TribeStays Case Study | UI/UX Redesign & Development for Premium Student Living</title>
        <meta
          name="description"
          content="See how we transformed TribeStays' digital presence with a modern UI/UX redesign and development. Our solution highlighted luxury, streamlined booking, and improved user engagement for their premium student hostels and co-living spaces."
        />
        <meta
          name="keywords"
          content="TribeStays UI/UX redesign, TribeStays website development, student hostel website design, co-living space UI/UX, premium student living redesign, responsive design, user experience improvement, luxury student hostels, TribeStays digital transformation"
        />
      </Helmet>
      <div className="caseStudies__bnr tribeStays__bnr">
        <div className="container">
          <div className="top__bx" data-aos="fade-up" data-aos-duration="800">
            <h1>TribeStays</h1>
            <h6>Creating a new hub for vital research & resources</h6>
          </div>
          <div className="center__bx" data-aos="fade-up" data-aos-duration="900">
            <p>How did we help them:</p>
            <h6>Development</h6>
            <h6>UI/UX Design</h6>
          </div>
          <div className="bottom__bx" data-aos="fade-up" data-aos-duration="1000">
            <img src="assets/img/tribe-stays-bnr.jpg" alt="banner" />
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
                  TribeStays is a rapidly growing startup that offers premium student hostels and co-living spaces designed to provide an immersive and luxurious living experience for students.
                  However, despite their unique offerings, they face a significant challenge. Their existing user interface (UI) and user experience (UX) design are outdated and do not effectively
                  communicate the luxury and convenience their properties provide. This is hampering their ability to attract and retain customers, limiting their growth potential.
                </p>
              </div>
              <div className="card__bx" data-aos="fade-up" data-aos-duration="800">
                <div>
                  <p>Client</p>
                  <h5>TribeStays</h5>
                </div>
                <div>
                  <p>Timeline</p>
                  <h5>6 Months</h5>
                </div>
                <div>
                  <p>Screens</p>
                  <h5>120+</h5>
                </div>
                <div>
                  <p>Business Type</p>
                  <h5>Hospitality & Real Estate</h5>
                </div>
              </div>
            </div>

            <div className="col-lg-10">
              <div className="row">
                <div className="col-12">
                  <div className="content__box" data-aos="fade-up" data-aos-duration="800">
                    <h3>Core Issue We Addressed</h3>
                    <p>
                      TribeStays is a rapidly growing startup that offers premium student hostels and co-living spaces designed to provide an immersive and luxurious living experience for students.
                      However, despite their unique offerings, they face a significant challenge. Their existing user interface (UI) and user experience (UX) design are outdated and do not effectively
                      communicate the luxury and convenience their properties provide. This is hampering their ability to attract and retain customers, limiting their growth potential.
                    </p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="content__box" data-aos="fade-up" data-aos-duration="800">
                    <h3>Strategy and Approach</h3>
                    <p>
                      To address the challenge of TribeStays' outdated UI/UX design, a comprehensive redesign of their digital presence is essential. This involves creating a modern, user-friendly,
                      and visually appealing interface that effectively highlights the luxury and convenience of their premium student hostels and co-living spaces. The redesign should include
                      high-quality visuals, simplified navigation, and enhanced features such as advanced search options, virtual tours, and personalized user experiences. Additionally, the booking
                      process needs to be streamlined for ease and transparency. By implementing a responsive design that works seamlessly across all devices and incorporating regular updates based on
                      user feedback, TribeStays can significantly improve user satisfaction and engagement. This will lead to increased conversion rates, better customer retention, and a stronger
                      brand perception, ultimately supporting TribeStays' growth and scalability in the competitive market.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-10">
              <div className="img__box">
                <div className="img__fullWidth" data-aos="fade-up" data-aos-duration="800">
                  <img src="assets/img/ts-img-01.jpg" alt="" />
                </div>
                <div className="bottom__box" data-aos="fade-up" data-aos-duration="800">
                  <div className="img__comnHeight">
                    <img src="assets/img/ts-img-02.png" alt="" />
                  </div>
                  <div className="img__comnHeight">
                    <img src="assets/img/ts-img-03.jpg" alt="" />
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
          <img src="assets/img/wireframe-tribe.jpg" alt="" />
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

              <div className="color__palette tribe__color" data-aos="fade-up" data-aos-duration="800">
                <h3>Colors</h3>
                <div className="brand__colors">
                  <h5>Brand Colors</h5>
                  <div className="color-inr">
                    <span className="color color-primary"></span>
                    <p>
                      Primary / <span>#E3431E</span>
                    </p>
                  </div>
                  <div className="color-inr">
                    <span className="color color-secondary"></span>
                    <p>
                      Secondary / <span>#CCC3B9</span>
                    </p>
                  </div>
                </div>

                <div className="other__colors tribe__color">
                  <h5>Other Secondary Colors</h5>
                  <div className="color-inr">
                    <span className="color color-black"></span>
                    <p>
                      <span>#000000</span>
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

              <div className="typography tribe__typoGraphy" data-aos="fade-up" data-aos-duration="800">
                <h3>Typography</h3>

                <div className="font__family">
                  <h2>Overpass</h2>

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
                  As a team, we collaborated on the style guide to ensure consistency and enhance the overall quality of the product. Our primary focus was on typography, icons, and updating colors to
                  align with WCAG standards.
                </p>

                <p>To achieve a cohesive and unified look across all elements, we led the creation of the component library. This involved developing components and variants.</p>
              </div>
            </div>

            <div className="col-lg-10">
              <div className="img__fullWidth" data-aos="fade-up" data-aos-duration="800">
                <img src="assets/img/ts-img-04.jpg" alt="" />
              </div>
            </div>

            <div className="col-lg-10">
              <div className="img__fullWidth" data-aos="fade-up" data-aos-duration="800">
                <img src="assets/img/ts-img-05.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="img__fullWidth img__withBg" data-aos="fade-up" data-aos-duration="800">
          <img src="assets/img/ts-img-06.jpg" alt="" />
        </div>

        <div className="container" data-aos="fade-up" data-aos-duration="800">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="content__box">
                <h3>How Fifilo Designs Drives Value for TribeStays</h3>
                <p>
                  By implementing a comprehensive UI/UX redesign and integrating advanced features such as virtual tours, and a streamlined booking process, TribeStays will significantly enhance its
                  platform's usability and aesthetic appeal. This transformation will lead to increased user engagement and satisfaction, higher customer acquisition and retention rates, and a
                  stronger brand perception of luxury and quality.
                </p>
                <p>
                  The updated platform will also support broader market reach and operational efficiencies, ultimately driving higher occupancy rates, increased revenue, and sustained growth. As a
                  result, TribeStays will establish itself as a market leader in premium student housing, offering an immersive and convenient living experience that fosters customer loyalty and
                  advocacy.
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
                  <span>UI/UX De sign</span>
                  <span>Website Developmen</span>
                </div>
                <h4>
                  <NavLink to="/spv-mortgages/">
                    SPV Mortgages{" "}
                    <img src="assets/img/arrow-up-right.svg" alt="case-studies" />
                  </NavLink>
                </h4>
                <p>Maximizing Tax Efficiency with SPV Limited Company Mortgages</p>
                <div className="img__box">
                  <NavLink to="/spv-mortgages/">
                    <img src="./assets/img/cs-4.png" alt="" />
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
