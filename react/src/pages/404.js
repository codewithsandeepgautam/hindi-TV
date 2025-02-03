import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../utils/LanguageContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import img from '../assets/images/404.gif';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
  window.scroll(0,0)
  const { changeLanguage, language } = useLanguage();
  const navigate = useNavigate();
  // const headCenterStyle = {
  //   textAlign: 'center',
  //   fontSize: '15rem',
  //   paddingTop: '4rem',
  //   fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif',
  //   color: '#020024',
  //   marginTop: '10px'
  // };

  // const headCenter2Style = {
  //   textAlign: 'center',
  //   fontSize: '25px',
  //   paddingTop: '1rem',
  //   color: '#020024'
  // };

  const para1Style = {
    width: '30%',
    textJustify: 'auto',
    textAlign: 'center',
    color: '#020024',
    paddingTop: '1rem',
    margin: '0 auto'
  };

  const goHomeStyle = {
    width: '11rem',
    height: '2.7rem',
    borderRadius: '26px',
    display: 'block',
    margin: 'auto',
    backgroundColor: 'orange',
    border: '1px solid orange',
    fontSize: '14px',
    fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif',
    cursor: 'pointer',
    // backgroundColor: 'linear-gradient(to bottom, #ff4500, #ff8c00)',
    marginTop: '10px'
  };

  const goHomeLinkStyle = {
    color: 'white',
    textDecoration: 'none'
  };
   
  useEffect(()=>{
    setTimeout(() => {
      navigate("/");
    }, 2000);
  })

  return (
    <div>
      <Navbar changeLanguage={changeLanguage} currentLanguage={language} />
      <div className="container">
      <div className='row'>
        <div className='col-md-12 text-center'>
          <img width={'550px'} src={img} alt={'404'}></img>
        </div>
      </div>
        
        
        <div className="div-para">
          <p style={para1Style}>
            Please check routes again
          </p>
          <p style={para1Style}>
            The page you are looking for might have been removed, had its name changed, or is under maintenance.
          </p>
        </div>
      </div>
      <button style={goHomeStyle}>
        <Link to="/" style={goHomeLinkStyle}>Go to Homepage</Link>
      </button>
      <div className='m-4'></div>
      <Footer/>
    </div>
  );
}

export default NotFound;
