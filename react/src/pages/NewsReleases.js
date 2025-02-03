import React from "react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { useLanguage } from "../utils/LanguageContext";
import SEO from "../components/common/Seo";

const NewsReleases = () => {
    const { language, changeLanguage} = useLanguage();
     
    return (
        <>
        <SEO title="हिंदी प्रेस रिलीज़, Latest Press News | My Hindi TV" description="पढ़ें ताजातरीन प्रेस रिलीज़ और आधिकारिक समाचार। My Hindi TV पर प्रेस से जुड़ी अपडेट्स।"/>
            <Navbar changeLanguage={changeLanguage} currentLanguage={language} />

            <section className="padd NewsReleases">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="mb-3 text-black">{language === "hn" ? "समाचार एवं प्रेस विज्ञप्तियाँ" :"News & Press Releases"}</h2>
                            <div className="Updated_Releasesnews pt-2 text-end">
                                <b>Updated On :
                                     20 May, 2024 at 10:55 am</b>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default NewsReleases;
