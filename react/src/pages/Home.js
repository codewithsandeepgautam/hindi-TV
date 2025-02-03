import React from 'react'
import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useState } from 'react'
// import axios from 'axios'
import { useLanguage } from '../utils/LanguageContext'
import Live from '../components/homePageComponents/Live'
import LatestNews from '../components/homePageComponents/LatestNews'
import Navbar from '../components/common/Navbar'
import Logos from '../components/homePageComponents/Logos'
// import SimpleSlider from '../components/homePageComponents/SimpleSlider'
import Footer from '../components/common/Footer'
import BreakingNews from '../components/homePageComponents/BreakingNews'
// import HeroSection from '../components/homePageComponents/HeroSection'
import NewsVideos from '../components/homePageComponents/NewsVideos'
import SportsNews from '../components/homePageComponents/CategoryNews'
// import ExclusiveNews from '../components/homePageComponents/ExclusiveNews'
import { useLocation, useNavigate } from 'react-router-dom'
import Categories from '../components/homePageComponents/Categories'
import SEO from '../components/common/Seo'
const Home = () => {
  // window.scroll(0,0)
  // const [displayLive, setDisplayLive] = useState(false);
  const { changeLanguage, language } = useLanguage();
  const location = useLocation()
  // const  [latestNews, setLatestNews] = useState([])
  // const [category, setCategory] = useState([])

  const navigate = useNavigate();
  // const [shouldScroll, setShouldScroll] = useState(false);

  //   const getLatestNews = async (lang) => {
  //     try {
  //         const config = {
  //             headers: {
  //                 "Content-type": "application/json",
  //             },
  //         };

  //         const response = await axios.get(`${process.env.REACT_APP_API_URL}/getnews/${lang}?page=1`, config);

  //        //  console.log("News>>", response.data);

  //         // Check if response.data is an array before setting the state
  //         if (Array.isArray(response.data) && response.data.length > 0) {
  //             setLatestNews(response.data);
  //         } else {
  //             setLatestNews([]); // Set to empty array if response.data is not an array or is empty
  //         }
  //     } catch (error) {
  //         console.log("Error fetching latest news", error);
  //     }
  // };


  // const getCategory = async(lang)=>{
  //   try {
  //      const categoryResponse = await axios.get(`${process.env.REACT_APP_API_URL}/bmw/news/getCategory/${lang}`)
  //      console.log("Fetched Categories:", categoryResponse.data);
  //      setCategory(categoryResponse.data.categories)
  //    //   console.log("State Categories:", category);
  //   } catch (error) {
  //      console.log("Error fetching categories", error)
  //   }
  // }



  // useEffect(()=>{
  //   getLatestNews(language)
  //   // getCategory(language)
  //   // handleCategoryHover(language)
  // }, [language])





  // Scroll to the Live section if shouldScroll is true
  useEffect(() => {
    // Parse the query string from the location object
    const params = new URLSearchParams(location.search);
    // Check if the 'scrollTo' parameter is set to 'live-news-section'
    if (params.get('scrollTo') === 'live-news-section') {
      // Scroll to the Live News section
      const liveNewsSection = document.getElementById('live-news-section');
      if (liveNewsSection) {
        window.scrollTo({
          top: liveNewsSection.offsetTop,
          behavior: 'smooth'
        });
        // const newSearch = location.search.replace('?scrollTo=live-new-btn', '');
        // navigate({
        //   ...location,
        //   search: newSearch
        // });
      }
    }
  }, [location.search]);
  useEffect(() => {
    const handleScroll = () => {
      const params = new URLSearchParams(location.search);

      if (params.get('scrollTo') === 'live-news-section') {
        // Update the route to "/" when scrolling
        navigate('/');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.search, navigate]);

  // ... rest of the code ...


  return (
    <>
     <SEO title='हिंदी न्यूज़, Breaking News in Hindi, Latest News in Hindi | My Hindi TV' description='पढ़ें ताजा हिंदी समाचार, ब्रेकिंग न्यूज़, और लेटेस्ट अपडेट्स। जानें इंडिया की सभी ताजातरीन ख़बरें और वीडियो सिर्फ My Hindi TV पर।'/>
      <Navbar changeLanguage={changeLanguage} currentLanguage={language} />
      {/* <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('pu')}>Punjabi</button> */}
      <div>
        <Categories />
        <BreakingNews />
        {/* <HeroSection/> */}
        <div id='live-news-section'>
          <Live />
        </div>
        <LatestNews />

        <SportsNews />
        <NewsVideos />
        {/* <ExclusiveNews/> */}
        <Logos />
        {/* <SimpleSlider/> */}
        <Footer />
      </div>

    </>
  )
}

export default Home
