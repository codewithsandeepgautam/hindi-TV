import React, { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import { useLanguage } from "../utils/LanguageContext";
import Footer from "../components/common/Footer";
import "../style/style.css";
// import { toast } from "react-toastify";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import CallIcon from '@mui/icons-material/Call';
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/common/Loader";
import SEO from "../components/common/Seo";

const Contact = () => {
  const { changeLanguage, language, translate} = useLanguage();
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    success: false
  });

  const fullNameHandler = (e) => {
    const inputValue = e.target.value;
    const validValue = inputValue.replace(/[^A-Za-z\s]/g, '');
    if (validValue.length <= 64) {
      setFormData(prevState => ({ ...prevState, name: validValue }));
      setError(prevState => ({ ...prevState, message: "" }));
    }
  };
  const handleEmailInputChange = (e) => {
    const inputValue = e.target.value;
    const val = inputValue.replace(" ", '');
    setFormData((prevState) => ({ ...prevState, email: val }));
    setError((prevState) => ({ ...prevState, email: false, message: '' }));
  };
  const handleSubjectInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 50) {
      setFormData(prevState => ({ ...prevState, subject: inputValue }));
      setError(prevState => ({ ...prevState, message: "" }));
    }
  };
  const handleMessageInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 500) {
      setFormData(prevState => ({ ...prevState, message: inputValue }));
      setError(prevState => ({ ...prevState, message: "" }));
    }
  };
  const validateEmail = (email) => {
    const validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return validRegex.test(email);
  };
  useEffect(() => {
    if (error.message){
        let errorMessage = language === "hn" ? "फ़ील्ड खाली नहीं होनी चाहिए!" : "Fields must not be empty!"
        setError(prevState => ({ ...prevState, message: errorMessage }))
    }
  },[language, error.message])
  const submissionHandler = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setError(prevState => ({ ...prevState, message: "" }));

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      const errorMessage = language === "hn" ? "फ़ील्ड खाली नहीं होनी चाहिए!" : "Fields must not be empty!";
      setError(prevState => ({ ...prevState, success: false, message: errorMessage }));
      setDisabled(false);
      return;
    }
    if (!validateEmail(formData.email)) {
      const emailError = language === 'hn' ? "ईमेल अमान्य है!" : "Email is invalid!"
      setError(prevState => ({ ...prevState, email: emailError }));
      setDisabled(false);
      return;
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/contact/mail`, formData);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setError(prevState => ({ ...prevState, success: true }));
    } catch (error) {
      console.error("Error sending message:", error);
      const serverError = language === "hn" ? "कुछ गलत हो गया। बाद में पुन: प्रयास!" : "Something went wrong. Try again later!"
      setError(prevState => ({ ...prevState, message: serverError }));
    } finally {
      setDisabled(false);
    }
  };
  useEffect(() => {
    if (error.success) {
      const timer = setTimeout(() => {
        setFormData((prevState) => ({
          ...prevState,
          name: "",
          email: "",
          subject: "",
          message: "",
        }));
        setError((prevState) => ({ ...prevState, success: false }));
        setDisabled(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [error.success]);
  return (
    <div>
      <SEO title="Contact us - My Hindi TV, हिंदी न्यूज़" description="हमारे साथ संपर्क करें। My Hindi TV पर हिंदी समाचार, ताजातरीन खबरें और अपडेट्स के लिए हमें बताएं।"/>
      <Navbar changeLanguage={changeLanguage} currentLanguage={language} />
      <section className="padd section-paddingfix">
        <div className="contact-section">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6 contact-us position-relative">
              {error.success ? (
                <div className="thanks-message-sett w-full flex flex-col justify-between mb-5 lg:mb-0 p-0 lg:p-5 border rounded-lg text-center">
                  <div>
                    <h2 className="text-black">{translate("thankyou")}</h2>
                    <p className='text-2xl text-success font-weight-bold'>{translate("thankYouLine1")}</p>
                    <div className='d-flex justify-content-center'>
                    </div>
                  </div>
                  <p className='text-lg font-weight-bold'>{translate("thankYouLine2")}</p>
                </div>
              ) : (
                disabled ? (
                  <Loader />
                ) : (
                  <form
                    className="form contactForm p-1 p-xl-2 position-relative"
                    id="contactusForm"
                    onSubmit={submissionHandler}
                  >
                    <h4 className="contact-title text-start pb-2"> {translate('contactMessage')}</h4>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            name="name"
                            type="text"
                            className="form-control"
                            id="name"
                            value={formData.name}
                            onChange={(e) => fullNameHandler(e)}
                            disabled={disabled}
                            placeholder="Your Name"
                          />
                          {error.name && (
                            <span className="error" style={{ color: 'red' }}> {error.name}</span>
                          )}
                          <label htmlFor="name">{translate('contactFormName')}</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            name="email"
                            disabled={disabled}
                            className="form-control"
                            id="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onKeyDown={(e) => {
                              if (e.key === ' ') {
                                e.preventDefault();
                              }
                            }}
                            onChange={(e) => handleEmailInputChange(e)}
                          />
                          {error.email && (
                            <span className="error" style={{ color: 'red' }}> {error.email}</span>
                          )}
                          <label htmlFor="email">{translate('contactFormEmail')}</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <input
                            name="subject"
                            type="text"
                            disabled={disabled}
                            className="form-control"
                            id="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={(e) => handleSubjectInputChange(e)}
                          />
                          {error.subject && (
                            <span className="error" style={{ color: 'red' }}> {error.subject}</span>
                          )}
                          <label htmlFor="subject">{translate('contactFormSubject')}</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            name="message"
                            className="form-control"
                            placeholder="Leave a message here"
                            id="message"
                            disabled={disabled}
                            value={formData.message}
                            onChange={(e) => handleMessageInputChange(e)}
                            style={{ height: "200px", resize: 'none' }}
                          ></textarea>
                          {error.message && (
                            <span className="error" style={{ color: 'red' }}> {error.message}</span>
                          )}
                          <label htmlFor="message">{translate('contactFormMessage')}</label>
                        </div>
                      </div>
                      <div className="col-12 text-start">
                        <button className="button-contactForm" type="submit">
                          {translate('contactButtonText')}
                        </button>
                      </div>
                    </div>
                  </form>
                ))}
            </div>
            <div className="col-lg-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.1801863694736!2d76.6942165!3d30.713334499999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fef86ab7ec697%3A0xd3439394ac3d1af1!2sMy%20Punjabi%20TV!5e0!3m2!1sen!2sin!4v1705382919134!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: "1px solid #ddd", height: '510px' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map showing the location of Abacus Cloud"
              ></iframe>
            </div>
          </div>
          <div className="office-address pt-3 mt-3">
            <div className="container">
              <div className="row d-flex align-items-center g-4">
                <Link to={`tel:${'8968700675'}`} className="text-decoration-none col-lg-4 contact-info-item position-relative  text-center p-3 border py-5 px-3" target="_blank">
                  <CallIcon className="text-white mb-4" fontSize="large" />
                  <h5 className="text-white">{translate("contactNumberText")}</h5>
                  <h5 className="fw-light text-white">+91 8968700675</h5>
                </Link>
                <Link to={`mailto:${'helpdeskmypunjabitv@gmail.com'}`} className="text-decoration-none col-lg-4 contact-info-item position-relative text-center p-3 border py-5 px-3" target="_blank">
                  <MarkunreadIcon className="text-white mb-4" fontSize="large" />
                  <h5 className="text-white">{translate("contactMailText")}</h5>
                  <h5 className="fw-light text-white">helpdeskmyhinditv@gmail.com</h5>
                </Link>
                <Link to={'https://maps.app.goo.gl/4Ys5cE1KrrnjNBvF6'} className="col-lg-4 contact-info-item position-relative text-center p-3 border py-5 px-3 text-decoration-none" target="_blank" >
                  <LocationOnIcon className="text-white mb-4" fontSize="large" />
                  <h5 className="text-white">{translate("contactAddress")}</h5>
                  <h5 className="fw-light text-white">{translate("contactAddressText")}</h5>
                </Link>
              </div>
            </div>
          </div>
          </div>
        </div>
        {/* <ToastContainer /> */}
      </section>
      <Footer />
    </div>
  );
};
export default Contact;
