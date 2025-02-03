
// LanguageContext.js
import React, { createContext, useState, useContext , useEffect} from 'react';
import axios from 'axios';
import en from '../locales/en.json';
import hn from '../locales/hn.json';
// import socket from './Socket';
// Create context
const LanguageContext = createContext();

// Language provider component
export const LanguageProvider = ({children}) => {

  const storedLanguage = sessionStorage.getItem('language') || 'en';
  const [language, setLanguage] = useState(storedLanguage); // Default language is English
  const [newsWithCategory, setNewsWithCategory] = useState([])
  const [searchVal, setSearchVal] = useState("");
  const  [latestNews, setLatestNews] = useState([])
  const [liveNews, setLiveNews] = useState(localStorage.getItem('liveNews') || ''); // Get liveNews from localStorage
  const [showLiveNews, setShowLiveNews] = useState(false);
  // Define translation function based on selected language
  const translate = (key) => {
    const translations = {
      en: en,
      hn: hn,
    };

    return translations[language][key] || key; // Default to key if translation not found
  };

  // Function to change language
  const changeLanguage = (lang) => {
    // Check if the language is different before updating
    if (lang !== language) {
      setLanguage(lang);
      localStorage.setItem('language', lang);
    }
  };

  useEffect(() => {
    // Get language from sessionStorage
    const storedLang = localStorage.getItem('language');
    
    // Set the language if it is different from the current state
    if (storedLang && storedLang !== language) {
      setLanguage(storedLang);
    }
  }, [language]);

  const fetchNewsWithCategory = async (lang) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/news/getEverything/${lang}`);
      setNewsWithCategory(response.data)
      
    } catch (error) {
      console.error('Error fetching news by category:', error);
    }
  };
  const getLatestNews = async (lang) => {
    try {
       
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/news/getnews/${lang}?page=1`,);

       //  console.log("News>>", response.data);

        // Check if response.data is an array before setting the state
        if (Array.isArray(response.data) && response.data.length > 0) {
            setLatestNews(response.data);
        } else {
            setLatestNews([]); // Set to empty array if response.data is not an array or is empty
        }
    } catch (error) {
        console.log("Error fetching latest news", error);
    }
  };
  // useEffect(() => {
  //   // Listen for live news updates from socket
  //   socket.on('liveNewsAdded', (data) => {
  //     setLiveNews(data);
  //     localStorage.setItem('liveNews', data);
  //     setShowLiveNews(true); // Show live news notification
  //     setTimeout(() => {
  //       setShowLiveNews(false); // Hide live news notification after 10 minutes
  //     }, 600000); // 10 minutes in milliseconds
  //   });
  //   ;

  //   // Cleanup socket event listener
  //   return () => {
  //     socket.off('liveNewsAdded');
  //   };
  // }, []);
   
  useEffect(() => {
    fetchNewsWithCategory(language); 
    getLatestNews(language)
  }, [language]);
  console.log("NEEEWW", newsWithCategory)
  console.log("NewsLatest", latestNews)

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, translate, newsWithCategory , latestNews, liveNews, showLiveNews,searchVal,setSearchVal}}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
