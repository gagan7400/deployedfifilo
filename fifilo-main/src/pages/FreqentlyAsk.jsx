import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import DOMPurify from 'dompurify';
import { useSelector, useDispatch } from 'react-redux'
import { getPublishFaqPage } from '../redux/actions/faqAction';

export default function FreqentlyAsk() {
  let dispatch = useDispatch();
  let { publishedfaqdata, publishedfaqloading } = useSelector((state) => state.faq);
  useEffect(() => {
    dispatch(getPublishFaqPage());
  }, [dispatch])

  useEffect(() => {
    AOS.init();
  }, [publishedfaqdata]);

  return (
    <>
      <div className="faq__section dark__bnr rn__section__gapTop">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div
                className="main__heading"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <p dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(!publishedfaqloading && publishedfaqdata ? publishedfaqdata.heroSection.heading : `FAQ’s`)
                }} />
                <h2 dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(!publishedfaqloading && publishedfaqdata ? publishedfaqdata.heroSection.subHeading : `Frequently Asked
                  Questions`)
                }} />
              </div>
            </div>
            <div className="col-lg-8 col-md-8">
              <div className="accordion" id="accordionExample">
                {!publishedfaqloading && publishedfaqdata?.faqSection.map((v, i) => {
                  return <div className="accordion-item" data-aos="fade-up" data-aos-duration="900" key={i + 1}>
                    <h2 className="accordion-header" id={`heading${i + 1}`}>
                      <button className={`accordion-button ${i !== 0 && 'collapsed'} `} type="button" data-bs-toggle="collapse"
                        data-bs-target={`#collapse${i + 1}`} aria-expanded={`${i == 0}`} aria-controls={`collapse${i + 1}`}>
                        {v.question ? v.question : "What is Webflow and why is it the best website builder?"}
                      </button>
                    </h2>
                    <div id={`collapse${i + 1}`} className={`accordion-collapse collapse ${i == 0 ? "show" : ""}`} aria-labelledby={`heading${i == 0 ? i : i + 2}`}
                      data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <h6>{v.answer ? v.answer : `Vitae congue eu consequat ac felis placerat vestibulum lectus mauris ultrices. Cursus sit amet
                            dictum sit amet justo donec enim diam porttitor lacus luctus accumsan tortor posuere.`}</h6>
                      </div>
                    </div>
                  </div>
                })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
