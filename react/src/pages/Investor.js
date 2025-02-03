import React from "react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { GrGraphQl } from "react-icons/gr";
import { HiCube } from "react-icons/hi2";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { GrTechnology } from "react-icons/gr";
import { RiFileSearchFill } from "react-icons/ri";
import { useLanguage } from "../utils/LanguageContext";
import SEO from "../components/common/Seo";

const Investor = () => {

    const {changeLanguage, language, translate}= useLanguage()
    return (
        <>
        <SEO title="My Hindi TV - निवेशक संबंध, Investor Relations" description="My Hindi TV से जुड़ी निवेशक जानकारी, वित्तीय रिपोर्ट और निवेश अवसर प्राप्त करें।"/>
            <Navbar changeLanguage={changeLanguage} currentLanguage={language} />
            <section className="padd Investor">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="pb-2 text-black">{translate('investorInfo')}</h2>
                            <p>{translate("investorInfoContent")}
                            </p>
                            <div className="market_invest">
                                <h3 className="intro-head">{translate('investorHeading2')}</h3>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="marketbox">
                                            <GrGraphQl className="investor_icons" />
                                            <h4>{translate("investorHeading2.1")}</h4>
                                            <p>{translate("investorContent2.1")}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="marketbox">
                                            <HiCube className="investor_icons" />
                                            <h4>{translate('investorHeading2.2')}</h4>
                                            <p>{translate('investorContent2.2')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="market_invest">
                                <h3 className="intro-head">{translate("investorHeading3")}</h3>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="marketbox">
                                            <MdOutlineContentPasteSearch className="investor_icons" />
                                            <h4>{translate("investorHeading3.1")}</h4>
                                            <p>{translate("investorContent3.1")}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="marketbox">
                                            <GrTechnology className="investor_icons" />
                                            <h4>{translate("investorHeading3.2")}</h4>
                                            <p>{translate("investorContent3.2")}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="marketbox">
                                            <RiFileSearchFill className="investor_icons" />
                                            <h4>{translate("investorHeading3.3")}</h4>
                                            <p>{translate("investorContent3.3")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="market_invest">
                                <h3 className="intro-head">{
                                    translate("investorHeading4")
                                }</h3>
                                <div className="row">
                                    <div className="col-md-12">
                                        <p>
                                           {translate("investorContent4")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="market_invest">
                                <h3 className="intro-head">{translate("investorHeading5")}</h3>
                                <div className="row">
                                    <div className="col-md-12">
                                        <p>
                                           {translate("investorContent5")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};


export default Investor;
