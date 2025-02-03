import React from 'react'
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { useState, useEffect } from 'react';
// const ScrollToTopArrow = () => {

  
   
const Scroller = () => {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      // Add scroll event listener
      const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        setIsVisible(scrollTop > 100); // Show arrow when scrolled down
      };
  
      window.addEventListener('scroll', handleScroll);
  
      // Remove event listener on component unmount
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };
  return (
    <div>
        <div
      className={`scroll-to-top-arrow ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      <KeyboardDoubleArrowUpIcon/>
    </div>
    </div>
  )
}

export default Scroller
