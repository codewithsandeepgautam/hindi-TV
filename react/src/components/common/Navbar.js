import React from 'react';
import logo from '../../assets/images/my-hinditv-logo.webp'
// import Searchicon from '../../assets/images/search-icon.png'
import "bootstrap/dist/css/bootstrap.min.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { useLanguage } from '../../utils/LanguageContext';
import SearchBar from './SearchBar';
const Navbar = ({ changeLanguage, currentLanguage }) => {
  const { translate, showLiveNews } = useLanguage();
  const navigate = useNavigate()
  const location = useLocation()
  const liveSectionRef = useRef(null);
  const toggleLanguage = () => {
    if (currentLanguage === 'en') {
      changeLanguage('hn');
    } else {
      changeLanguage('en');
    }
  };
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  }
  const handleLiveNewsClick = () => {
    if (liveSectionRef.current) {
      window.scrollTo({
        top: liveSectionRef.current.offsetTop,
        behavior: 'smooth'
      });
    }
    navigate(`/?scrollTo=live-news-section`);
  };

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <header>
      <div className='top-header'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-sm-6'>
            </div>
            <div className='col-sm-6'>
              <ul className="top-header-list social-media text-end">
                <li>
                  <Link to="https://www.facebook.com/myhinditvofficial/" target='_black' style={{ display: 'inline-block', color: '#fff' }}>
                    <FacebookIcon style={{ fontSize: '21px', color: 'ff4c00' }} />
                  </Link>
                </li>
                <li>
                  <Link to="https://www.instagram.com/myhindi.tv/" target='_blank' style={{ display: 'inline-block', color: '#fff' }}>
                    <InstagramIcon style={{ fontSize: '21px', color: 'ff4c00' }} />
                  </Link>
                </li>
                <li>
                  <Link to="https://www.youtube.com/@My_HindiTV" target='_blank' style={{ display: 'inline-block', color: '#fff' }}>
                    <YouTubeIcon style={{ fontSize: '21px', color: 'ff4c00' }} />
                  </Link>
                </li>
                <li>
                  <Link to="https://twitter.com/myhinditv_" target='_blank' style={{ display: 'inline-block', color: '#fff' }}>
                    <TwitterIcon style={{ fontSize: '21px', color: 'ff4c00' }} />
                  </Link>
                </li>
                <li>
                  <Link to="https://in.pinterest.com/myhinditv" target='_blank' style={{ display: 'inline-block', color: '#fff' }}>
                    <PinterestIcon style={{ fontSize: '21px', color: 'ff4c00' }} />
                  </Link>
                </li>
                <li className='position-relative'>
                  <SearchBar />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="top-bar d-flex align-items-center justify-content-between">
        <nav className="navbar navbar-expand-lg w-100 py-0">
          <div className="container-fluid px-0">
            <div id="logo">
              <Link className="navbar-brand" to="/" >
                <img src={logo} className="img-fluid" alt="" onClick={handleLinkClick} />
              </Link>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav main-menu me-auto mb-2 mb-lg-0">
                {/* <li className="nav-item">
             <Link to='/' className={isActive('/')} > {translate('navHome')} </Link>
             </li> */}
                <li className="nav-item">
                  <Link to="/news" className={isActive('/news')} onClick={handleLinkClick}>{translate('navNews')}</Link>
                </li>
                {/* <li className="nav-item">
             <Link to='/shows' className={isActive('/shows')}>{translate('navShows')}</Link>
             </li> */}
                <li className="nav-item">
                  <Link to='/videos' className={isActive('/videos')} onClick={handleLinkClick}>{translate('navVideos')}</Link>
                </li>
                <li className="nav-item">
                  <Link to='/about-us' className={isActive('/about-us')} onClick={handleLinkClick}>{translate("navAbout")}</Link>
                </li>
                <li className="nav-item">
                  <Link to='/contact-us' className={isActive('/contact-us')} onClick={handleLinkClick}>{translate("navContact")}</Link>
                </li>
                {/* <li className="nav-item">
               <a className="nav-link" href="#">
                 Contact
               </a>
             </li> */}
              </ul>
              <div className="d-flex">
                <button
                  type="button"
                  className={`languagebtn-style  mx-4 btn btn-${currentLanguage === "en" ? "secondary" : "primary"
                    }`}
                  onClick={toggleLanguage}
                >
                  {currentLanguage === "en" ? "हिंदी में बदलें" : " Convert to English"}
                </button>
                <button
                  type='button'
                  className="d-block text-nowrap position-relative"
                  id="live-tv-btn"
                  onClick={handleLiveNewsClick}
                >
                  {showLiveNews &&
                    <div className='livenewdiv'>
                      <div class="livenew_animation">
                        <div class="circle--outer"></div>
                        <div class="circle--inner"></div>
                      </div>
                    </div>
                  }
                  {translate("liveNewsBtn")}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
