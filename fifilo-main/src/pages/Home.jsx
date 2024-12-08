import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import FreqentlyAsk from "./FreqentlyAsk";
import $ from "jquery";
import AOS from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";
import Loader from "../layout/Loader";
import useCursorPosition from "../layout/useCursorPosition";
import { getpublishHomePage } from "../redux/actions/homeAction";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from 'dompurify';
import axios from "axios";

export default function Home() {
  useCursorPosition('dark__bnr');
  let dispatch = useDispatch();
  let { publishedhomepage, homeloading } = useSelector((state) => state.homepage);
  let [casestudies, setCasestudies] = useState(null);
  const [loading, setLoading] = useState(true);

  let alldata = async () => {
    try {
      let { data } = await axios.get('/admin/casestudy/getcasestudy');
      if (data.success) {
        setCasestudies(data.data);
        setLoading(false)
      } else {
        setCasestudies(null);
        alert("error occured");
      }
    } catch (error) {
      setCasestudies(null)
      setCasestudies(null);
    }
  }
  useEffect(() => {
    dispatch(getpublishHomePage());
    alldata();
  }, [dispatch])

  useEffect(() => {
    $(document).ready(function () {
      // Initial setup
      $('.service__inr').css({ height: '0', overflow: 'hidden' });
      $('.services__img').css({ width: '102px', transition: 'width 0.5s ease' });

      // Event handling for mouse enter
      $('.services__card').on('mouseenter', function () {
        $('.services__card').removeClass('active');
        $(this).addClass('active');

        $('.service__inr').not($(this).find('.service__inr')).stop().animate({ height: '0' }, 300, function () {
          $(this).css({ 'will-change': 'auto', overflow: 'hidden' });
        });

        var serviceInr = $(this).find('.service__inr');
        var newHeight = serviceInr.get(0).scrollHeight;
        serviceInr.css({ 'will-change': 'height', overflow: 'hidden' });
        serviceInr.stop().animate({ height: newHeight }, 300, function () {
          $(this).css({ 'will-change': 'auto', overflow: 'visible' });
        });

        $('.services__img').css({ width: '102px' });
        $(this).find('.services__img').css({ width: '100%' });

        // Refresh AOS
        AOS.refresh();
      });

      // Event handling for mouse leave
      $('.services__card').on('mouseleave', function () {
        $(this).removeClass('active');

        var serviceInr = $(this).find('.service__inr');
        serviceInr.stop().animate({ height: '0' }, 300, function () {
          $(this).css({ 'will-change': 'auto', overflow: 'hidden' });
        });

        $(this).find('.services__img').css({ width: '102px' });
      });

      // Initialize AOS
      AOS.init();
    });

    $(document).ready(function () {
      var h2Tag = $(".about__section h2");
      var hasClass = false;

      $(window).scroll(function () {
        var aboutSection = $(".about__section h2");
        var offset = aboutSection.offset();

        if (offset) {
          var windowHeight = $(window).height();
          var scrollPos = $(window).scrollTop();

          if (scrollPos + windowHeight > offset.top) {
            if (!hasClass) {
              h2Tag.addClass("color-change");
              hasClass = true;
            }
          } else {
            if (hasClass) {
              h2Tag.removeClass("color-change");
              hasClass = false;
            }
          }
        }
      });
    });
  }, [publishedhomepage]);

  useEffect(() => {
    const handleScroll = () => {
      const $video = $("#testimonialsVideo");

      if ($video.length) {
        const rect = $video[0].getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

        if (isVisible) {
          $video[0].play().catch((error) => {
            console.error("Error playing video:", error);
          });
        } else {
          $video[0].pause();
        }
      }
    };

    const handleUserInteraction = () => {
      $(document).on("scroll", handleScroll);
      $(document).off("click keydown", handleUserInteraction);
    };
    $(document).on("click keydown", handleUserInteraction);

    return () => {
      $(document).off("scroll", handleScroll);
      $(document).off("click keydown", handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    AOS.init();
  }, [publishedhomepage]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "./assets/js/custom.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [publishedhomepage]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(false);
    };
    loadData();
    return () => {
    };
  }, []);
  return (
    <>
      <Helmet>
        <title>{(!homeloading && publishedhomepage) && publishedhomepage.seoSection.title}</title>
        <meta name='keywords' content={(!homeloading && publishedhomepage) && publishedhomepage.seoSection.keywords} />
        <meta name='description' content={(!homeloading && publishedhomepage) && publishedhomepage.seoSection.description} />
        {(!homeloading && publishedhomepage) && publishedhomepage.seoSection.seoImg.filename && <meta property="og:image" content={`/images/${(!homeloading && publishedhomepage) && publishedhomepage.seoSection.seoImg.filename}`} />}
        <meta property="og:image:alt" content="Description of the feature image" />
      </Helmet>
      <div className="hero__bnr dark__bnr">
        {homeloading && <Loader />}
        <div className="container">
          <div className="bnr__content">
            <h1 data-aos="fade-up" data-aos-duration="800" dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(!homeloading && publishedhomepage ? publishedhomepage.heroSection.heading : ``)
            }} />
            <h6 data-aos="fade-up" data-aos-duration="800" dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(!homeloading && publishedhomepage ? publishedhomepage.heroSection.subHeading : ``)
            }} />
            {!homeloading && publishedhomepage &&
              <><NavLink data-aos="fade-up" data-aos-duration="800" to={!homeloading && publishedhomepage ? publishedhomepage.heroSection.heroButtons.CTA1.url : ""} className="button first">{!homeloading && publishedhomepage ? publishedhomepage.heroSection.heroButtons.CTA1.name : ""}<span></span></NavLink>
                <NavLink data-aos="fade-up" data-aos-duration="800" to={!homeloading && publishedhomepage ? publishedhomepage.heroSection.heroButtons.CTA2.url : ""} className="button second">{!homeloading && publishedhomepage ? publishedhomepage.heroSection.heroButtons.CTA2.name : ""}<span></span></NavLink>
                <NavLink data-aos="fade-up" data-aos-duration="800" to={!homeloading && publishedhomepage ? publishedhomepage.heroSection.heroButtons.CTA3.url : ""} className="button third">{!homeloading && publishedhomepage ? publishedhomepage.heroSection.heroButtons.CTA3.name : ""}<span></span></NavLink></>}
          </div>
        </div>
      </div>

      <div className="about__section rn__section__gapTop">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <h2 data-aos="fade-up" data-aos-duration="800" dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(!homeloading && publishedhomepage ? publishedhomepage.aboutSection : ``)
              }} />
            </div>
          </div>
        </div>
      </div>

      <div className="our__work rn__section__gapTop dark__bnr">
        <div className="container">
          <div className="main__heading" data-aos="fade-up" data-aos-duration="800">
            <p>Our work</p>
            <h2>
              Featured <span>Case Studies</span>
            </h2>
          </div>
          <div className="inner__gapTop row">
            {!loading && casestudies && casestudies.slice(0, 3).map((card, index) => (
              <div className="col-12" key={index} data-aos={index % 2 === 0 ? "fade-right" : "fade-left"} data-aos-duration="800">
                <div className="card__caseStudies">
                  <div className="top__keywords">
                    {card.heroSection.workButtons.map((btn, i) => (
                      <span key={i}>{btn.name}</span>
                    ))}
                  </div>
                  <h4>
                    <NavLink to={`/${card.heroSection.pageName}/`}>
                      {card.heroSection.casestudyName}{" "}
                      <img src="assets/img/arrow-up-right.svg" alt="case-studies" />
                    </NavLink>
                  </h4>
                  <p>{card.heroSection.description}</p>
                  <div className="img__box"  >
                    <NavLink to={`/${card.heroSection.pageName}/`} >
                      <img src={(card.heroSection.homeImg && card.heroSection.homeImg.filename) && `/images/${card.heroSection.homeImg.filename}`} alt={card.heroSection.casestudyName} />
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}

          </div>
          <div className="inner__gapTop" data-aos="fade-up" data-aos-duration="800">
            <NavLink to="/case-studies/" className="btn btn__primary m-auto">
              VIEW ALL <img src="assets/img/arrow-up-right.svg" alt="case-studies" />
            </NavLink>
          </div>
        </div>
      </div>

      <div className="our__services rn__section__gapTop">
        <div className="container">
          <div className="main__heading" data-aos="fade-up" data-aos-duration="800">
            <p dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(!homeloading && publishedhomepage ? publishedhomepage.servicesSection.preHeading : ``)
            }} />
            <h2 dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(!homeloading && publishedhomepage ? publishedhomepage.servicesSection.heading : ``)
            }} />
          </div>
          <div className="inner__gapTop row justify-content-center">
            <div className="col-lg-10">
              {(!homeloading && publishedhomepage) ? publishedhomepage.servicesCardSection.map((service, i) => {
                return <div key={i}> <div className="services__card">
                  <div className="row gx-3" data-aos="fade-up" data-aos-duration={(8 + i) * 100}>
                    <div className="col-lg-9">
                      <div className="content__box">
                        <h2 dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(service.heading)
                        }} />

                        <div className="service__inr">
                          <h6 dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(service.description)
                          }} />
                          <NavLink to={service.buttonUrl} className="btn btn__primary">
                            {service.buttonText} <img src="assets/img/arrow-up-right.svg" alt="home" />
                          </NavLink>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 d-none d-lg-block">
                      <div className="services__img">
                        <img src={`/images/${service.serviceImgs && service.serviceImgs.filename}`} alt={service.heading} />
                      </div>
                    </div>
                  </div>
                </div>
                  {(i !== publishedhomepage.servicesCardSection.length - 1) && <div className="brdr" data-aos="fade-up" data-aos-duration={(9 + i) * 100}></div>}
                </div>
              }) : ""}
            </div>
          </div>
        </div>
      </div>

      <div className="our__testimonials rn__section__gapTop">
        <div className="main__heading" data-aos="fade-up" data-aos-duration="800">
          <p dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(!homeloading && publishedhomepage ? publishedhomepage.testimonialSection.preHeading : ``)
          }} />
          <h2 dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(!homeloading && publishedhomepage ? publishedhomepage.testimonialSection.heading : ``)
          }} />
        </div>

        <div className="inner__gapTop" data-aos="fade-up" data-aos-duration="800">
          <div className="slider__card">
            {!homeloading && publishedhomepage && publishedhomepage.reviewsSection.length > 0 && (
              <div className="testimonials__slide owl-carousel" data-aos="fade-up" data-aos-duration="800">
                {publishedhomepage.reviewsSection.map((item, index) => (
                  <div className="item__slide" key={index} data-aos="fade-up" data-aos-duration="800">
                    <div className="img__bx">
                      <img src={item.clientImgs && item.clientImgs.filename ? `/images/${item.clientImgs.filename}` : "assets/imgs/avatar.svg"} alt="clients" />
                    </div>
                    <div className="content__box">
                      <h6>
                        <span dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(item.company ? item.company : "")
                        }} />
                      </h6>
                      <h6 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.description ? item.description : ``) }} />
                      <p dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(item.clientName ? item.clientName : "")
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="our__clients rn__section__gapTop">
        <div className="container">
          <div className="main__heading">
            <p dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(!homeloading && publishedhomepage ? publishedhomepage.clientSection.heading : ``)
            }} />
            <h2 dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(!homeloading && publishedhomepage ? publishedhomepage.clientSection.subHeading : ``)
            }} />
          </div>
          <div className="row inner__gapTop gx-0">
            {!homeloading && publishedhomepage && publishedhomepage.clientSection.clientLogos.length > 0 && (
              <>
                {!homeloading && publishedhomepage.clientSection.clientLogos.map((card, index) => {
                  return <div className="col-lg-2 col-md-2 col-6" key={index}>
                    <div className="card__logo">
                      <img src={card ? `/images/${card && card.filename}` : "assets/img/clients-logo-01.png"} data-aos="zoom-in" data-aos-duration="1200" alt="clients-logo" />
                    </div>
                  </div>
                })
                }
              </>
            )}
          </div>
        </div>
      </div>

      <FreqentlyAsk />
    </>
  );
}
