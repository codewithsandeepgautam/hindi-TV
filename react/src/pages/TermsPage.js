import React from "react";
import Footer from "../components/common/Footer";
import { useLanguage } from "../utils/LanguageContext";
import Navbar from "../components/common/Navbar";
// import termsOne from "../../assets/images/refund/why360-patten.png";
const TermsPage = () => {
  const { language, changeLanguage, translate } = useLanguage();

  return (
    <>

      <Navbar changeLanguage={changeLanguage} currentLanguage={language} />

      <section className="py-5 position-relative bglight privacy-section section-paddingfix">
        <div className="circle-right circle-left d-none d-lg-block"></div>
        {/* <img src={termsOne} className="absimggCL" width="50" /> */}
        <div className="container">
          <div className="privacy-back">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="mt-0">{translate('footerT&C')}</h3>

                <p className="my-2">
                  {translate("termsUpdate")}{" "}
                  <span className="bluClr" style={{ color: "#337ab7" }}>
                    {translate("termsDate")}
                  </span>
                </p>
                <p>
                  {translate("termsHeadingText")}
                </p>
                <ul className="list-style">
                  <h4>{translate("termsAcceptance")}</h4>
                  <li>
                    {translate("termsAcceptanceContent")}
                  </li>
                  <h4>{translate("termsService")}</h4>
                  <li>
                    {translate("termsServiceContent")}
                  </li>
                  <h4>{translate('termsUserResponsibilities')}</h4>
                  <li>
                    {translate("termsUserResContent")}
                  </li>
                  <h4>{translate("termsDataAndSecurity")}</h4>
                  <li>
                    {translate("termsDataAndSecurityContent")}
                  </li>
                  <h4>{translate("termsPayments")}</h4>
                  <li>
                    {translate("termsPaymentsContent")}
                  </li>
                  <h4>{translate("termsTermination")}</h4>
                  <li>
                    {translate("termsTerminationContent")}
                  </li>
                  <h4>{translate("termsIP")}</h4>
                  <li>
                    {translate("termsIPContent")}
                  </li>
                  <h4>{translate("termsChanges")}</h4>
                  <li>
                    {translate("termsChangesContent")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TermsPage;

