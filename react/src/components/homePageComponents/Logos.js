import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import log1 from "../../assets/images/logo.png";
import log3 from "../../assets/images/logo3.webp";
import log4 from "../../assets/images/logo4.webp";
import log5 from "../../assets/images/logo5.webp";
import log6 from "../../assets/images/logo6.webp";
import { useLanguage } from "../../utils/LanguageContext";
import { Link } from "react-router-dom";
const Logos = () => {
  const { translate } = useLanguage();
  return (
    <>
      <section className="padd slider-sections trigger section gutter-horizontal bg-gray gutter-vertical--m gutter-horizontal">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="section-title text-center">
                <h3>{translate('logoSectionHeading')}</h3>
                <p>
                  {translate('logoSectionText')}
                  <br />
                  {translate('logoSectionText2')}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 text-center">
              <div className="customer-logos ">

                <div className=" container">
                  <div className="row m-auto">
                    <div className="col-sm-12">
                    <Link to="https://www.youtube.com/results?search_query=mypunjabitv"target="_blank"> <img src={log1} alt="img" /></Link>
                    <Link to="https://www.youtube.com/@GursiftTv_"target="_blank"><img src={log5} alt="img" /></Link>
                      <img src={log3} alt="img" />
                      <Link to="https://www.youtube.com/@_Ashketv"target="_blank"><img src={log4} alt="img" /></Link>
                      <img src={log6} alt="img" />

                      {/* </Slider> */}
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Logos;
