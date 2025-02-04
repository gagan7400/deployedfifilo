import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { NavLink, useLocation } from "react-router-dom";
import useCursorPosition from "../layout/useCursorPosition";
import { useSelector, useDispatch } from 'react-redux'
import { getpublishServicePage } from '../redux/actions/servicesAction';
import DOMPurify from 'dompurify';
export default function Services() {
  useCursorPosition('dark__bnr');
  let dispatch = useDispatch();
  let { publishedServicePage, publishedServiceLoading } = useSelector(state => state.services)
  useEffect(() => {
    dispatch(getpublishServicePage())

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

  function ScrollToSection() {
    const location = useLocation();

    useEffect(() => {
      if (location.hash) {
        const element = document.getElementById(location.hash.substring(1)); // Remove `#` and get the ID
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the section
        }
      }
    }, [location]);

    return null;
  }

  return (
    <>
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
            <div className="animation-wrapper">
              <div className="main-wrapper">
                <div className="sphere-wrapper">
                  <div className="plane plane-1">
                    <div className="spoke spoke-1">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-2">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-3">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-4">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-5">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-6">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-7">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-8">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-9">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-10">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-11">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-12">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-13">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-14">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-15">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-16">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-17">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-18">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-19">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-20">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-21">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-22">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-23">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-24">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-25">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-26">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-27">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-28">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-29">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-30">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-31">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-32">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-33">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-34">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-35">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-36">
                      <div className="dot"></div>
                    </div>
                  </div>
                  <div className="plane plane-2">
                    <div className="spoke spoke-1">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-2">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-3">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-4">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-5">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-6">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-7">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-8">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-9">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-10">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-11">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-12">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-13">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-14">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-15">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-16">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-17">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-18">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-19">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-20">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-21">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-22">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-23">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-24">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-25">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-26">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-27">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-28">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-29">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-30">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-31">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-32">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-33">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-34">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-35">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-36">
                      <div className="dot"></div>
                    </div>
                  </div>
                  <div className="plane plane-3">
                    <div className="spoke spoke-1">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-2">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-3">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-4">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-5">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-6">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-7">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-8">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-9">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-10">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-11">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-12">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-13">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-14">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-15">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-16">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-17">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-18">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-19">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-20">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-21">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-22">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-23">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-24">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-25">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-26">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-27">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-28">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-29">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-30">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-31">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-32">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-33">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-34">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-35">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-36">
                      <div className="dot"></div>
                    </div>
                  </div>
                  <div className="plane plane-4">
                    <div className="spoke spoke-1">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-2">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-3">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-4">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-5">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-6">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-7">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-8">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-9">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-10">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-11">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-12">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-13">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-14">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-15">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-16">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-17">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-18">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-19">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-20">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-21">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-22">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-23">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-24">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-25">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-26">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-27">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-28">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-29">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-30">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-31">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-32">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-33">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-34">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-35">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-36">
                      <div className="dot"></div>
                    </div>
                  </div>
                  <div className="plane plane-5">
                    <div className="spoke spoke-1">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-2">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-3">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-4">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-5">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-6">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-7">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-8">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-9">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-10">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-11">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-12">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-13">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-14">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-15">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-16">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-17">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-18">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-19">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-20">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-21">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-22">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-23">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-24">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-25">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-26">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-27">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-28">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-29">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-30">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-31">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-32">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-33">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-34">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-35">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-36">
                      <div className="dot"></div>
                    </div>
                  </div>
                  <div className="plane plane-6">
                    <div className="spoke spoke-1">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-2">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-3">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-4">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-5">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-6">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-7">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-8">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-9">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-10">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-11">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-12">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-13">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-14">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-15">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-16">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-17">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-18">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-19">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-20">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-21">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-22">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-23">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-24">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-25">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-26">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-27">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-28">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-29">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-30">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-31">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-32">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-33">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-34">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-35">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-36">
                      <div className="dot"></div>
                    </div>
                  </div>
                  <div className="plane plane-7">
                    <div className="spoke spoke-1">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-2">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-3">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-4">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-5">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-6">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-7">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-8">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-9">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-10">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-11">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-12">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-13">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-14">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-15">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-16">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-17">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-18">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-19">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-20">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-21">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-22">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-23">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-24">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-25">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-26">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-27">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-28">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-29">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-30">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-31">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-32">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-33">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-34">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-35">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-36">
                      <div className="dot"></div>
                    </div>
                  </div>
                  <div className="plane plane-8">
                    <div className="spoke spoke-1">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-2">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-3">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-4">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-5">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-6">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-7">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-8">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-9">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-10">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-11">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-12">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-13">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-14">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-15">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-16">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-17">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-18">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-19">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-20">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-21">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-22">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-23">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-24">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-25">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-26">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-27">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-28">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-29">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-30">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-31">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-32">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-33">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-34">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-35">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-36">
                      <div className="dot"></div>
                    </div>
                  </div>
                  <div className="plane plane-9">
                    <div className="spoke spoke-1">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-2">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-3">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-4">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-5">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-6">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-7">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-8">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-9">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-10">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-11">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-12">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-13">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-14">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-15">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-16">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-17">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-18">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-19">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-20">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-21">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-22">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-23">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-24">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-25">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-26">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-27">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-28">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-29">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-30">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-31">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-32">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-33">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-34">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-35">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-36">
                      <div className="dot"></div>
                    </div>
                  </div>
                  <div className="plane plane-10">
                    <div className="spoke spoke-1">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-2">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-3">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-4">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-5">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-6">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-7">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-8">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-9">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-10">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-11">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-12">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-13">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-14">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-15">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-16">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-17">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-18">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-19">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-20">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-21">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-22">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-23">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-24">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-25">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-26">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-27">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-28">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-29">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-30">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-31">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-32">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-33">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-34">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-35">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-36">
                      <div className="dot"></div>
                    </div>
                  </div>
                  <div className="plane plane-11">
                    <div className="spoke spoke-1">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-2">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-3">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-4">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-5">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-6">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-7">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-8">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-9">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-10">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-11">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-12">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-13">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-14">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-15">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-16">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-17">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-18">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-19">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-20">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-21">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-22">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-23">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-24">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-25">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-26">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-27">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-28">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-29">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-30">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-31">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-32">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-33">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-34">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-35">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-36">
                      <div className="dot"></div>
                    </div>
                  </div>
                  <div className="plane plane-12">
                    <div className="spoke spoke-1">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-2">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-3">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-4">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-5">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-6">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-7">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-8">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-9">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-10">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-11">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-12">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-13">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-14">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-15">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-16">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-17">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-18">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-19">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-20">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-21">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-22">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-23">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-24">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-25">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-26">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-27">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-28">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-29">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-30">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-31">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-32">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-33">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-34">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-35">
                      <div className="dot"></div>
                    </div>
                    <div className="spoke spoke-36">
                      <div className="dot"></div>
                    </div>
                  </div>
                </div>
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
    </>
  );
}
