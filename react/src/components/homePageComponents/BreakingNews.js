import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useLanguage } from '../../utils/LanguageContext'
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';
const BreakingNews = () => {
    const { translate, language } = useLanguage();
    const [breakingNews, setBreakingNews] = useState([])
    const getBreakingNews = async (lang) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/news/getBreakingNews/${lang}`)
            console.log("Br News", response.data.breakingNews)
            setBreakingNews(response.data.breakingNews)
        } catch (error) {
            console.log("Error fetching latest news", error)
        }
    }
    useEffect(() => {
        getBreakingNews(language)
    }, [language])

    return (
        <div>
            <div className="trending-section" style={{ background: '#faf0ed' }}>
                <div className="container-fluid px-0" style={{ overflow: 'hidden' }}>
                    <div className="row align-items-center">
                        <div className="col-sm-2 breaking-news-heading">
                            <p className="trending-btn">{translate('breakingNewsHeading')} -</p>
                        </div>
                        <div className="col-sm-10 breaking-news-container align-middle">
                            <div className="align-middle">

                                  
                                  <Marquee speed={50} gradient={false} pauseOnHover={true}>

                                  <Link to='/breaking-news' className='text-decoration-none text-dark'>
                                            {breakingNews && breakingNews.length > 0 ? (
                                                breakingNews.map((newsItem, index) => (
                                                    <span key={newsItem._id} className="align-middle breaking-news-item">
                                                        | {newsItem.title} |
                                                    </span>
                                                ))
                                            ) : (
                                                <span>{language==='en'?"No breaking news available":"कोई ब्रेकिंग न्यूज़ उपलब्ध नहीं है"}</span>
                                            )}
                                  </Link>
                                           
                                           </Marquee>
                                   

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default BreakingNews
