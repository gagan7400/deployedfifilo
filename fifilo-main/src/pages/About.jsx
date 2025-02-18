import React, { useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import $ from "jquery"; // import jQuery
import AOS from "aos";
import "aos/dist/aos.css";
import DOMPurify from 'dompurify';
import { NavLink } from "react-router-dom";
import useCursorPosition from "../layout/useCursorPosition";
import { useDispatch, useSelector } from "react-redux";
import { getPublishAboutPage } from "../redux/actions/aboutAction";
import Loader from "./Loader";
function Point(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.rx = x;
  this.ry = y;
  this.rz = z;
  this.nx = 0.5 + this.x * 0.5;
  this.ny = 0.5 + this.y * 0.5;
  this.nz = 0.5 + this.z * 0.5;
  this.h = this.nx * 360;
  this.s = 50 + this.ny * 25;
  this.l = 50 + this.nz * 25;
}

export default function About() {

  useCursorPosition('dark__bnr');
  let dispatch = useDispatch();
  let { publishedData, publishedLoading } = useSelector((state) => state.about);

  useEffect(() => {
    if(!publishedData){

      dispatch(getPublishAboutPage());
    }
  }, [dispatch])
  useEffect(() => {
  if(!publishedLoading && publishedData){
    $(document).ready(function () {
      // Add 'active' class to the first .stroke-circle initially
      $(".border-section").first().find(".stroke-circle").addClass("active");
      $(".border-section").first().siblings(".col-lg-3").find(".card__bx").addClass("active");

      // Handle border section height adjustment and class addition
      $(window).on("scroll", function () {
        $(".border-section").each(function () {
          var $this = $(this);
          var $row = $this.closest(".row"); // Find the closest parent row to find the corresponding .card__bx
          var $cardBx = $row.find(".card__bx"); // Find .card__bx within the same row

          if ($this.length) {
            // Ensure the element exists
            var sectionTop = $this.offset().top;
            var sectionHeight = $this.height();
            var scrollPosition = $(window).scrollTop();
            var windowHeight = $(window).height();

            // Calculate start and end points for the section
            var startOffset = sectionTop - windowHeight * 0.4; // Adjust as needed
            var endOffset = sectionTop + sectionHeight - windowHeight * 0.4; // Adjust as needed

            var scrollPercentage = 0;

            if (scrollPosition >= startOffset && scrollPosition <= endOffset) {
              scrollPercentage = (scrollPosition - startOffset) / (endOffset - startOffset);
              // Add class to .stroke-circle and .card__bx
              $this.find(".stroke-circle").addClass("active");
              $cardBx.addClass("active");
            } else if (scrollPosition > endOffset) {
              scrollPercentage = 1;
              // Add class to .stroke-circle and .card__bx
              $this.find(".stroke-circle").addClass("active");
              $cardBx.addClass("active");
            } else {
              // Remove class when not in range
              $this.find(".stroke-circle").removeClass("active");
              $cardBx.removeClass("active");
            }

            // Ensure scrollPercentage is between 0 and 1
            scrollPercentage = Math.min(Math.max(scrollPercentage, 0), 1);

            // Apply the height based on scrollPercentage
            $this.find(".stroke-border").css("height", scrollPercentage * 100 + "%");
          }
        });
      });

      // Trigger the scroll event initially to set the initial state
      $(window).trigger("scroll");
    });
  }
  }, [publishedData ,publishedLoading]);
  useEffect(() => {
    AOS.init();
  }, [publishedData]);

  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const forceRef = useRef(new Point(0, 0, 0));
  const tRef = useRef(0);
  const radiusRef = useRef(0);
  const centerRef = useRef({ x: 0, y: 0 });
  const backgroundRef = useRef(null);

  const settings = {
    debug: true,
    nLong: 35,
    nLat: 30,
    forceAmp: 0.2,
    forceRadius: 2,
    moveSpeed: 0.04,
  };

  const PI2 = Math.PI * 2;

  // Helper functions
  const getDistance = (p0, p1) => {
    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;
    const dz = p1.z - p0.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  };

  const createParticles = () => {
    particlesRef.current = [];
    for (let i = 1; i < settings.nLat; i++) {
      const posY = Math.cos(settings.aLat * i);
      const r = Math.cos(Math.PI * 0.5 + settings.aLat * i);
      for (let j = 0; j < settings.nLong; j++) {
        const angle = settings.aLong * j;
        const point = new Point(r * Math.cos(angle), posY, r * Math.sin(angle));
        particlesRef.current.push(point);
      }
    }
  };

  const updateForce = () => {
    forceRef.current.x += (Math.cos(tRef.current) - forceRef.current.x) * 0.1;
    forceRef.current.y += (Math.sin(tRef.current) - forceRef.current.y) * 0.1;
    forceRef.current.z += (Math.cos(tRef.current) - forceRef.current.z) * 0.1;
  };

  const drawParticles = (ctx) => {
    const particles = particlesRef.current;
    const n = particles.length;
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.translate(centerRef.current.x, centerRef.current.y);

    ctx.beginPath();
    for (let i = 0, p, dist, f; i < n; i++) {
      p = particles[i];
      ctx.moveTo(radiusRef.current * p.x, radiusRef.current * p.y);
      ctx.lineTo(radiusRef.current * p.rx, radiusRef.current * p.ry);

      const dist = getDistance(p, forceRef.current);
      const f = settings.forceAmp * Math.max(settings.forceRadius - dist, 0) + 1;
      p.rx = p.x * f;
      p.ry = p.y * f;
      p.rz = p.z * f;
    }
    ctx.closePath();
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.stroke();

    for (let i = 0, p; i < n - 1; i++) {
      p = particles[i];
      ctx.beginPath();
      ctx.fillStyle = "#fdb913";
      ctx.fillRect(radiusRef.current * p.rx - 2, radiusRef.current * p.ry - 2, 2, 2);
      ctx.closePath();
    }
    ctx.restore();
  };

  const createBackground = () => {
    backgroundRef.current = backgroundRef.current || document.createElement("canvas");
    backgroundRef.current.width = radiusRef.current * 2;
    backgroundRef.current.height = radiusRef.current * 2;

    const ctx = backgroundRef.current.getContext("2d");
    // Draw latitudes
    for (let i = 0, x, y, a; i < settings.nLat + 1; i++) {
      a = settings.aLong * i;
      x = radiusRef.current;
      y = Math.cos(a) * radiusRef.current + radiusRef.current;
      if (settings.debug) {
        const r = Math.sin(a) * radiusRef.current;
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,255,255,0.04)";
        ctx.moveTo(radiusRef.current - r, y);
        ctx.lineTo(radiusRef.current + r, y);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
      }
    }

    // Draw longitudes
    for (let i = 0, x, y, a; i < settings.nLong; i++) {
      a = settings.aLat * i;
      x = Math.cos(a) * radiusRef.current + radiusRef.current;
      y = radiusRef.current;

      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.translate(radiusRef.current, radiusRef.current);
      ctx.scale(Math.sin(a), 1);
      ctx.beginPath();
      ctx.arc(0, 0, radiusRef.current, 0, PI2, false);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
  };

  const drawBackground = (ctx) => {
    ctx.save();
    ctx.translate(centerRef.current.x - radiusRef.current, centerRef.current.y - radiusRef.current);
    ctx.drawImage(backgroundRef.current, 0, 0);
    ctx.restore();
  };

  const resize = () => {
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;

    if (canvas) {
      // Ensure canvas size fits within parent container
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;

      centerRef.current = {
        x: canvas.width * 0.5,
        y: canvas.height * 0.5,
      };

      // Adjust radius based on your preferred approach
      // Option 1: Percentage of smallest dimension
      // radiusRef.current = Math.min(canvas.width, canvas.height) * 0.5;

      // Option 2: Fixed value
      // radiusRef.current = 300;

      // Option 3: Aspect ratio
      const aspectRatio = 1.65;
      radiusRef.current = Math.min(canvas.width / aspectRatio, canvas.height) * 0.6;

      createBackground();
      createParticles();
    }
  };

  const render = (ctx) => {
    if (canvasRef.current) {
      tRef.current += settings.moveSpeed;

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      drawBackground(ctx);
      updateForce();
      drawParticles(ctx);
    }
  };

  const draw = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      const animate = () => {
        requestAnimationFrame(animate);
        render(ctx);
      };
      animate();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    settings.aLong = Math.PI / settings.nLong;
    settings.aLat = Math.PI / settings.nLat;

    if (canvas) {
      // Set initial canvas size
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      // Event listeners
      const handleResize = () => {
        if (canvas) {
          canvas.width = canvas.clientWidth;
          canvas.height = canvas.clientHeight;
          resize();
        }
      };

      window.addEventListener('resize', handleResize);

      resize();
      draw();

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);
  return (
    <>
    {publishedLoading && !publishedData ? <Loader/>: <>
      <Helmet>
        <title>{(!publishedLoading && publishedData) && publishedData.seoSection.title}</title>
        <meta name="keywords" content={(!publishedLoading && publishedData) && publishedData.seoSection.keywords}></meta>
        <meta name="description" content={(!publishedLoading && publishedData) && publishedData.seoSection.description}></meta>
        {(!publishedLoading && publishedData) && publishedData.seoSection.seoImg.filename && <meta property="og:image" content={`/images/${(!publishedLoading && publishedData) && publishedData.seoSection.seoImg.filename}`} />}
        <meta property="og:image:alt" content="Description of the feature image" />
      </Helmet>
      <div className="comn__bnr about__bnr">
        <div className="container">
          <div className="bnr__content">
            <div className="left__bx" data-aos="fade-up" data-aos-duration="800">
              <h2 dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(!publishedLoading && publishedData ? publishedData.heroSection.heading : ``)
              }} />
              <h6 dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(!publishedLoading && publishedData ? publishedData.heroSection.subHeading : ``)
              }} />
            </div>

            <div data-aos="fade-up" data-aos-duration="800">
              <NavLink to={`${!publishedLoading && publishedData ? publishedData.heroSection.heroButtons.CTA1.url : ""}`} className="btn">{!publishedLoading && publishedData ? publishedData.heroSection.heroButtons.CTA1.name : ''} <span></span ></NavLink>
            </div>

            <div id="canvas-about" className="animation-wrapper">
              <canvas ref={canvasRef} />
            </div>
          </div>
        </div>
      </div>

      <div className="about__fifilo rn__section__gapTop">
        <div className="container">
          <div className="main__heading" data-aos="fade-up" data-aos-duration="800">
            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(!publishedLoading && publishedData ? publishedData.aboutSection.preHeading : "") }} />
            <h2 dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(!publishedLoading && publishedData ? publishedData.aboutSection.heading : ``)
            }} />
          </div>
          <div className="row gx-lg-4 gx-md-3 inner__gapTop">
            <div className="col-12">
              <div className="top__bx" data-aos="fade-up" data-aos-duration="800">
                <h6 dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(!publishedLoading && publishedData ? publishedData.aboutSection.description : ``)
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="our__process rn__section__gapTop dark__bnr">
        <div className="container">
          <div className="main__heading" data-aos="fade-up" data-aos-duration="800">
            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(!publishedLoading && publishedData ? publishedData.processSection.preHeading : "") }} />
            <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(!publishedLoading && publishedData ? publishedData.processSection.heading : "") }} />
          </div>

          <div className="inner__gapTop row justify-content-center">
            {!publishedLoading && publishedData?.processSection && publishedData.processSection.content.map((v, i) => {
              return <div className="col-lg-12" key={i}>
                <div className="row">
                  {i % 2 === 0 ? <>
                    <div className="col-lg-1 col-md-1 col-2 center__bx">
                      <div className="border-section">
                        <div className="stroke-circle">
                          <img src={(v.icon && v.icon.filename) ? `/images/${v.icon.filename}` : ""} alt="icon" />
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
                        <h5>{v.heading ? v.heading : ""}</h5>
                        <p>{v.description ? v.description : ``}</p>
                      </div>
                    </div>
                  </>
                    :
                    <>
                      <div className="col-xl-3 col-lg-4 col-md-5 col-10 offset-xl-2 offset-lg-1" data-aos="fade-up" data-aos-duration="800">
                        <div className="card__bx">
                          <h5>{v.heading ? v.heading : ""}</h5>
                          <p>{v.description ? v.description : ``}</p>
                        </div>
                      </div>
                      <div className="col-lg-1 col-2 center__bx">
                        <div className="border-section">
                          <div className="stroke-circle">

                            <img src={(v.icon && v.icon.filename) ? `/images/${v.icon.filename}` : ""} alt="icon" />
                          </div>
                          <div className="stroke-border">
                            <div className="arrow-down">
                              <img src="assets/img/arrow-down.svg" alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>}
                </div>
              </div>
            })}
          </div>
        </div>
      </div>

      <div className="our__team rn__section__gapTop">
        <div className="container">
          <div className="row gx-3 gx-xl-4">
            <div className="col-lg-3 col-md-12">
              <div className="main__heading" data-aos="fade-up" data-aos-duration="800">
                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(!publishedLoading && publishedData ? publishedData.teamSection.preHeading : "") }} />
                <h2 dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(!publishedLoading && publishedData ? publishedData.teamSection.heading : ``)
                }} />
                <span className="title" dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(!publishedLoading && publishedData ? publishedData.teamSection.description : ``)
                }} />
              </div>
            </div>
            {(!publishedLoading && publishedData) && publishedData.membersCard.map((member, index) => {
              return <div className="col-lg-3 col-md-6 col-6" key={index + 1}>
                <div className="team__card" data-aos="fade-up" data-aos-duration="800">
                  <div className="img__team">
                    <img src={member.memberImg && member.memberImg.filename ? "/images/" + member.memberImg.filename : "assets/img/img_fullsize.png"} alt="our-team" />
                  </div>
                  <div className="team__detail">
                    <div>
                      <p>{member.name}</p>
                      <span>{member.designation}</span>
                    </div>
                    <NavLink to={member.linkedinUrl} target="_blank">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <rect width="32" height="32" rx="16" fill="#0A66C2" />
                        <path
                          d="M23.501 7.2002H8.49942C8.15484 7.2002 7.82438 7.33708 7.58073 7.58073C7.33708 7.82438 7.2002 8.15484 7.2002 8.49942V23.501C7.2002 23.8455 7.33708 24.176 7.58073 24.4197C7.82438 24.6633 8.15484 24.8002 8.49942 24.8002H23.501C23.8455 24.8002 24.176 24.6633 24.4197 24.4197C24.6633 24.176 24.8002 23.8455 24.8002 23.501V8.49942C24.8002 8.15484 24.6633 7.82438 24.4197 7.58073C24.176 7.33708 23.8455 7.2002 23.501 7.2002ZM12.446 22.1932H9.79986V13.788H12.446V22.1932ZM11.1211 12.6232C10.8209 12.6215 10.528 12.5309 10.2793 12.3629C10.0305 12.1949 9.83714 11.957 9.72351 11.6792C9.60987 11.4014 9.58107 11.0961 9.64075 10.8019C9.70043 10.5078 9.84592 10.2379 10.0588 10.0263C10.2718 9.81474 10.5426 9.67099 10.8371 9.6132C11.1317 9.55541 11.4367 9.58616 11.7138 9.70158C11.9909 9.81701 12.2276 10.0119 12.394 10.2617C12.5604 10.5115 12.6491 10.805 12.6489 11.1052C12.6517 11.3062 12.614 11.5056 12.5381 11.6917C12.4622 11.8778 12.3496 12.0467 12.2071 12.1884C12.0645 12.33 11.8949 12.4415 11.7083 12.5162C11.5217 12.5909 11.322 12.6273 11.1211 12.6232ZM22.1993 22.2005H19.5544V17.6086C19.5544 16.2544 18.9788 15.8364 18.2356 15.8364C17.451 15.8364 16.681 16.428 16.681 17.6429V22.2005H14.0349V13.7941H16.5795V14.9589H16.6138C16.8692 14.4419 17.7639 13.5582 19.1291 13.5582C20.6055 13.5582 22.2005 14.4345 22.2005 17.0012L22.1993 22.2005Z"
                          fill="#FBFDFF"
                        />
                      </svg>
                    </NavLink>
                  </div>
                </div>
              </div>
            })
            }
          </div>
        </div>
      </div>
    </>}
    </>
  );
}
