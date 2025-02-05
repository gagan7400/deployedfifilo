import React, { useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import $ from "jquery";
import DOMPurify from 'dompurify';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getjobs, getpublishCareerPage } from '../redux/actions/careeraction';
import Job from "./Job";
import Careerform from "./CareerForm";
export default function Career() {
  let dispatch = useDispatch();
  let { jobs, jobloading } = useSelector((state) => state.jobs);
  let { publishedcareerdata, publishedcareerloading } = useSelector((state) => state.careerpage);
  useEffect(() => {
    AOS.init();
  }, [publishedcareerdata]);
  useEffect(() => {
    dispatch(getjobs());
    dispatch(getpublishCareerPage());
  }, [])

  useEffect(() => {
    const $modal = $("#careerModal");

    if ($modal.length && !$modal.hasClass("modal-initialized")) {
      const myModal = new window.bootstrap.Modal($modal[0]); // Use window.bootstrap
      $modal.addClass("modal-initialized");

      const handleCloseModal = (event) => {
        if (event.data === "closeModal") {
          myModal.hide();
        }
      };

      window.addEventListener("message", handleCloseModal);

      return () => {
        window.removeEventListener("message", handleCloseModal);
      };
    }
  }, []);

  const [filter, setFilter] = useState('*');
  const filteredJobs = !jobloading && jobs && filter === '*' ? jobs : jobs && jobs.filter(job => job.category === filter);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === 'formSubmitted') {
        // Use vanilla JavaScript to hide the modal
        const modalElement = document.getElementById('careerModal');
        if (modalElement) {
          const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
          if (modalInstance) {
            modalInstance.hide();
          }
        }
        navigate('/thank-you');
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [navigate]);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
        if (canvasRef.current) {
          canvasRef.current.width = offsetWidth;
          canvasRef.current.height = offsetHeight;
        }
      }
    };

    updateCanvasSize();

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const getRadio = () => {
    const { width, height } = dimensions;
    return Math.min(width, height) * 0.45; // Adjust multiplier as needed
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext('2d') : null;
    if (!canvas || !ctx) return;

    const RADIO = getRadio();
    const ANILLOS = 24;
    const COLOR = "#fdb913";
    const FONDO = "rgba(17,75,32,0.3)";

    let e1 = esfera(RADIO, ANILLOS);

    rotarX(e1, Math.PI / 8);
    rotarY(e1, Math.PI / 16);
    rotarZ(e1, Math.PI / 4);

    let i = e1.length - 1;

    function animacion() {
      if (!canvas || !ctx) return;

      let color_aux = e1[i][1] < 0 ? FONDO : COLOR;

      // Draw points
      ctx.beginPath();
      ctx.arc(e1[i][0], e1[i][2], 2, 0, 2 * Math.PI);
      ctx.fillStyle = color_aux;
      ctx.fill();

      if (i % (ANILLOS + 1) !== ANILLOS) {
        ctx.beginPath();
        ctx.moveTo(e1[i][0], e1[i][2]);
        ctx.lineTo(e1[i + 1][0], e1[i + 1][2]);
        ctx.strokeStyle = color_aux;
        ctx.stroke();
      }

      if (i < e1.length - ANILLOS - 1) {
        ctx.beginPath();
        ctx.moveTo(e1[i][0], e1[i][2]);
        ctx.lineTo(e1[i + ANILLOS + 1][0], e1[i + ANILLOS + 1][2]);
        ctx.strokeStyle = color_aux;
        ctx.stroke();
      }

      if (i > e1.length - ANILLOS - 2) {
        ctx.beginPath();
        ctx.moveTo(e1[i][0], e1[i][2]);
        ctx.lineTo(
          e1[i - e1.length + ANILLOS + 1][0],
          e1[i - e1.length + ANILLOS + 1][2]
        );
        ctx.strokeStyle = color_aux;
        ctx.stroke();
      }

      if (i > 0) {
        i -= 1;
      } else {
        animarRotacion();
        clearInterval(creacion);
      }
    }

    function animarRotacion() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rotarZ(e1, -0.005);
      dibujarLineas(e1, COLOR, FONDO, ANILLOS);
      dibujarPuntos(e1, COLOR, FONDO);
      requestAnimationFrame(animarRotacion);
    }

    var creacion = setInterval(animacion, 1);

    return () => {
      clearInterval(creacion);
    };
  }, [dimensions]);

  function esfera(
    radio = 100,
    anillos = 16,
    centro = [canvasRef.current?.width / 2, 0, canvasRef.current?.height / 2],
    ruido = 0
  ) {
    if (!canvasRef.current) return [];

    let puntos = [];
    const ancho = (2 * Math.PI) / anillos;
    const alto = Math.PI / anillos;
    for (let i = 0; i < anillos; i++) {
      for (let j = 0; j <= anillos; j++) {
        const x =
          radio * Math.cos(i * ancho) * Math.sin(j * alto) +
          centro[0] * (1 + Math.random() * ruido);
        const y =
          radio * Math.sin(i * ancho) * Math.sin(j * alto) +
          centro[1] * (1 + Math.random() * ruido);
        const z =
          radio * Math.cos(j * alto) + centro[2] * (1 + Math.random() * ruido);
        puntos.push([x, y, z]);
      }
    }
    return puntos;
  }

  function dibujarPuntos(esfera, color = "white", fondo = "transparent") {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    for (let i = 0; i < esfera.length; i++) {
      let color_aux = esfera[i][1] < 0 ? fondo : color;

      ctx.beginPath();
      ctx.arc(esfera[i][0], esfera[i][2], 2, 0, 2 * Math.PI);
      ctx.fillStyle = color_aux;
      ctx.fill();
    }
  }

  function dibujarLineas(
    esfera,
    color = "white",
    fondo = "transparent",
    anillos = 16
  ) {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    for (let i = 0; i < esfera.length; i++) {
      let color_aux = esfera[i][1] < 0 ? fondo : color;

      if (i % (anillos + 1) !== anillos) {
        ctx.beginPath();
        ctx.moveTo(esfera[i][0], esfera[i][2]);
        ctx.lineTo(esfera[i + 1][0], esfera[i + 1][2]);
        ctx.strokeStyle = color_aux;
        ctx.stroke();
      }
      if (i < esfera.length - anillos - 1) {
        ctx.beginPath();
        ctx.moveTo(esfera[i][0], esfera[i][2]);
        ctx.lineTo(esfera[i + anillos + 1][0], esfera[i + anillos + 1][2]);
        ctx.strokeStyle = color_aux;
        ctx.stroke();
      }
      if (i > esfera.length - anillos - 2) {
        ctx.beginPath();
        ctx.moveTo(esfera[i][0], esfera[i][2]);
        ctx.lineTo(
          esfera[i - esfera.length + anillos + 1][0],
          esfera[i - esfera.length + anillos + 1][2]
        );
        ctx.strokeStyle = color_aux;
        ctx.stroke();
      }
    }
  }

  function rotarX(
    esfera,
    angulo,
    centro = [canvasRef.current?.width / 2, 0, canvasRef.current?.height / 2]
  ) {
    if (!canvasRef.current) return;

    for (let i = 0; i < esfera.length; i++) {
      const y = esfera[i][1];
      const z = esfera[i][2];
      esfera[i][1] =
        Math.cos(angulo) * (y - centro[1]) -
        Math.sin(angulo) * (z - centro[2]) +
        centro[1];
      esfera[i][2] =
        Math.sin(angulo) * (y - centro[1]) +
        Math.cos(angulo) * (z - centro[2]) +
        centro[2];
    }
  }

  function rotarY(
    esfera,
    angulo,
    centro = [canvasRef.current?.width / 2, 0, canvasRef.current?.height / 2]
  ) {
    if (!canvasRef.current) return;

    for (let i = 0; i < esfera.length; i++) {
      const x = esfera[i][0];
      const z = esfera[i][2];
      esfera[i][0] =
        Math.cos(angulo) * (x - centro[0]) +
        Math.sin(angulo) * (z - centro[2]) +
        centro[0];
      esfera[i][2] =
        -Math.sin(angulo) * (x - centro[0]) +
        Math.cos(angulo) * (z - centro[2]) +
        centro[2];
    }
  }

  function rotarZ(
    esfera,
    angulo,
    centro = [canvasRef.current?.width / 2, 0, canvasRef.current?.height / 2]
  ) {
    if (!canvasRef.current) return;

    for (let i = 0; i < esfera.length; i++) {
      const x = esfera[i][0];
      const y = esfera[i][1];
      esfera[i][0] =
        Math.cos(angulo) * (x - centro[0]) -
        Math.sin(angulo) * (y - centro[1]) +
        centro[0];
      esfera[i][1] =
        Math.sin(angulo) * (x - centro[0]) +
        Math.cos(angulo) * (y - centro[1]) +
        centro[1];
    }
  }
  let closemodel = () => {
    document.getElementsByClassName("btn-close")[0].click()
  }
  const [visibleDetails, setVisibleDetails] = useState(null);

  const toggleDetails = (jobId) => {
    setVisibleDetails((prev) => (prev === jobId ? null : jobId));
  };
  return (
    <>
      <Helmet>
        <title>{(!publishedcareerloading && publishedcareerdata) && publishedcareerdata.seoSection.title}</title>
        <meta name="keywords" content={(!publishedcareerloading && publishedcareerdata) && publishedcareerdata.seoSection.keywords} />
        <meta name="description" content={(!publishedcareerloading && publishedcareerdata) && publishedcareerdata.seoSection.description} />
        {(!publishedcareerloading && publishedcareerdata) && publishedcareerdata.seoSection.seoImg.filename && <meta property="og:image" content={`/images/${(!publishedcareerloading && publishedcareerdata) && publishedcareerdata.seoSection.seoImg.filename}`} />}
        <meta property="og:image:alt" content="Description of the feature image" />
      </Helmet>

      <div className="comn__bnr service__bnr">
        <div className="container">
          <div className="bnr__content">
            <div className="left__bx" data-aos="fade-up" data-aos-duration="800">
              <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(!publishedcareerloading && publishedcareerdata ? publishedcareerdata.heroSection.heading : "") }} />
              <h6 dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(!publishedcareerloading && publishedcareerdata ? publishedcareerdata.heroSection.subHeading : ``)
              }} />
            </div>
            <div data-aos="fade-up" data-aos-duration="800">
              <NavLink to={!publishedcareerloading && publishedcareerdata ? publishedcareerdata.heroSection.heroButtons.CTA1.url : ""} className="btn" >{!publishedcareerloading && publishedcareerdata ? publishedcareerdata.heroSection.heroButtons.CTA1.name : ""}<span></span></NavLink>
            </div>

            <div ref={containerRef} className="animation-wrapper">
              <canvas id="canvas" ref={canvasRef}></canvas>
            </div>
          </div>
        </div>
      </div>

      <div className="career__section rn__section__gapTop">
        <div className="container">
          <div className="row gx-lg-4 gx-md-3">
            {!publishedcareerloading && publishedcareerdata ?
              publishedcareerdata.cardsSection.map((v, i) => {
                return <div className="col-lg-4 col-md-4" data-aos="flip-left" data-aos-duration="800" key={i}>
                  <div className="card__bx">
                    <img src={v.cardImg ? "/images/" + v.cardImg.filename : "assets/img/icon-01.svg"} alt="career__section" />
                    <h5>{v.cardHeading ? v.cardHeading : ""}</h5>
                    <span>{v.cardDescription ? v.cardDescription : ``}</span>
                  </div>
                </div>
              }
              )
              : ""}

          </div>
        </div>
      </div>

      <div className="open__roles rn__section__gapTop">
        <div className="container">
          <div className="main__heading" data-aos="fade-up">
            <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(!publishedcareerloading && publishedcareerdata ? publishedcareerdata.jobSection.heading : "") }} />
            <p dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(!publishedcareerloading && publishedcareerdata ? publishedcareerdata.jobSection.subHeading : '')
            }} />
          </div>
          <div className="isotope__filter inner__gapTop">
            <div className="filters" data-aos="fade-up">
              <ul>
                <li className={filter === "*" ? "is-checked" : ""} onClick={() => setFilter("*")}>
                  All Jobs
                </li>
                <li className={filter === "UI-UX" ? "is-checked" : ""} onClick={() => setFilter("UI-UX")}>
                  Design
                </li>
                <li className={filter === "Development" ? "is-checked" : ""} onClick={() => setFilter("Development")}>
                  Development
                </li>
                <li className={filter === "Sales&Marketing" ? "is-checked" : ""} onClick={() => setFilter("Sales&Marketing")}>
                  Sales & Marketing
                </li>
                <li className={filter === "HR" ? "is-checked" : ""} onClick={() => setFilter("HR")}>
                  HR
                </li>
              </ul>
            </div>

            <div className="rows inner__gapTop grid" data-aos="fade-up" data-aos-duration="800">
              {jobs && filteredJobs.map((job, index) => {
                if (job.jobStatus == "Active") {
                  return <Job job={job} key={index} isVisible={visibleDetails === job._id} toggleDetails={toggleDetails} />
                }
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade career__modal" id="careerModal" aria-labelledby="careerModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Let's Talk</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
            </div>
            <div className="modal-body">
              <div className="contact_formModal">
                <Careerform closemodel={closemodel} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
