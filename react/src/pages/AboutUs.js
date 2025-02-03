import React from "react";
import "../style/style.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../utils/LanguageContext";
import { GrFacebookOption } from "react-icons/gr";
import { LuInstagram } from "react-icons/lu";
import { FaLinkedinIn } from "react-icons/fa6";
import TwitterIcon from "@mui/icons-material/Twitter";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import img from "../assets/images/_RA99161.webp";
import SEO from "../components/common/Seo";

const AboutUs = () => {
  const { changeLanguage, language, translate } = useLanguage();
  return (
    <div>
      <SEO title="My Hindi TV - हिंदी न्यूज़, ताजा ख़बरें और Updates" description="My Hindi TV पर पढ़ें ताजातरीन हिंदी समाचार, ब्रेकिंग न्यूज़, और पूरी जानकारी। जानें हमसे जुड़ी हर ख़बर।"/>
      <Navbar changeLanguage={changeLanguage} currentLanguage={language} />
      <section className="live-news padd features latest-news about-us section-paddingfix">
        <div className="container py-3">
          <div className="row align-items-center">
            <div className="col-md-9">
              <h2 className="mb-3 text-black">{translate("navAbout")}</h2>
              <p>{translate("aboutContent")}</p>
            </div>
            <div className="col-md-3">
              <img
                style={{
                  border: "4px solid #373737",
                }}
                src={img}
                alt="img"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="py-3 py-md-5 py-xl-8">
        <div class="container">
          <div class="row gy-3 gy-md-4 gy-lg-0">
            {/* <div class="col-12 col-lg-6">
              <div class="bg-style-profilediv">
                <div class="row gy-3 gy-md-0 align-items-md-center">
                  <div class="col-md-5 about_bg_profile_style text-center">
                    <img src={img} alt="img" />
                  </div>
                  <div class="col-md-7">
                    <div class="card-body p-3">
                      <span className="dirictor-div-style">DIRECTOR</span>
                      <h2 class="card-title h4 mb-3 pt-2">
                        PAWANPREET DHALIWAL
                      </h2>
                      <p class="card-text pb-3">
                        With years of experience and deep industry knowledge, we
                        have a proven track record of success and are pushing
                        ourselves to stay ahead of the curve.
                      </p>
                      <Link
                        to="https://www.instagram.com/mypunjabitv/"
                        target="_blank"
                      >
                        <LuInstagram />
                      </Link>
                      <Link
                        to="https://www.instagram.com/mypunjabitv/"
                        target="_blank"
                      >
                        <FaLinkedinIn />
                      </Link>
                      <Link
                        to="https://twitter.com/mypunjabitv"
                        target="_blank"
                      >
                        <TwitterIcon />
                      </Link>
                      <Link
                        to="https://www.facebook.com/tvmypunjabi"
                        target="_blank"
                      >
                        <GrFacebookOption />
                        {/* <FontAwesomeIcon icon="fa-brands fa-facebook" /> */}
                      {/* </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div> */} 
            <div class="col-12 col-lg-6">
              <div class="bg-style-profilediv">
                <div class="row gy-3 gy-md-0 align-items-md-center">
                  <div class="col-md-5 about_bg_profile_style text-center">
                    <img src={img} alt="img" />
                  </div>
                  <div class="col-md-7">
                    <div class="card-body p-3">
                      <span className="dirictor-div-style">{language === "hn"?"निदेशक मीडिया":"DIRECTOR MEDIA"}</span>
                      <h2 class="card-title h4 mb-3 pt-2">
                      {language === "hn"?"गुरनितिका संधू":"GURNITIKA SANDHU"}
                      </h2>
                      <p class="card-text pb-3">
                        {language === "hn"?"वर्षों के अनुभव और गहन उद्योग ज्ञान के साथ, हम सफलता का सिद्ध ट्रैक रिकॉर्ड है और आगे बढ़ रहे हैं स्वयं को वक्र से आगे रहने के लिए":"With years of experience and deep industry knowledge,we have a proven track record of success and are pushing ourselves to stay ahead of the curve."}
                      </p>
                      <Link
                        to="https://www.instagram.com/myhindi.tv/"
                        target="_blank"
                      >
                        <LuInstagram />
                      </Link>
                      <Link
                        to="https://www.linkedin.com/company/my-hindi-tv/"
                        target="_blank"
                      >
                        <FaLinkedinIn />
                      </Link>
                      <Link
                        to="https://twitter.com/mypunjabitv"
                        target="_blank"
                      >
                        <TwitterIcon />
                      </Link>
                      <Link
                        to="https://www.facebook.com/tvmypunjabi"
                        target="_blank"
                      >
                        <GrFacebookOption />
                        {/* <FontAwesomeIcon icon="fa-brands fa-facebook" /> */}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUs;
