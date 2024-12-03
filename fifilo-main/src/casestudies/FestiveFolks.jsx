import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import $ from "jquery";
import { another, getdata } from "./New";
import AOS from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";

export default function FestiveFolks() {
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
        <title>Festive Folks Case Study | UI/UX Design & Website Development for E-Commerce</title>
        <meta
          name="description"
          content="Discover how we enhanced Festive Folks' e-commerce platform with UI/UX design and website development. Our solution provided a seamless shopping experience with personalized recommendations, secure payments, and intuitive navigation for festive and holiday products."
        />
        <meta
          name="keywords"
          content="Festive Folks UI/UX design, e-commerce website development, holiday shopping platform, seasonal products website, user-friendly interface, secure payment options, personalized recommendations, festive apparel and accessories, online shopping experience"
        />
      </Helmet>
      <div className="caseStudies__bnr festiveFolks__bnr">
        <div className="container">
          <div className="top__bx" data-aos="fade-up" data-aos-duration="800">
            <h1>Festive Folks</h1>
            <h6>Take your shopping Fashion needs to next level</h6>
          </div>
          <div className="center__bx" data-aos="fade-up" data-aos-duration="900">
            <p>How did we help them:</p>
            <h6>UI/UX Design</h6>
            <h6>Website Development</h6>
          </div>
          <div className="bottom__bx" data-aos="fade-up" data-aos-duration="1000">
            <img src="assets/img/festive-folks-bnr.jpg" alt="" />
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
                  Festive Folks is an innovative e-commerce platform dedicated to providing users with a seamless and enjoyable online shopping experience for all their festive needs. Specializing in
                  seasonal and holiday products, Festive Folks offers an extensive catalog of items, including apparel, and accessories tailored for various celebrations throughout the year. With a
                  user-friendly interface and intuitive navigation, shoppers can effortlessly browse, select, and purchase products, ensuring their festive preparations are hassle-free and delightful.
                  Additionally, Festive Folks features personalized recommendations, secure payment options, and reliable customer support, making it the go-to destination for anyone looking to add a
                  touch of joy and festivity to their celebrations.
                </p>
              </div>
              <div className="card__bx" data-aos="fade-up" data-aos-duration="800">
                <div>
                  <p>Client</p>
                  <h5>FestiveFolks</h5>
                </div>
                <div>
                  <p>Timeline</p>
                  <h5>6 Months</h5>
                </div>
                <div>
                  <p>Screens</p>
                  <h5>15+</h5>
                </div>
                <div>
                  <p>Business Type</p>
                  <h5>E-Commerce</h5>
                </div>
              </div>
            </div>

            <div className="col-lg-10">
              <div className="row">
                <div className="col-12">
                  <div className="content__box" data-aos="fade-up" data-aos-duration="800">
                    <h3>Core Issue We Addressed</h3>
                    <p>The previous Festive Folks website lacked the visual appeal and functionality needed to match its vibrant product offerings. Users found it difficult to navigate through the product
                      catalog, and the absence of personalized recommendations limited their ability to discover relevant festive items. Additionally, the website’s checkout process was cumbersome, which
                      led to high cart abandonment rates. The overall design was not optimized for mobile devices, further diminishing user satisfaction and engagement.</p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="content__box" data-aos="fade-up" data-aos-duration="800">
                    <h3>Strategy and Approach</h3>
                    <p>To address these challenges, we carried out extensive user research to understand the needs and behaviors of Festive Folks’ target audience. Our team redesigned the website with a
                      clean and modern interface, incorporating easy-to-navigate categories and enhanced search functionality. We introduced personalized product recommendations and streamlined the checkout
                      process to reduce friction and cart abandonment. The development team ensured that the website was fully responsive, providing a smooth shopping experience on mobile devices. Additionally,
                      we optimized the platform for SEO and integrated secure, user-friendly payment options to build trust with customers.</p>
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
                <p>
                  As a team, we collaborated on the style guide to ensure consistency and enhance the overall quality of the product. Our primary focus was on typography, icons, and updating colors to
                  align with WCAG standards.
                </p>

                <p>To achieve a cohesive and unified look across all elements, we led the creation of the component library. This involved developing components and variants.</p>
              </div>

              <div className="color__palette festiveFolks__color" data-aos="fade-up" data-aos-duration="800">
                <h3>Colors</h3>
                <div className="brand__colors">
                  <h5>Brand Colors</h5>
                  <div className="color-inr">
                    <span className="color color-pink"></span>
                    <p>
                      Pink / <span>#DF2096</span>
                    </p>
                  </div>
                  <div className="color-inr">
                    <span className="color color-beige"></span>
                    <p>
                      Beige / <span>#EDE4D3</span>
                    </p>
                  </div>
                </div>

                <div className="other__colors festiveFolks__color">
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

              <div className="typography festive__typography" data-aos="fade-up" data-aos-duration="800">
                <h3>Typography</h3>

                <div className="font__family">
                  <h2>
                    PT Sans, <span>SF Pro Display</span>
                  </h2>

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
              <img src="assets/img/festive-folks-img-01.jpg" alt="" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="img__fullWidth" data-aos="fade-up" data-aos-duration="800">
              <img src="assets/img/festive-folks-img-02.jpg" alt="" />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="content__box" data-aos="fade-up" data-aos-duration="800">
                <h3>Impact and Improvements</h3>
                <ul>
                  <li>Improved User Experience: The revamped website provided users with an enjoyable shopping journey, leading to higher satisfaction levels and repeat visits.</li>
                  <li>Higher Engagement: Personalized product recommendations and a simplified checkout process resulted in increased user interaction and longer browsing sessions.</li>
                  <li>Increased Sales: The mobile-optimized design and improved navigation led to a notable increase in completed purchases and reduced cart abandonment rates.</li>
                  <li>Enhanced Visibility: SEO improvements helped Festive Folks rank higher in search engine results, driving more organic traffic to the platform.</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="content__box" data-aos="fade-up" data-aos-duration="800">
                <h3>How Fifilo Designs Drives Value for Festive Folks</h3>
                <p>By implementing a comprehensive redesign and optimizing the user journey, Festive Folks transformed its platform into a more engaging, user-friendly experience.
                  The website now supports seamless navigation, personalized shopping, and secure transactions, resulting in increased sales and customer loyalty. This digital
                  transformation positions Festive Folks as a leading e-commerce platform for festive products, providing users with a delightful and stress-free shopping experience
                  across all devices. Moving forward, the platform is well-equipped to support future growth and continue delivering joy to customers during festive seasons.</p>
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

            <div className="col-lg-6 col-md-6" data-aos="fade-left" data-aos-duration="800">
              <div className="card__caseStudies">
                <div className="top__keywords">
                  <span>UI/UX Design</span>
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
          </div>
        </div>
      </div>
    </>
  );
}
