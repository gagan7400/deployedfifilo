import React, { act, useEffect, useRef, useState } from 'react'
import AOS from "aos";
import DOMPurify from 'dompurify';
import axios from 'axios';
import { Copy } from 'lucide-react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loader from '../layout/Loader';
export default function Singleblog() {
    let { name } = useParams();
    let [blog, setBlog] = useState(null);
    let [blogs, setBlogs] = useState(null);
    let [loading, setLoading] = useState(true);
    let [blogsLoading, setBlogsLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    let nav = useNavigate();
    const blogUrl = window.location.href;

    const handleCopy = () => {
        navigator.clipboard.writeText(blogUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };
    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: 'Check out this blog!',
                    url: blogUrl,
                })
                .catch((error) => console.error('Error sharing:', error));
        } else {
            alert('Sharing is not supported on this browser.');
        }
    };
    let location = useLocation();
    useEffect(() => {
        getblog();
    }, [location]);
    let getblog = async () => {
        try {
            let { data } = await axios.get('/admin/blogs/getblog/' + name);
            if (data.success) {
                setBlog(data.data);
                setLoading(false)
            } else {
                setBlog(null);
                nav("/not-found")
            }
        } catch (error) {
            setBlog(null)

            nav("/not-found")
        }
    }
    let alldata = async () => {
        try {
            let { data } = await axios.get('/admin/blogs/getblogs');
            if (data.success) {
                setBlogs(data.data);
                setBlogsLoading(false)
            } else {
                setBlogs(null);
                alert("error occured");
            }
        } catch (error) {
            setBlog(null)
            setBlog(null);
        }
    }

    useEffect(() => {
        getblog();
        alldata();
    }, [])
    useEffect(() => {
        if (blog) {
            setLoading(false);
        }
    }, [blog]);
    useEffect(() => {
        if (blogs) {
            setBlogsLoading(false);
        }
    }, [blogs]);

    useEffect(() => {
        AOS.init();
    }, [blog]);


    let select = () => {
        const links = document.querySelectorAll(".tableOfContent li a");
        window.addEventListener("hashchange", () => {
            links.forEach((link) => {
                link.parentNode.className = ""
            });
            const activeLink = document.querySelector(`a[href="${location.pathname + location.hash}"]`);
            if (activeLink) {
                let p = activeLink.parentNode;
                p.classList.add("active");
            }
        });
    }
    select();
    window.addEventListener("hashchange", select);

    return (
        <>
            <div className="blogs__bnr blog__single">
                {loading && <Loader />}
                <div className="container">
                    <div className="bnr__inr">
                        <div className="category" data-aos="fade-up" data-aos-duration="800">
                            <span>{!loading && blog && blog.blogCategory}</span>
                        </div>
                        <h2 data-aos="fade-up" data-aos-duration="800">{!loading && blog && blog.blogTitle}</h2>
                        <div className="card__ftr" data-aos="fade-up" data-aos-duration="800">
                            <span>By {!loading && blog && blog.uploadedBy}</span>
                            <span>•</span>
                            <span>{new Date(!loading && blog && blog.updatedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}</span>
                            <span>•</span>
                            <span>{!loading && blog && blog.approxTime} Read</span>
                        </div>
                        <div className="single__thumbnails" data-aos="fade-up" data-aos-duration="800">
                            <img src={`/images/${!loading && blog && blog.bannerImg.filename}`} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="single__content rn__section__gapTop">
                <div className="container">
                    <div className="row">
                        <div className='col-lg-9'>
                            <div className="left__block" dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(!loading && blog && blog.blogContent)
                            }} />
                            <div className="social__share" >
                                <h6>Social Share</h6>
                                <div className="social__icons">
                                    <div className="social__icons">
                                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`} target="_blank" rel="noopener noreferrer" className="btn" >
                                            <img src="assets/img/facebook-s.svg" alt="Facebook" />
                                        </a>
                                        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}&text=Check+out+this+blog!`} target="_blank" rel="noopener noreferrer" className="btn" >
                                            <img src="assets/img/twitter-s.svg" alt="Twitter" />
                                        </a>
                                        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`} target="_blank" rel="noopener noreferrer" className="btn" >
                                            <img src="assets/img/linkedIn-s.svg" alt="LinkedIn" />
                                        </a>
                                        <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blogUrl)}`} target="_blank" rel="noopener noreferrer" className="btn" >
                                            <img src="assets/img/whatsapp-s.svg" alt="WhatsApp" />
                                        </a>
                                        <button onClick={handleShare} className="btn">
                                            <img src="assets/img/share.svg" alt="Share" />
                                        </button>
                                        <button onClick={handleCopy} className="btn">
                                            <img src="assets/img/copy.svg" alt="Copybutton" />
                                        </button>
                                    </div>
                                    {copied && <span className="text-green-600 text-sm messageofcopy">URL copied to clipboard!</span>}
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className="right__block">
                                <div className="table__card"  >
                                    <h5>Table of Contents</h5>
                                    <ul className='tableOfContent'>
                                        {!loading && blog && blog.tableOfContent.map((v, i) => {
                                            return <li className={i == 0 ? "active" : ""} key={i}><a href={`/blogs/${blog.blogUrl}/#${v.id}`}>{i + 1}. {v.heading}</a></li>
                                        })}
                                    </ul>
                                </div>

                                <div className="releted__blog"  >
                                    <h5>Related Blogs</h5>

                                    <div className="blogs__cards">
                                        {!blogsLoading && blogs && blogs.map((value, index) => {
                                            if (value._id != blog._id) {
                                                return (<div className="card__blog" key={index}>
                                                    <NavLink to={`/blogs/${value.blogUrl}/`}>
                                                        <div className="title">
                                                            <h6>{value.blogTitle}</h6>
                                                            <span><img src="assets/img/arrow-up-right.svg" alt="" /></span>
                                                        </div>
                                                    </NavLink>
                                                    <span className="description">{value.heading}</span>
                                                </div>)
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
