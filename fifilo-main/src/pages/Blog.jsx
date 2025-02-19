import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import AOS from "aos";
import DOMPurify from 'dompurify';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs, getPublishBlogPage } from '../redux/actions/blogAction';
import { Helmet } from 'react-helmet';

export default function Blog() {
    let dispatch = useDispatch();
    let { blogdata, blogloading, error, publishedblogdata } = useSelector(state => state.blog)
    useEffect(() => {
        if (!blogloading && publishedblogdata) {
            $(function () {
                $(".blogs__list .col-12").slice(0, 3).show();
                $("body").on("click touchstart", ".load-more", function (e) {
                    e.preventDefault();
                    $(".col-12:hidden").slice(0, 3).slideDown();
                    if ($(".col-12:hidden").length == 0) {
                        $(".load-more").css("display", "none");
                    }
                });
            });
        }
    }, [blogloading, publishedblogdata]);
    useEffect(() => {
        AOS.init();
    }, [blogdata, publishedblogdata]);
    useEffect(() => {
        if (!publishedblogdata) {
            dispatch(getPublishBlogPage())
        }
        if (!blogdata) {
            dispatch(getBlogs())
        }
    }, [])

    return (
        <>

            <Helmet>
                <title>{(!blogloading && publishedblogdata) && publishedblogdata.seoSection.title}</title>
                <meta name="keywords" content={(!blogloading && publishedblogdata) && publishedblogdata.seoSection.keywords} />
                <meta name="description" content={(!blogloading && publishedblogdata) && publishedblogdata.seoSection.description} />
                {(!blogloading && publishedblogdata) && publishedblogdata.seoSection.seoImg.filename && <meta property="og:image" content={`/images/${(!blogloading && publishedblogdata) && publishedblogdata.seoSection.seoImg.filename}`} />}
                <meta property="og:image:alt" content="Description of the feature image" />
            </Helmet>
            <div className="blogs__bnr">
                <div className="container" data-aos="fade-up" data-aos-duration="800">
                    <h2 dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(!blogloading && publishedblogdata ? publishedblogdata.heroSection.heading : ``)
                    }} />
                </div>
            </div>

            <div className="blogs__list rn__section__gapTop">
                <div className="container">
                    <div className="row justify-content-center">
                        {!blogloading && !error && blogdata && blogdata.map((value, index) => {
                            if (index == 0) {
                                return (
                                    <div className="col-xxl-10 col-md-12" key={index}>
                                        <div className="card__blog comn__blog" data-aos="fade-up" data-aos-duration="800">
                                            <div className="thumb__img">
                                                <NavLink to={`/blogs/${value.blogUrl}/`}>
                                                    <img src={`/images/${value.bannerImg.filename}`} alt="" />
                                                </NavLink>
                                            </div>
                                            <div className="cntnt__bx">
                                                <span className="category">{value.blogCategory}</span>
                                                <NavLink to={`/blogs/${value.blogUrl}/`}>
                                                    <div className="title">
                                                        <h5>{value.blogTitle}.</h5>
                                                        <span><img src="assets/img/arrow-up-right.svg" alt="" /></span>
                                                    </div>
                                                </NavLink>
                                                <h6>{value.heading}</h6>

                                                <div className="card__ftr">
                                                    <span>By {value.uploadedBy}</span>
                                                    <span>•</span>
                                                    <span>{new Date(value.updatedAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })}</span>
                                                    <span>•</span>
                                                    <span>{value.approxTime} Read</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                        <div className="col-xxl-10 col-md-12">
                            <div className="main__heading" data-aos="fade-up" data-aos-duration="800">
                                <h2>Must Read Articles</h2>
                            </div>
                            <div className="row inner__gapTop">
                                {!blogloading && !error && blogdata && blogdata.map((value, index) => {
                                    if (index !== 0) {
                                        return (blogdata.length > 4 && index > 3 ?
                                            <div key={index} className="col-12" style={{ display: "none" }} data-aos="fade-up" data-aos-duration="800">
                                                <div className="arti__card comn__blog" data-aos="fade-up" data-aos-duration="800">
                                                    <div className="img__box">
                                                        <NavLink to={`/blogs/${value.blogUrl}/`}>
                                                            <img src={`/images/${value.bannerImg.filename}`} alt="" />
                                                        </NavLink>
                                                    </div>
                                                    <div className="cntnt__bx">
                                                        <span className="category">{value.blogCategory}</span>
                                                        <NavLink to={`/blogs/${value.blogUrl}/`}>
                                                            <div className="title">
                                                                <h5>{value.blogTitle}.</h5>
                                                                <span><img src="assets/img/arrow-up-right.svg" alt="" /></span>
                                                            </div>
                                                        </NavLink>
                                                        <h6>{value.heading}</h6>

                                                        <div className="card__ftr">
                                                            <span>By {value.uploadedBy}</span>
                                                            <span>•</span>
                                                            <span>{new Date(value.updatedAt).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                            })}</span>
                                                            <span>•</span>
                                                            <span>{value.approxTime} Read</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> :
                                            <div key={index} className="col-12"  >
                                                <div className="arti__card comn__blog" data-aos="fade-up" data-aos-duration="800">
                                                    <div className="img__box">
                                                        <NavLink to={`/blogs/${value.blogUrl}/`}>
                                                            <img src={`/images/${value.bannerImg.filename}`} alt="" />
                                                        </NavLink>
                                                    </div>
                                                    <div className="cntnt__bx">
                                                        <span className="category">{value.blogCategory}</span>
                                                        <NavLink to={`/blogs/${value.blogUrl}/`}>
                                                            <div className="title">
                                                                <h5>{value.blogTitle}.</h5>
                                                                <span><img src="assets/img/arrow-up-right.svg" alt="" /></span>
                                                            </div>
                                                        </NavLink>
                                                        <h6>{value.heading}</h6>

                                                        <div className="card__ftr">
                                                            <span>By {value.uploadedBy}</span>
                                                            <span>•</span>
                                                            <span>{new Date(value.updatedAt).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                            })}</span>
                                                            <span>•</span>
                                                            <span>{value.approxTime} Read</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>

                        </div>


                        <div className="col-lg-10 col-md-12" data-aos="fade-up" data-aos-duration="800">
                            <button className="btn btn__primary m-auto load-more">View more blogs <img src="assets/img/arrow-up-right.svg"
                                alt="img" /></button>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}
