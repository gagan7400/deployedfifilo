import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { NavLink, useLocation } from "react-router-dom";
import useCursorPosition from "../layout/useCursorPosition";
import { useSelector, useDispatch } from 'react-redux'
import { getpublishServicePage } from '../redux/actions/servicesAction';
import DOMPurify from 'dompurify';
import Loader from "./Loader";

export default function Services() {
  useCursorPosition('dark__bnr');
  let dispatch = useDispatch();
  let { publishedServicePage, publishedServiceLoading } = useSelector(state => state.services)
  useEffect(() => {
    if (!publishedServicePage) {
      dispatch(getpublishServicePage())

    }

  }, [dispatch])
  const location = useLocation();
  useEffect(() => {
    AOS.init();
  }, [publishedServicePage]);

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '').toLowerCase(); // Convert to lowercase for case-insensitive matching
      const observer = new MutationObserver(() => {
        // Use querySelector with [id] to match section id case-insensitively
        const sectionElement = document.querySelector(`[id="${sectionId}"], [id="${location.hash.replace('#', '')}"]`);
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: 'smooth' });
          observer.disconnect(); // Stop observing once the element is found
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });

      return () => observer.disconnect(); // Cleanup
    }
  }, [location]);


  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1)); // Remove `#` and get the ID
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the section
      }
    }
  }, [location]);
  return (
    <>
      {publishedServiceLoading && !publishedServicePage ? <Loader /> : <>
        <Helmet>
          <title>{(!publishedServiceLoading && publishedServicePage) && publishedServicePage.seoSection.title}</title>
          <meta name="keywords" content={(!publishedServiceLoading && publishedServicePage) && publishedServicePage.seoSection.keywords} />
          <meta name="description" content={(!publishedServiceLoading && publishedServicePage) && publishedServicePage.seoSection.description} />
          {(!publishedServiceLoading && publishedServicePage) && publishedServicePage.seoSection.seoImg.filename && <meta property="og:image" content={`/images/${(!publishedServiceLoading && publishedServicePage) && publishedServicePage.seoSection.seoImg.filename}`} />}
          <meta property="og:image:alt" content="Description of the feature image" />
        </Helmet>

        <div className="comn__bnr service__bnr">
          <div className="container">
            <div className="bnr__content">
              <div className="left__bx" data-aos="fade-up" data-aos-duration="800">
                <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(!publishedServiceLoading && publishedServicePage ? publishedServicePage.heroSection.heading : "") }} />
                <h6 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(!publishedServiceLoading && publishedServicePage ? publishedServicePage.heroSection.subHeading : "") }} />
              </div>
              <div data-aos="fade-up" data-aos-duration="800">
                <NavLink to={!publishedServiceLoading && publishedServicePage ? publishedServicePage.heroSection.heroButtons.CTA1.url : ""} className="btn">{!publishedServiceLoading && publishedServicePage ? publishedServicePage.heroSection.heroButtons.CTA1.name : ""}<span></span></NavLink>
              </div>
              <div className="animation-wrapper service-anmation">
                <div className='animationsphare'>
                  <div className='ring1'></div>
                  <div className='ring2'></div>
                  <div className='ring3'></div>
                  <div className='ring4'></div>
                  <div className='ring5'></div>
                  <div className='ring6'></div>
                  <div className='ring7'></div>
                  <div className='ring8'></div>
                  <div className='ring9'></div>
                  <div className='ring10'></div>
                  <div className='ring11'></div>
                  <div className='ring12'></div>
                  <div className='ring13'></div>
                  <div className='ring14'></div>
                  <div className='ring15'></div>
                  <div className='ring16'></div>
                  <div className='ring17'></div>
                  <div className='ring18'></div>
                  <div className='ring19'></div>
                  <div className='ring20'></div>
                  <div className='ring21'></div>
                  <div className='ring22'></div>
                  <div className='ring23'></div>
                  <div className='ring24'></div>
                  <div className='ring25'></div>
                  <div className='ring26'></div>
                  <div className='ring27'></div>
                  <div className='ring28'></div>
                  <div className='ring29'></div>
                  <div className='ring30'></div>
                  <div className='ring31'></div>
                  <div className='ring32'></div>
                  <div className='ring33'></div>
                  <div className='ring34'></div>
                  <div className='ring35'></div>
                  <div className='ring36'></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!publishedServiceLoading && publishedServicePage ? publishedServicePage.servicesCards.map((v, i) => {
          return <div key={i + 1} className={`comn__serviceBox ${v.cardName}  ${Number(i) % 2 == 0 ? "lite__bnr" : "dark__bnr"} rn__section__gapTop  `} id={v.cardId}>
            <div className="container">
              <div className="row">
                <div className="col-lg-7 col-md-6">
                  <div className="left__bx">
                    <div data-aos="fade-up" data-aos-duration="800">
                      <h2>
                        <span>0{i + 1}</span>
                      </h2>
                      <h2>{v.cardName}</h2>
                    </div>

                    <div className={`shapes shapes-${i + 1}`}></div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-6">
                  <div className="right__bx">
                    {v.cardDescription.map((value, index) => {
                      return <h6 key={index} data-aos="fade-up" data-aos-duration="800"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(value)
                        }} />
                    })}

                    <div className="listing__bx" data-aos="fade-up" data-aos-duration="800"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(v.cardList)
                      }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }) : ""
        }

        <div className="our__tools rn__section__gapTop">
          <div className="container">
            <div className="main__heading" data-aos="fade-up" data-aos-duration="800">
              <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(!publishedServiceLoading && publishedServicePage ? publishedServicePage.toolSection.heading : "") }} ></h2>
            </div>

            <div className="row gx-lg-4 gx-md-3 gx-2 inner__gapTop justify-content-center">
              {!publishedServiceLoading && publishedServicePage ? publishedServicePage.toolSection.toolsLogo.map((img, index) => {
                return <div className="col-lg-3 col-md-4 col-6" key={index}>
                  <div className="card__bx">
                    <img src={img && img.filename ? `/images/${img.filename}` : ''} data-aos="zoom-in" alt="card__bx" />
                  </div>
                </div>
              }) : ""}
            </div>
          </div>
        </div>
      </>}
    </>
  );
}
