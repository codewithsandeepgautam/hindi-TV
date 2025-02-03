import React from 'react'
import footerLogo from '../../assets/images/footer.png';
import { useLanguage } from '../../utils/LanguageContext'
import "bootstrap/dist/css/bootstrap.min.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useLocation } from 'react-router-dom';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { Link } from 'react-router-dom';
import qrcode from '../../assets/images/qrcode.png';
import { FaAnglesRight } from "react-icons/fa6";

const Footer = () => {
   const location = useLocation()
   const { translate} = useLanguage();
   const handleLinkClick = () => {
      window.scrollTo(0, 0);
   };
   const isActive = (path) => {
      return location.pathname === path ? 'active' : '';
   }
   return (
      <>
         <div>
            <footer>
               <div className="padd footer-top">
                  <div className="container">
                     <div className="row">
                        <div className="col-sm-5">
                           <Link to="/" onClick={handleLinkClick}>
                              <img src={footerLogo} className="footer-logo" alt="myhinditv" />
                           </Link>
                           <p className="font-weight-normal mt-2 mb-5">
                              {translate('footerText')}
                           </p>
                           <ul className="social-media mb-3" style={{ display: 'flex', padding: 0 }}>
                              <li>
                                 <Link to="https://www.facebook.com/myhinditvofficial/" target='_black' style={{ display: 'inline-block', borderRadius: '100%', overflow: 'hidden', backgroundColor: '#ff6600', color: '#fff' }}>
                                    <FacebookIcon />
                                    {/* <FontAwesomeIcon icon="fa-brands fa-facebook" /> */}
                                 </Link>
                              </li>
                              <li>
                                 <Link to="https://www.instagram.com/myhindi.tv/" target='_blank' style={{ display: 'inline-block', borderRadius: '100%', overflow: 'hidden', backgroundColor: '#ff6600', color: '#fff' }}>
                                    <InstagramIcon />
                                 </Link>
                              </li>
                              <li>
                                 <Link to="https://www.youtube.com/@My_HindiTV" target='_blank' style={{ display: 'inline-block', borderRadius: '100%', overflow: 'hidden', backgroundColor: '#ff6600', color: '#fff' }}>
                                    <YouTubeIcon />
                                 </Link>
                              </li>
                              <li>
                                 <Link to="https://x.com/myhinditv_" target='_blank' style={{ display: 'inline-block', borderRadius: '100%', overflow: 'hidden', backgroundColor: '#ff6600', color: '#fff' }}>
                                    <TwitterIcon />
                                 </Link>
                              </li>
                              <li>
                                 <Link to="https://in.pinterest.com/myhinditv" target='_blank' style={{ display: 'inline-block', borderRadius: '100%', overflow: 'hidden', backgroundColor: '#ff6600', color: '#fff' }}>
                                    <PinterestIcon />
                                 </Link>
                              </li>
                           </ul>
                        </div>
                           {/* <div className="row"> */}
                           {/* </div> */}
                           <div className="col-sm-4">
                           <h3 className="font-weight-bold mb-3">{translate("footerLinks")}</h3>
                           <div className="row">
                                    <div className="col-sm-12  footer-recent-post">
                                       <ul className="footer-border-bottom pb-2 mb-2">
                                       <li className='pb-2'><FaAnglesRight className='footer-after-icon'/><Link className={isActive('/press-releases')} to='/press-releases' onClick={handleLinkClick}>{translate('footerPressReleases')}</Link></li>
                                       <li className='pb-2'><FaAnglesRight className='footer-after-icon'/><Link className={isActive('/advertise-with-us')} to='/advertise' onClick={handleLinkClick}>{translate("footerAdvertise")}</Link></li>
                                       <li className='pb-2'><FaAnglesRight className='footer-after-icon'/><Link className={isActive('/investor')} to='/investor' onClick={handleLinkClick}>{translate('footerInvestor')}</Link></li>
                                       <li className='pb-2'><FaAnglesRight className='footer-after-icon'/><Link className={isActive('/disclaimer')} to='/disclaimer' onClick={handleLinkClick}>{translate('footerDisclaimer')}</Link></li>
                                       <li className='pb-2'><FaAnglesRight className='footer-after-icon'/><Link className={isActive('/career')} to='/career' onClick={handleLinkClick}>{translate("footerCareer")}</Link></li>
                                       <li className='pb-2'><FaAnglesRight className='footer-after-icon'/><Link className={isActive('/contact-us')} to='/contact-us' onClick={handleLinkClick}>{translate('navContact')}</Link></li>
                                       </ul>
                                   </div>
                        </div>
                        </div>
                        <div className="col-sm-3">
                           <h3 className="font-weight-bold mb-3">{translate('footerQr')}</h3>
                           <img style={{ width: '200px' }} src={qrcode} alt="QR Code" />
                        </div>
                     </div>
                  </div>
               </div>

            </footer>
            <div className="main-footer">
               <div className="container">
                  <div className="row">
                     <div className="col-md-6">
                        <p className="text-start">{translate("footerCopyRight")} © {translate('webName')} 2024 </p>
                     </div>
                     <div className="col-md-6">
                        <ul className="footer-menu text-end mb-0">
                           <li><Link className={isActive('/terms-and-conditions')} to='/terms-and-conditions' onClick={handleLinkClick}> {translate('footerT&C')}</Link></li>
                           <li><Link className={isActive('/privacy')} to='/privacy-policy' onClick={handleLinkClick}> {translate('footerPrivacy')} </Link></li>
                           <li><Link className={isActive('/contact-us')} to='/contact-us' onClick={handleLinkClick}>{translate('navContact')}</Link></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <ul className="social_media_right">
            <li>
               <Link to="https://www.facebook.com/myhinditvofficial/" target='_black'>
                  <FacebookIcon />
                  <span className='soc_title'>{translate('socialFB')}</span>
               </Link>
            </li>
            <li>
               <Link to="https://www.instagram.com/myhindi.tv/" target='_blank'>
                  <InstagramIcon />
                  <span className='soc_title'>{translate('socialIG')}</span>
               </Link>
            </li>
            <li>
               <Link to="https://www.youtube.com/@My_HindiTV" target='_blank'>
                  <YouTubeIcon />
                  <span className='soc_title'>{translate('socialYT')}</span>
               </Link>
            </li>
            <li>
               <Link to="https://x.com/myhinditv_" target='_blank'>
                  <TwitterIcon />
                  <span className='soc_title'>{translate('socialX')}</span>
               </Link>
            </li>
            <li>
               <Link to="https://in.pinterest.com/mypunjabitv/" target='_blank'>
                  <PinterestIcon />
                  <span className='soc_title'>{translate('socialP')}</span>
               </Link>
            </li>
         </ul>
      </>
   )
}

export default Footer
