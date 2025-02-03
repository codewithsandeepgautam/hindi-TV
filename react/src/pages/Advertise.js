
import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { useLanguage } from "../utils/LanguageContext";
import axios from "axios";
import { FaAnglesRight } from "react-icons/fa6";
import Loader from "../components/common/Loader";
import SEO from "../components/common/Seo";
const Advertise = () => {
    const { language, changeLanguage ,translate } = useLanguage();
    const [disabled, setDisabled] = useState(false)
    const [formData, setFormData] = useState({
        businessName: "",
        businessType: "",
        email: "",
        address: "",
        message: ""
    })
    const [error, setError] = useState({
        businessName: "",
        businessType: "",
        email: "",
        address: "",
        message: "",
        success: false
    });
    const handleEmailInputChange = (e) => {
        const inputValue = e.target.value;
        const val = inputValue.replace(" ", '');
        setFormData((prevState) => ({ ...prevState, email: val }));
        setError((prevState) => ({ ...prevState, email: false, message: '' }));
    };
    const validateEmail = (email) => {
        const validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return validRegex.test(email);
    };
    const handleMessageInputChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 500) {
            setFormData(prevState => ({ ...prevState, message: inputValue }));
            setError(prevState => ({ ...prevState, message: ""}));
        }
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
        if (!formData.businessName || !formData.businessType || !formData.address || !formData.email || !formData.message) {
            const errorMessage = language === "hn" ? "फ़ील्ड खाली नहीं होनी चाहिए!" : "Fields must not be empty!";
            setError(prevState => ({ ...prevState, success: false, message: errorMessage }))
            setDisabled(false)
            return
        }
        if (!validateEmail(formData.email)) {
            const emailError = language === 'hn' ? "ईमेल अमान्य है!" : "Email is invalid!"
            setError(prevState => ({ ...prevState, email: emailError }));
            setDisabled(false);
            return;
        }
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/advertise`, formData)
            setFormData({
                businessName: '',
                businessType: '',
                address: '',
                email: '',
                message: ''
            })
            setError(prevState => ({ ...prevState, success: true }));

        } catch (error) {
            const serverError = language === "hn" ? "कुछ गलत हो गया। बाद में पुन: प्रयास!" : "Something went wrong. Try again later!"
            setError(prevState => ({ ...prevState, message: serverError }));
        } finally {
            setDisabled(false)
        }
    }
    useEffect(() => {
        if (error.success) {
            const timer = setTimeout(() => {
                setFormData((prevState) => ({
                    ...prevState,
                    businessName: '',
                    businessType: '',
                    address: '',
                    email: '',
                    message: ''
                }))
                setError((prevState) => ({ ...prevState, success: false }))
                setDisabled(false)
            }, 6000)
            return () => clearTimeout(timer)
        }
    }, [error.success])
    return (
        <>
        <SEO title="My Hindi TV पर विज्ञापन, Reach Hindi Audience" description="My Hindi TV पर विज्ञापन देकर लाखों हिंदी दर्शकों तक पहुंचें। हमारी विज्ञापन सेवाएं और प्रीमियम विकल्प जानें।"/>
            <Navbar changeLanguage={changeLanguage} currentLanguage={language} />
            <section className="padd advertise">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <h1>{translate("advertiseHeading1")}</h1>
                            <p className="py-3">{translate("advertiseContent1")}
                            </p>
                            <h3 className="pb-2">{translate("advertiseHeading2")}</h3>
                            <ul className="audience-content pb-3">
                                <li><FaAnglesRight className="righticon-listing"/>{translate("advertiseContent2.1")}</li>
                                <li><FaAnglesRight className="righticon-listing"/>{translate("advertiseContent2.2")}</li>
                                <li><FaAnglesRight className="righticon-listing"/>{translate("advertiseContent2.3")}</li>
                                <li><FaAnglesRight className="righticon-listing"/>{translate("advertiseContent2.4")}</li>
                            </ul>
                            <h4 className="pb-3">{translate('advertiseHeading3')}</h4>
                            <p className="pb-3">{language === "hn" ? "हम आपके संदेश को सही समय पर सही दर्शकों तक पहुंचाने के लिए विभिन्न प्रकार के विज्ञापन और डिजिटल समाधान प्रदान करते हैं। पूछताछ के लिए कृपया संपर्क करें -":"We offer a wide variety of advertising and digital solutions to highlight your message to the right audience at the right time. For inquiries, please contact -"}</p>
                            <p>{language === "hn" ? "ईमेल:":"Email:"} <a className='emailcolorchange' href="mailto:helpdeskmyhinditv@gmail.com">helpdeskmyhinditv@gmail.com</a></p>
                        </div>
                        <div className="col-md-4">
                            {error.success ? (
                                 <div className="thanks-message-sett w-full flex flex-col justify-between mb-5 lg:mb-0 p-0 lg:p-5 border rounded-lg text-center">
                                 <div>
                                   <h2 className="text-black">{translate("thankyou")}</h2>
                                   <p className='text-2xl text-success font-weight-bold'>{translate("thankYouLine1")}</p>
                                   <div className='d-flex justify-content-center'>
                                     {/* <FaCheckCircle color='#008000' className='text-5xl md:text-7xl' /> */}
                                   </div>
                                 </div>
                                 <p className='text-lg font-weight-bold'>{translate("thankYouLine2")}</p>
                               </div>
                            ) :(
                                disabled ? (
                                <Loader />
                            ) : (
                                <div className="card">
                                    <div className="card-body">
                                        <h3>{language === "hn" ? "हमारे साथ विज्ञापन" : "Advertise with Us"}</h3>
                                        {error.message && (
                                            <span className="error">{error.message}</span>
                                        )}
                                        <form className="mt-2" onSubmit={submissionHandler}>
                                            <div className="mb-2">
                                                <label for="name" className="form-label">{language === "hn" ? "व्यवसाय का नाम" : "Business Name"}</label>
                                                <input type="text" className="form-control" id="name" placeholder={language === "hn" ? "अपना व्यवसाय नाम दर्ज करें" : "Enter your business name"} value={formData.businessName}
                                                    onChange={(e) => {
                                                        setFormData(prevState => ({ ...prevState, businessName: e.target.value }));
                                                    }}
                                                />
                                                {error.businessName&&(
                                                    <span className="error">{error.businessName}</span>
                                                )}
                                            </div>
                                            <div className="mb-2">
                                                <label for="type" className="form-label">{language === "hn" ? "व्यापार के प्रकार" : "Business Type"}</label>
                                                <input type="text" className="form-control" placeholder={language === "hn" ? "अपना व्यवसाय प्रकार दर्ज करें" : "Enter your business type"} value={formData.businessType}
                                                    onChange={(e) => {
                                                        setFormData(prevState => ({ ...prevState, businessType: e.target.value }));
                                                    }} />
                                                      {error.businessType&&(
                                                    <span className="error">{error.businessType}</span>
                                                )}
                                            </div>
                                            <div className="mb-2">
                                                <label for="email" className="form-label">{language === "hn" ? "ईमेल" : "Email"}</label>
                                                <input type="text" className="form-control" id="email" placeholder={language === "hn" ? "अपना ईमेल दर्ज करें" : "Enter your email"} value={formData.email}
                                                    onChange={(e) => handleEmailInputChange(e)} />
                                                    {error.email && (
                                                        <span className="error">{error.email}</span>
                                                    )}
                                            </div>
                                            <div className="mb-2">
                                                <label for="Address" className="form-label">{language === "hn" ? "पता" : "Address"}</label>
                                                <input type="text" className="form-control" id="name" placeholder={language === "hn" ? "अपना कार्यालय पता दर्ज करें" : "Enter your office address"} value={formData.address}
                                                    onChange={(e) => {
                                                        setFormData(prevState => ({ ...prevState, address: e.target.value }))
                                                    }}
                                                />
                                                  {error.address&&(
                                                    <span className="error">{error.address}</span>
                                                  )}
                                            </div>
                                            <div className="mb-2">
                                                <label for="message" className="form-label">{language === "hn" ? "संदेश" : "Message"}</label>
                                                <textarea className="form-control" id="message" rows="5" placeholder={language === "hn" ? "अपना संदेश दर्ज करें" : "Enter your message"} onChange={(e) => handleMessageInputChange(e)} value={formData.message} style={{ resize: 'none' }}></textarea>
                                            </div>
                                            <button type="submit" className="submitbtn-bgchanged">{language === "hn" ? "जमा करना" : "Submit"}</button>
                                        </form>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Advertise;

