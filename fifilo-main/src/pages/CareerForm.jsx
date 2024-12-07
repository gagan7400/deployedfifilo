import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate, useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux'
// import { contactus } from '../redux/actions/contactAction';
import Spinner from 'react-bootstrap/Spinner';
export default function Careerform({ closemodel }) {
    // let dispatch = useDispatch();
    let { jobtype } = useParams();
    let nav = useNavigate()
    // const { success, loading } = useSelector((state) => state.contact);
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Number, setNumber] = useState("")
    const [Message, setMessage] = useState("")
    // const [jobrole, setjobrole] = useState(jobtype)
    // const [resume, setresume] = useState("")
    const [errors, setErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        AOS.init();
    }, []);

    const validate = () => {
        const newErrors = {};

        if (!Name) {
            newErrors.name = 'Name is required';
        } else if (Name.length < 3) {
            newErrors.name = 'Name must be at least 3 letters';
        }
        if (!Email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(Email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!Number) {
            newErrors.number = 'Phone number is required';
        } else if (!/^\d{10}$/.test(Number)) {
            newErrors.number = 'Phone number is invalid';
        }
        if (!Message) {
            newErrors.message = 'Message is required';
        } else if (Message.length < 3) {
            newErrors.message = 'Message must be at least 3 letters';
        }
        // if (!jobrole) {
        //     newErrors.message = 'jobrole is required';
        // }
        return newErrors;
    };

    useEffect(() => {
        if (showErrors) {
            setShowErrors(false);
            setErrors({});
        }
        return () => { }

    }, [Email, Name]);
    // let addresume = (event) => {
    //     event.preventDefault()
    //     let file = event.target.files[0];

    //     setresume(file);
    // }
    const submithandler = async (e) => {

        e.preventDefault();
        setLoading(true)
        const validationErrors = validate();
        if (!Name || !Email || !Number || !Message || Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setShowErrors(true);
            setLoading(false)
        } else {
            setLoading(true)
            let date = new Date();
            setErrors({});
            setShowErrors(false);
            let formdata = new FormData();
            formdata.append('name', Name);
            formdata.append('email', Email);
            formdata.append('phonenumber', Number);
            formdata.append('message', Message);
            // formdata.append('jobrole', jobrole);
            formdata.append('date', date.toLocaleDateString());
            // fetch("https://script.google.com/macros/s/AKfycbx47sHgIKLw2QEnhmrZ2EyxiUF7tvTCyx31T0dPESi-Z1YCIxRCOyPD8MAO_wKc_hrG4Q/exec", {
            //     method: "POST",
            //     body: formdata,
            // })
            // formdata.append("resume", resume)
            // dispatch(contactus({ name: Name, email: Email, phonenumber: Number, message: Message, servicerequired, resume: resume[1] }))
            try {
                let data = await fetch("http://localhost:5000/admin/contactus/jobapplicant", {
                    method: "POST",
                    body: formdata,
                });
                let result = await data.json();

                if (result.Status) {
                    setLoading(false)
                    setEmail('')
                    setMessage("")
                    setNumber("");
                    setName("")
                    setEmail("");
                    closemodel()
                    nav("/thank-you");

                }
            } catch (error) {
                alert("Error Occured")
            }
        }
    }


    return (
        <>
            <form onSubmit={submithandler}>
                <div className="form__card">
                    <div className="contact__form" data-aos="fade-up" data-aos-duration="800">
                        <div className="inr__input" >
                            <span className='icon'> <img src="assets/img/user-01.svg" alt="contact__form" />  </span>
                            <input type="text"
                                name="Name"
                                value={Name}
                                onChange={(e) => { setName(e.target.value) }}
                                className="form-control"
                                placeholder="Your Name"
                                autoComplete='off'
                            />
                            {errors.name && <div className="error text-danger position-absolute" style={{ color: "#f0f1f1" }}>{errors.name}</div>}
                        </div>
                        <div className="inr__input" >
                            <span className='icon'><img src="assets/img/mail-02.svg" alt="contact__form" /></span>
                            <input
                                type="email"
                                name="Email"
                                value={Email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                className="form-control"
                                placeholder="Your E-mail"
                                autoComplete='off'
                            />
                            {errors.email && <div className="error text-danger position-absolute" style={{ color: "#f0f1f1" }} >{errors.email}</div>}
                        </div>
                        <div className="inr__input"  >
                            <span className='icon'><img src="assets/img/phone-02.svg" alt="contact__form" /></span>
                            <input
                                type="text"
                                name="Number"
                                value={Number}
                                onChange={(e) => { setNumber(e.target.value) }}
                                className="form-control"
                                placeholder="Your Number"
                                autoComplete='off'
                            />
                            {errors.number && <div className="error text-danger position-absolute" style={{ color: "#f0f1f1" }} >{errors.number}</div>}
                        </div>
                        <div className="inr__input"  >
                            <span className='icon'><img src="assets/img/message.svg" alt="contact__form" /></span>
                            <input
                                type="text"
                                name="Message"
                                value={Message}
                                onChange={(e) => { setMessage(e.target.value) }}
                                className="form-control"
                                placeholder="Your Message"
                                autoComplete='off'
                            />
                            {errors.message && <div className="error text-danger position-absolute" style={{ color: "#f0f1f1" }} >{errors.message}</div>}
                        </div>
                        {/* <div className="inr__input"  >
                             <span className='icon'><img src="assets/img/message.svg" alt="contact__form" /></span> 
                            <input
                                type="text"
                                name="jobrole"
                                value={jobrole}
                                onChange={(e) => { setjobrole(e.target.value) }}
                                className="form-control"
                                placeholder="Your jobrole"
                                autoComplete='off'
                            />
                            {errors.jobrole && <div className="error text-danger position-absolute" style={{ color: "#f0f1f1" }} >{errors.message}</div>}
                        </div> */}
                        {/* <div className="inr__input"  >
                              <span className='icon'><img src="assets/img/message.svg" alt="contact__form" /></span>  
                            <input
                                type="file"
                                name="resume"
                                accept="application/pdf"
                                onChange={addresume}
                                className="form-control"
                                placeholder="Your resume"
                                autoComplete='off'
                            />
                            {errors.resume && <div className="error text-danger position-absolute" style={{ color: "#f0f1f1" }} >{errors.message}</div>}
                        </div> */}
                        <div>
                            <button className="btn btn__primary" type="submit">Submit
                                {loading ? <Spinner
                                    animation="border"
                                    role="status"
                                    as="span"
                                    size="sm"
                                    aria-hidden="true"
                                >
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner> :
                                    <img src="assets/img/arrow-up-right.svg" alt="contact__form" />
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </form>


        </>
    )
}
