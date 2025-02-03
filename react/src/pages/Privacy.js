import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useLanguage } from '../utils/LanguageContext';
import { Link } from 'react-router-dom';
import SEO from '../components/common/Seo';
const Privacy = () => {
  const { translate, changeLanguage, language } = useLanguage();
  return (
    <div>
      <SEO title='Privacy Policy - My Hindi TV' description='My Hindi TV की Privacy Policy पढ़ें। आपकी व्यक्तिगत जानकारी की सुरक्षा और उपयोग के बारे में जानें।'/>
      <Navbar changeLanguage={changeLanguage} currentLanguage={language} />
      <section className="py-5 position-relative bglight privacy-section section-paddingfix">
        <div className="circle-right circle-left d-none d-lg-block"></div>
        <div className="container">
          <div className='privacy-back'>
          <div className="row">
            <div className="col-sm-12">
              <h3 className="mt-0">{translate("footerPrivacy")}</h3>
              <p className="my-2">
                {translate("termsUpdate")}
                <span className="bluClr" style={{ color: "#337ab7" }}>
                  {translate("termsDate")}
                </span>
              </p>
              <p>
                {translate("privacyHeadingText")}
              </p>

              <h4>
                {translate("privacyInformation")}
              </h4>
              <ul className="list-style">
                <li>
                  <strong>{translate("privacyPersonalInformation")}</strong><br />
                  {translate('privacyPersonalInformationContent')}
                </li>
                <li>
                  <strong>{translate("privacyUsageInfo")}</strong><br />
                  {translate("privacyUsageInfoContent")}
                </li>
              </ul>
              <h4>
                {translate("privacyUseOfInfo")}
              </h4>
              <ul className="list-style">
                <li>
                  <strong>{translate("privacyService")}</strong><br />
                  {translate("privacyServiceContent")}
                </li>
                <li>
                  <strong>{translate("privacyComm")}</strong><br />
                  {translate("privacyCommContent")}
                </li>
              </ul>

              <h4>
                {translate("privacyInfoSharing")}
              </h4>
              <ul className="list-style">
                <li>
                  <strong>{translate("privacySreviceProvider")}</strong><br />
                  {translate("privacySreviceProviderContent")}
                </li>
                <li>
                  <strong>{translate("privacyLegalCompliance")}</strong><br />
                  {translate("privacyLegalComplianceContent")}
                </li>
              </ul>

              <h4>
                {translate("privacySecurity")}
              </h4>
              <p>
                {translate("privacySecurityContent")}
              </p>

              <h4>
                {translate("privacyCookies")}
              </h4>
              <p>
                {translate("privacyCookiesContent")}
              </p>

              <h4>
                {translate("privacyChoices")}
              </h4>
              <p>
                {translate("privacyChoicesContent1")} <span style={{ color: "#337ab7" }}><Link to={`mailto:${'helpdeskmypunjabitv@gmail.com'}`} className='text-decoration-none'>helpdeskmyhinditv@gmail.com</Link></span> {translate("privacyChoicesContent2")}
              </p>

              <h4>
                {translate("privacyChanges")}
              </h4>
              <p>
                {translate("privacyChangesContent")}
              </p>

              <h4>
                {translate("privacyContact")}
              </h4>
              <p>
                {translate("privacyConcern")} <span style={{ color: "#337ab7" }}><Link className='text-decoration-none' to={`mailto:${'helpdeskmypunjabitv@gmail.com'}`}>helpdeskmyhinditv@gmail.com</Link></span>
              </p>

              <p>
                {translate('privacyEnd')}
              </p>




              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Privacy;
