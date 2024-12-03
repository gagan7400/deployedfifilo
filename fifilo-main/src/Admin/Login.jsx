import React, { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'aos/dist/aos.css';
import 'owl.carousel/dist/owl.carousel.min.js';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import 'owl.carousel';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { loaduser, login } from '../redux/actions/adminloginaction';

const Login = () => {
    let nav = useNavigate();
    const { isAuthenticated, error } = useSelector((state) => state.user);
    let dispatch = useDispatch();
    const heroBnrRef = useRef(null);
    const heroBnrImgWrapRef = useRef(null);
    const gridRef = useRef([]);
    const [Password, setPassword] = useState("")
    const [Email, setEmail] = useState("")
    const [errors, setErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const validate = () => {
        const newErrors = {};
        if (!Email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(Email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!Password) {
            newErrors.password = 'Password  is required';
        }
        return newErrors;
    };
    useEffect(() => {
        const cursorOffset = function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.style.setProperty('--cursor-x', x + 'px');
            this.style.setProperty('--cursor-y', y + 'px');
        };

        const heroBnrElement = heroBnrRef.current;
        const heroBnrImgWrapElement = heroBnrImgWrapRef.current;

        if (heroBnrElement) {
            heroBnrElement.addEventListener('mousemove', cursorOffset);
        }
        if (heroBnrImgWrapElement) {
            heroBnrImgWrapElement.addEventListener('mousemove', cursorOffset);
        }

        gridRef.current.forEach((gridElement) => {
            gridElement.addEventListener('mousemove', function (e) {
                const cards = gridElement.querySelectorAll('.card');
                cards.forEach((card) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    card.style.setProperty('--cursor-x', x + 'px');
                    card.style.setProperty('--cursor-y', y + 'px');
                });
            });
        });
        AOS.init();
    }, []);
    useEffect(() => {
        if (showErrors) {
            const timer = setTimeout(() => {
                setShowErrors(false);
                setErrors({});
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showErrors]);
    const submithandler = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setShowErrors(true);
            if (validationErrors.email) {
                toast.error(validationErrors.email, {
                    position: "top-center", zIndex: 100
                });
            }
            if (validationErrors.password) {
                toast.error(validationErrors.password, {
                    position: "top-center", zIndex: 100
                });
            }

        } else {
            setErrors({});
            setShowErrors(false);
            dispatch(login(Email, Password))
        }

    }

    useEffect(() => {
        if (error) {
            setShowErrors(true);
            toast.error(error, {
                position: "top-center", zIndex: 100
            });
        }
    }, [error])
    useEffect(() => {
        dispatch(loaduser())
        if (isAuthenticated) {
            setTimeout(() => {
                nav('/dashboard')
            }, 10);
        }
    }, [dispatch, nav, isAuthenticated])
    return (
        <>
            <div className="contact__bnr hero__bnr" ref={heroBnrRef} >
                <ToastContainer autoClose={2000} />
                <style>

                </style>
                <div className="col-lg-4 col-md-5">
                    <form onSubmit={submithandler}>
                        <div className="form__card">
                            <div className="contact__form" data-aos="fade-up" data-aos-duration="800">
                                <div className="inr__input" >
                                    <span className='icon'><img src="assets/img/mail-02.svg" alt="contact__form" /></span>
                                    <input
                                        type="email"
                                        name="Email"
                                        id="loginEmailinput"
                                        value={Email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        className="form-control"
                                        placeholder="Your E-mail"
                                    />
                                    {errors.email && <div className="error text-danger position-absolute" style={{ color: "#f0f1f1" }} >{errors.email}</div>}
                                </div>
                                <div className="inr__input" >
                                    <span className='icon'><img src="assets/imgs/password.svg" alt="contact__form" /></span>
                                    <input
                                        type="password"
                                        name="Password"
                                        value={Password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        className="form-control"
                                        placeholder="Your password"
                                        autoComplete='false' />
                                    {errors.password && <div className="error text-danger position-absolute" style={{ color: "#f0f1f1" }} >{errors.password}</div>}
                                </div>

                                <div>
                                    <button className="btn btn__primary" type="submit" >Login<img src="assets/img/arrow-up-right.svg" alt="contact__form" /></button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </>
    );
};

export default Login;
