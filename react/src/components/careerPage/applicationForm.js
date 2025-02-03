import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Loader from '../common/Loader'
import { useLanguage } from '../../utils/LanguageContext'
import { IoMdClose } from "react-icons/io";
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

const ApplicationFrom = ({ togglePopup }) => {
    const { language} = useLanguage()
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        location: "",
        jobRole: '',
        experience: "",
        file: ""
    })
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        location: "",
        jobRole: '',
        experience: "",
        file: "",
        message: "",
        success: false
    })

    const handleEmailInputChange = (e) => {
        const inputValue = e.target.value
        const val = inputValue.replace(" ", "")
        setFormData((prevState) => ({ ...prevState, email: val }))
        setError((prevState) => ({ ...prevState, email: false, message: "" }))
    }

    const fullNameHandler = (e) => {
        const inputValue = e.target.value;
        const validValue = inputValue.replace(/[^A-Za-z\s]/g, '');
        if (validValue.length <= 64) {
            setFormData(prevState => ({ ...prevState, fullName: validValue }));
            setError(prevState => ({ ...prevState, message: "" }));
        }
    };

    const validateEmail = (email) => {
        const validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return validRegex.test(email);
    };

    const handlePhoneInputChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, ''); // Remove non-digit characters

        if (numericValue.length <= 10) {
            setFormData((prevState) => ({ ...prevState, phoneNumber: numericValue }));
            setError((prevState) => ({ ...prevState, phoneNumber: false, message: '' }));
        }
    };

    useEffect(() => {
        if (error.message) {
            let errorMessage = language === "hn" ? "फ़ील्ड खाली नहीं होनी चाहिए!" : "Fields must not be empty!"
            setError(prevState => ({ ...prevState, message: errorMessage }))
        }
    }, [language, error.message])

    const submissionHandler = async (e) => {
        e.preventDefault();
        setDisabled(true)
        setError(prevState => ({ ...prevState, message: "" }))
        if (!formData.email || !formData.experience || !formData.fullName || !formData.jobRole || !formData.location || !formData.phoneNumber || !formData.file) {
            const errorMessage = language === "hn" ? "फ़ील्ड खाली नहीं होनी चाहिए!" : "Fields must not be empty!"
            setError(prevState => ({ ...prevState, success: false, message: errorMessage }))
            setDisabled(false)
            return
        }
        if (!validateEmail(formData.email)) {
            const emailError = language === 'hn' ? "ईमेल अमान्य है!" : "Email is invalid!"
            setError(prevState => ({ ...prevState, email: emailError }))
            setDisabled(false)
            return
        }
        const formDataToSend = new FormData()
        formDataToSend.append("fullName", formData.fullName)
        formDataToSend.append("email", formData.email)
        formDataToSend.append("experience", formData.experience)
        formDataToSend.append("location", formData.location)
        formDataToSend.append("phoneNumber", formData.phoneNumber)
        formDataToSend.append("jobTitle", formData.jobRole)
        formDataToSend.append("file", formData.file)
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/career/`, formDataToSend)
            setFormData({
                fullName: "",
                location: "",
                experience: "",
                jobRole: "",
                phoneNumber: "",
                file: "",
                email: "",
            })
            setError(prevState => ({ ...prevState, success: true }));
            toast.success(language === "hn" ? "प्रपत्र सफलतापूर्वक जमा कर दिया गया है।" : "Form submitted successfully.");
        } catch (error) {
            console.log("Error sending message:", error)
            const serverError = language === "hn" ? "कुछ गलत हो गया। बाद में पुन: प्रयास!" : "Something went wrong. Try again later!"
            setError(prevState => ({ ...prevState, message: serverError }));
        }
        finally {
            setDisabled(false)
        }
    }

    useEffect(() => {
        if (error.success) {
            const timer = setTimeout(() => {
                setError(prevState => ({ ...prevState, success: false })) // Reset success state after showing message
                setDisabled(false)
            }, 10000)
            return () => clearTimeout(timer)
        }
    }, [error.success])

    return (
        <div className="application-job-form">
            <ToastContainer /> {/* Ensure this is included for toast notifications */}
            {disabled ? (
                <Loader />
            ) : (
                <form className="job-apply-form carrer-section" method='post' encType='multipart/form-data'>
                    <h4 className="formheading-detail">{language === "hn" ? "अपना विवरण दर्ज करें" : "Enter Your Details"}</h4>
                    {error.message && (
                        <span className="error">{error.message}</span>
                    )}
                    <div className="inputwith">
                        <label htmlFor="fullName" className="form-label position-relative">{language === "hn" ? "पूरा नाम" : "Full Name"}<span className='starstyle'>*</span></label>
                        <input type="text" className="form-control" id="fullName" placeholder={language === "hn" ? "पूरा नाम दर्ज करें" : "Enter Full Name"} value={formData.fullName}
                            onChange={fullNameHandler} />
                    </div>
                    <div className="inputwith">
                        <label htmlFor="email" className="form-label position-relative">{language === "hn" ? "मेल पता" : "Email Address"}<span className='starstyle'>*</span></label>
                        <input type="email" className="form-control" id="email" placeholder={language === "hn" ? "अपना ईमेल दर्ज करें" : "Enter your Email"} value={formData.email} onChange={handleEmailInputChange} />
                        {error.email && (
                            <span className="error"> {error.email}</span>
                        )}
                    </div>
                    <div className="inputwith">
                        <label htmlFor="phone" className="form-label position-relative">{language === "hn" ? "फ़ोन नंबर" : "Phone Number"}<span className='starstyle'>*</span></label>
                        <input type="tel" className="form-control" id="phone" placeholder={language === "hn" ? "अपना फोन नंबर डालें" : "Enter your Phone Number"} value={formData.phoneNumber} onChange={handlePhoneInputChange} />
                    </div>
                    <div className="inputwith">
                        <label htmlFor="text" className="form-label position-relative">{language === "hn" ? "जगह" : "Location"}<span className='starstyle'>*</span></label>
                        <input type="text" className="form-control" id="Location" disabled={disabled} placeholder={language === "hn" ? "वह शहर दर्ज करें जिसमें आप स्थित हैं" : "Enter the City you are located in"} value={formData.location}
                            onChange={(e) => {
                                setFormData(prevState => ({ ...prevState, location: e.target.value }))
                            }} />
                    </div>
                    <div className="inputwith">
                        <label htmlFor="text" className="form-label position-relative">{language === "hn" ? "नौकरी भूमिका" : "Job Role"}<span className='starstyle'>*</span></label>
                        <select className='form-control' value={formData.jobRole} disabled={disabled} onChange={(e) => {
                            setFormData(prevState => ({ ...prevState, jobRole: e.target.value }))
                        }}>
                            <option disabled selected value=''>{language === "hn" ? "कार्य भूमिका चुनें" : "select a Job Role"}</option>
                            {language === "hn" ? (
                                jobsPa.map((item, index) => (
                                    <option key={index} value={item.jobRole} >
                                        {item}
                                    </option>
                                ))
                            ) : (
                                jobs.map((item, index) => (
                                    <option key={index} value={item.jobRole} >
                                        {item}
                                    </option>
                                )))
                            }
                        </select>
                    </div>
                    <div className="inputwith">
                        <label htmlFor="text" className="form-label position-relative">{language === "hn" ? "अनुभव" : "Experience"}<span className='starstyle'>*</span></label>
                        <input type="text" className="form-control" id="Experience" disabled={disabled} placeholder={language === "hn" ? "वर्षों में अपना कार्य अनुभव दर्ज करें" : "Enter your Job Experience in Years"} value={formData.experience}
                            onChange={(e) => {
                                setFormData(prevState => ({ ...prevState, experience: e.target.value }))
                            }} />
                    </div>
                    <div className="inputwith" style={{ width: "full" }}>
                        <label htmlFor="resume" className="form-label position-relative">{language === "hn" ? "रेज़्यूमे अपलोड करें" : "Upload Resume"}<span className='starstyle'>*</span></label>
                        <div className='uploadfile position-relative'>
                            <input type="file" className="form-control" id="resume" disabled={disabled}
                                onChange={(e) => {
                                    setFormData(prevState => ({ ...prevState, file: e.target.files[0] }))
                                }} />
                            <span className='upload-cv'>{language === "hn" ? "कोई फ़ाइल चयनित नहीं" : "No File choosen"}</span>
                        </div>
                    </div>
                    <div className="text-center mt-4 mb-3">
                        <button className='career-message' type='submit' onClick={submissionHandler} >{language === "hn" ? "अभी अप्लाई करें" : "Apply Now"}</button>
                    </div>
                    <IoMdClose className="closeIcon" onClick={togglePopup} />
                </form>
            )}
        </div>
    )
}

const jobs = ["Senior Producer", "Anchor cum Producer", "Correspondent", "Video Editor", "Graphic Designer", "Production Executive", "Senior Cameraman", "Cameraman", "Assistant Editor", "Programme Producer", "PCR and VMIX Operator", "Anchor Producer", "Production Coordinator", "Head-Video editor", "Makeup Artist", "Uploader", "News Editor"]
const jobsPa = [
    "वरिष्ठ निर्माता", "एंकर सह निर्माता", "संवाददाता", "वीडियो संपादक", "ग्राफिक डिज़ाइनर", "उत्पादन कार्यकारी",  "वरिष्ठ कैमरामैन","कैमरामैन","सहायक संपादक", "कार्यक्रम निर्माता",  "पीसीआर और वीमिक्स ऑपरेटर",    "एंकर निर्माता",   "उत्पादन समन्वयक", "प्रमुख वीडियो संपादक",  "मेकअप आर्टिस्ट", "अपलोडर", "समाचार संपादक"
]

export default ApplicationFrom
