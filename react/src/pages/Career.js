import React, { useState } from "react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import Careerimg from "../assets/images/hiring.jpg";
import hiring from "../assets/images/we-are-hiring.gif";
// import { FaAnglesRight } from "react-icons/fa6";
// import { Link } from "@mui/material";
import ApplicationForm from "../components/careerPage/applicationForm";
import { useLanguage } from "../utils/LanguageContext";
import SEO from "../components/common/Seo";
const Career = () => {
    const {language , changeLanguage} = useLanguage()
    // const [activeIndex, setActiveIndex] = useState(null);
    // const handleAccordionClick = (index) => {
    //     setActiveIndex(index === activeIndex ? null : index);
    // };
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    return (
        <>
        <SEO title="Career at My Hindi TV, Join Our Team" description="My Hindi TV में नौकरी के अवसरों के लिए आवेदन करें। हमारे साथ जुड़कर हिंदी समाचार और मीडिया क्षेत्र में काम करें।"/>
            <Navbar changeLanguage={changeLanguage} currentLanguage={language} />
            <section className="padd Investor position-relative">
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="col-md-6">
                            <div className="carrer-section">
                                <h1>{language === "hn" ? "हम भर्ती कर रहे हैं!" : "We are Hiring!"} <img className="hiring-icon" src={hiring} alt="career" /></h1>
                                <p className="pb-3">{language === "hn" ? "हम इस दुनिया को सभी के लिए एक बेहतर जगह बनाने के लिए नए विचारों और दृष्टि वाले नवप्रवर्तकों की अगली पीढ़ी की तलाश में हैं। यदि आप उन लोगों में से हैं जो भीड़ भरे इलाके में नए रास्ते बनाना जानते हैं, तो हमारी कंपनी आपसे बात करना पसंद करेगी।" : "We are on the hunt for the next generation of innovators with new ideas and visions to make this world a better place for everyone. If youre one of those who knows how to carve new paths in a crowded territory, our company would love to talk to you."}</p>
                                <p className="mb-3">
                                {language === "hn" ? "तो आप किस बात की प्रतीक्षा कर रहे हैं?" : "So, what are you waiting for?"} <br></br>
                                {language === "hn" ? "हमारे संगठन का हिस्सा बनने का अवसर प्राप्त करें। हम आपका पक्ष सुनना चाहते हैं." : "Grab the opportunity to become a part of our organization. We want to hear from your side."}
                                </p>
                                <button className="career-message mb-3" onClick={togglePopup}>{language ==="hn" ? "अपना बायोडाटा भेजें":"Send your resume"}</button>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <img className="rounded" src={Careerimg} alt="career" />
                        </div>
                    </div>
                    <div className="carrer-section">
                        <h4 className="job-title">{language ==="hn" ? "मौजूदा":"Current"}<span className="dark">{language ==="hn" ? " प्रारंभिक":" Opening"}</span> {language ==="hn" ? "नौकरियां":"Jobs"}</h4>
                        {language ==="hn" ? "कोई नौकरी उपलब्ध नहीं है.":"No Jobs available."}
                        <div className="accordion carrierpage pt-4" id="accordionExample">
                            {/* <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className={`accordion-button ${activeIndex === 0 ? '' : 'collapsed'}`} type="button" onClick={() => handleAccordionClick(0)} aria-expanded={activeIndex === 0} aria-controls="collapseOne">
                                        Senior Cameraman Director of Photography/Cinematographer 
                                    </button>
                                </h2>
                                <div id="collapseOne" className={`accordion-collapse collapse ${activeIndex === 0 ? 'show' : ''}`} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="job-details">
                                            <p><strong>Job Title: </strong>Senior Cameraman Director of Photography/Cinematographer</p>
                                            <p><strong>Location:</strong> B-70, Phase 7, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, hnnjab 160055</p>
                                            <p><strong>Job Type: </strong>Full Time</p>
                                            <p><strong>Experience:</strong> 2-4 Years</p>
                                            <p><strong>Number of Positions:</strong> 1</p>
                                            <p><strong>Job Description</strong></p>
                                            <p>The senior cameraman plays a crucial role in the visual storytelling process,
                                                translating the director's vision into compelling imagery. They work closely with the director, producers,
                                                and other key personnel to achieve the desired look and feel of the project.</p>
                                            <p><strong>Required Skills and Qualifications:</strong> Bachelors degree in Film Production, Media Studies, or related field.</p>
                                            <p><FaAnglesRight className="righticon-listing" />Visual Arts Degrees in visual arts, such as photography, graphic design.
                                                as they often involve training in visual aesthetics, </p>
                                            <p><FaAnglesRight className="righticon-listing" />communication skills communication skills and the ability to work collaboratively in a team-oriented environment.</p>
                                            <div className="job-apply">
                                                <Link onClick={togglePopup}>Apply Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className={`accordion-button ${activeIndex === 1 ? '' : 'collapsed'}`} type="button" onClick={() => handleAccordionClick(1)} aria-expanded={activeIndex === 1} aria-controls="collapseTwo">
                                        Video Editor
                                    </button>
                                </h2>
                                <div id="collapseTwo" className={`accordion-collapse collapse ${activeIndex === 1 ? 'show' : ''}`} aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="job-details">
                                            <p><strong>Job Title: </strong>Video Editor</p>
                                            <p><strong>Location:</strong> B-70, Phase 7, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, hnnjab 160055</p>
                                            <p><strong>Job Type: </strong>Full Time</p>
                                            <p><strong>Experience:</strong> 2-6 Years</p>
                                            <p><strong>Number of Positions:</strong> 3</p>
                                            <p><strong>Job Description</strong></p>
                                            <p>The senior cameraman plays a crucial role in the visual storytelling process,
                                                translating the director's vision into compelling imagery. They work closely with the director, producers,
                                                and other key personnel to achieve the desired look and feel of the project.</p>
                                            <p><strong>Required Skills and Qualifications:</strong> Bachelors degree in Film Production, Media Studies, or related field.</p>
                                            <p><FaAnglesRight className="righticon-listing" />Visual Arts Degrees in visual arts, such as photography, graphic design.
                                                as they often involve training in visual aesthetics, </p>
                                            <p><FaAnglesRight className="righticon-listing" />communication skills communication skills and the ability to work collaboratively in a team-oriented environment.</p>
                                            <div className="job-apply">
                                                <Link onClick={togglePopup} >Apply Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button className={`accordion-button ${activeIndex === 2 ? '' : 'collapsed'}`} type="button" onClick={() => handleAccordionClick(2)} aria-expanded={activeIndex === 2} aria-controls="collapseThree">
                                        Head- Media Operations
                                    </button>
                                </h2>
                                <div id="collapseThree" className={`accordion-collapse collapse ${activeIndex === 2 ? 'show' : ''}`} aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="job-details">
                                            <p><strong>Job Title: </strong>Head- Media Operations</p>
                                            <p><strong>Location:</strong> B-70, Phase 7, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, hnnjab 160055</p>
                                            <p><strong>Job Type: </strong>Full Time</p>
                                            <p><strong>Experience:</strong> 6 Years</p>
                                            <p><strong>Number of Positions:</strong> 3</p>
                                            <p><strong>Job Description</strong></p>
                                            <p>The senior cameraman plays a crucial role in the visual storytelling process,
                                                translating the director's vision into compelling imagery. They work closely with the director, producers,
                                                and other key personnel to achieve the desired look and feel of the project.</p>
                                            <p><strong>Required Skills and Qualifications:</strong> Bachelors degree in Film Production, Media Studies, or related field.</p>
                                            <p><FaAnglesRight className="righticon-listing" />Visual Arts Degrees in visual arts, such as photography, graphic design.
                                                as they often involve training in visual aesthetics, </p>
                                            <p><FaAnglesRight className="righticon-listing" />communication skills communication skills and the ability to work collaboratively in a team-oriented environment.</p>
                                            <div className="job-apply">
                                                <Link onClick={togglePopup}>Apply Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <ApplicationForm togglePopup={togglePopup}/>
                    )}
            </section>
            <Footer />
        </>
    );
};

export default Career;
