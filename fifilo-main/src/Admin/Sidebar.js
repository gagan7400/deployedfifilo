import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/actions/adminloginaction';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  let dispatch = useDispatch();
  useEffect(() => {
    document.body.style.backgroundColor = "#F6F7F9";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
  return (
    <div className="shell">
      <nav className="sidebar">
        <div className="top-bar">
          <div className="logo">
            <img src="assets/imgs/logo.svg" alt="Logo" />
          </div>
          <ul className="nav flex-column">

            <li className="nav-item">
              <NavLink to="/dashboard" className="nav-link"  >
                <img src="assets/imgs/dashboard.svg" alt="Dashboard Icon" />Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/pages" className="nav-link"  >
                <img src="assets/imgs/pages.svg" alt="pages Icon" />Pages
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/casestudies" className="nav-link"  >
                <img src="assets/imgs/case-studies.svg" alt="pages Icon" />Case Studies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/blogadmin" className="nav-link"  >
                <img src="assets/img/blogs.svg" alt="pages Icon" />Blogs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/section/job" className="nav-link"  >
                <img src="assets/imgs/jobs.svg" alt="Jobs Icon" />Jobs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/section/faq" className="nav-link"  >
                <img src="assets/imgs/faq.svg" alt="faq Icon" />Faq
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/section/media/" className="nav-link"  >
                <img src="assets/imgs/media.svg" alt="media Icon" />Media Library
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="btm-bar">
          <button className="btn btn-logout" onClick={() => { dispatch(logout()) }}>
            <img src="assets/imgs/logout.svg" alt="logout Icon" />Logout
          </button>
        </div>
      </nav>
      <header className="header">
        <div className="admin-circle">
          <p>M</p>
        </div>
      </header>
    </div>

  )
}
