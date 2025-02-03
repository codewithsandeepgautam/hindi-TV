import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import "../style/style.css";
import axios from "axios";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import add from "../assets/images/add1.png";
import { useParams } from "react-router-dom";
import { useLanguage } from "../utils/LanguageContext";
import add2 from "../assets/images/news_card.png";
import Footer from "../components/common/Footer";
import { useNavigate } from "react-router-dom";
const NewsArticle = () => {
  const { id } = useParams();
  const { changeLanguage, language, translate } = useLanguage();
  const [article, setArticle] = useState(null);
  const [prevId, setPrevId] = useState(null);
  const [nextId, setNextId] = useState(null);
  const navigate = useNavigate();
  console.log("article news<<<",article);
  const monthsEn =  [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthHn= [
    "जनवरी",
    "फ़रवरी",
    "मार्च",
    "अप्रैल",
    "मई",
    "जून",
    "जुलाई",
    "अगस्त",
    "सितम्बर",
    "अक्टूबर",
    "नवंबर",
    "दिसंबर",
  ];
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
 };
 const getNewsById = async (lang, id) => {    
  try{
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/news/getNews/${lang}/${id}`
    );
    if (response.data.current) {
      setArticle(response.data.current);
      setPrevId(response.data.previousId);
      setNextId(response.data.nextId);
    } else {
      navigate('*');
    }
  } catch (error) {
    console.log("Error fetching news by ID:", error); 
    navigate('*');
  }
};
  useEffect(() => {
    getNewsById(language, id);
    // eslint-disable-next-line
  }, [language, id]);
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
   const monthNames = language === 'en'? monthsEn:monthHn
   return `${monthNames[parseInt(month) - 1]}-${day}-${year}`;
  };
  return (
    <div>
      <Navbar changeLanguage={changeLanguage} currentLanguage={language}/> 
      <section className="section-paddingfix">
        <div className="live-news padd features latest-news blog">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <div className="blog-card">
                  {article ? (
                    <div className="post-date-ribbon">
                      <div className="corner"></div>
                      {formatDate(article.createdAt)}
                    </div>
                  ) : (
                    "January-1-2024"
                  )}
                  <div className="about-right">
                    <div className="about-img">
                      {article ? (
                        <img
                          src={article.img}
                          style={{
                            maxWidth: "100%",
                            height: "auto",
                            width: "100%",
                            maxHeight: "500px",
                          }}
                          alt={article.title}
                        />
                      ) : (
                        <h3>Loading...</h3>
                      )}
                    </div>
                  </div>
                  <div className="section-tittle text-start">
                    {article ? <h3>{article.title}</h3> : <h3>Loading...</h3>}
                  </div>
                  {article ? (
                    <p className="about-pera1 " dangerouslySetInnerHTML={{ __html: article.description }}>
                    </p>
                  ) : (
                    <p className="about-pera1"> Loading...</p>
                  )}
                  <div className="PrevNext text-end">
                    {prevId ? (
                      <Link to={`/news/${prevId}`} onClick={handleLinkClick}> {translate( "previousbutton")}</Link>
                    ) : (
                      <span style={{ color: "gray", marginRight: "10px" }}>
                        {translate( "previousbutton")}
                      </span>
                    )}
                    {nextId ? (
                      <Link to={`/news/${nextId}`} onClick={handleLinkClick}>{translate('nextBtn')} </Link>
                    ) : (
                      <span style={{ color: "gray" , marginRight: "10px"}}>{translate('nextBtn')} </span>
                    )}
                  </div>
                  <div className="social-medialinks text-start">
                    <h5>{translate('followUs')}</h5>
                    <ul className="my-3">
                      <li>
                        <Link
                          to="https://www.facebook.com/myhinditvofficial/"
                          target="_blank"
                        >
                          <FacebookIcon />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="https://www.instagram.com/myhindi.tv/"
                          target="_blank"
                        >
                          <InstagramIcon />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="https://twitter.com/myhinditv_"
                          target="_blank"
                        >
                          <TwitterIcon />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="https://www.youtube.com/@My_HindiTV"
                          target="_blank"
                        >
                          <YouTubeIcon />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <div className="col-md-2">
                      <div className="about-author">
                        <div className="media">
                          <img
                            className="align-self-start mr-3 w-20"
                            src={article?.authorImg}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-10">
                      <div className="media-body text-start">
                        <h6>
                          <strong>{translate("newsAuthorName")}</strong>
                        </h6>
                            <p className="text-primary">{article?.author}</p>
                        {article && <p>{article?.about}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="blog-card">
                  <div className="news-poster d-none d-lg-block fixed">
                    <Link to='https://www.velosting.com/' target="_blank">
                    <img src={add2} alt="" />
                    </Link>
                    <Link to= 'https://www.skypro.co.in/ ' target="_blank">
                    <img className="mt-5" src={add} alt="" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default NewsArticle;
