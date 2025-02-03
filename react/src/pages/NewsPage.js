import React from "react";
import { useLanguage } from "../utils/LanguageContext";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { WindowScroll } from "../utils/windowScroll";
import '../style/style.css'
import { Link } from "react-router-dom";
import SEO from "../components/common/Seo";
const iframeStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
};
const containerStyle = {
  position: "relative",
  paddingBottom: "56.25%",
  paddingTop: "30px",
  height: 0,
  overflow: "hidden",
  width: "100%",
};
const NewsPage = () => {
  const stripHtmlTags = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };
  // window.scroll(0, 0)
  const { changeLanguage, language, latestNews } = useLanguage();
  console.log("latestnews<<<<<", latestNews);
  return (
    <div>
      <SEO title="हिंदी न्यूज़, Breaking News in Hindi, Hindi Samachar | My Hindi TV" description="ब्रेकिंग न्यूज़ और ताजातरीन हिंदी समाचार पढ़ें। सभी राष्ट्रीय और अंतर्राष्ट्रीय खबरें हिंदी में।"/>
      <Navbar changeLanguage={changeLanguage} currentLanguage={language} />
      <section className="top-news-sec section-paddingfix">
        <div className="live-news padd features latest-news pt-0" >
          <div className="container">
            {latestNews.map((newsItem, index) => index === 0 && (
              <div className="row align-items-center" style={{ background: '#ff66004a' }} onClick={WindowScroll}>
                <div className="col-md-6" key={newsItem.id}>
                  <div className="on-going-news">
                    <Link to={`/news/${newsItem.handle}`} style={{ textDecoration: 'none', color: 'black' }}>
                      <h2 className="mb-2 pb-3 text-start text-black">{newsItem.title}</h2>
                      <p className="text-start">
                        {stripHtmlTags(newsItem.description.substring(0, 400))}
                        <div
                          style={{
                            display: 'inline-block',
                            color: '#006',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            transition: 'color 0.3s',
                          }}
                          onMouseOver={(e) => {
                            e.target.style.color = 'orange';
                          }}
                          onMouseOut={(e) => {
                            e.target.style.color = '#006';
                          }}
                        >
                          <ArrowRightAltIcon fontSize="large" />
                        </div>
                      </p>
                    </Link>
                  </div>
                </div>
                <div className="col-md-6 pe-0 ps-0 order-first order-lg-last">

                  <div className="on-going-video" key={newsItem._id}>
                    <div style={containerStyle}>
                      <iframe
                        src={newsItem.videoUrl}
                        style={iframeStyle}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>

                </div>
              </div>
            ))}
            {latestNews.map((newsItem, index) => index === 1 && (
              <div className="row align-items-center" style={{ background: '#ff66004a' }} onClick={WindowScroll}>
                <div className="col-md-6 ps-0 pe-0 md-order-first">

                  <div className="on-going-video" key={newsItem.id}>
                    <div style={containerStyle}>
                      <iframe
                        src={newsItem.videoUrl}
                        style={iframeStyle}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>

                </div>
                <div className="col-md-6 pe-0 ps-0 " key={newsItem.id}>
                  <div className="on-going-news">
                    <Link to={`/news/${newsItem.handle}`} style={{ textDecoration: 'none', color: 'black' }}>
                      <h2 className="mb-2 pb-3 text-start text-black">{newsItem.title}</h2>

                      <p className="text-start">
                        {stripHtmlTags(newsItem.description.substring(0, 400))}
                        <div
                          style={{
                            display: 'inline-block',
                            color: '#006',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            transition: 'color 0.3s',
                          }}
                          onMouseOver={(e) => {
                            e.target.style.color = 'orange';
                          }}
                          onMouseOut={(e) => {
                            e.target.style.color = '#006';
                          }}
                        >
                          <ArrowRightAltIcon fontSize="large" />
                        </div>
                      </p>
                    </Link>
                  </div>
                </div>

              </div>
            ))}
            {latestNews.map((newsItem, index) => index === 2 && (
              <div className="row align-items-center" style={{ background: '#ff66004a' }} onClick={WindowScroll}>
                <div className="col-md-6" key={newsItem.id}>
                  <div className="on-going-news">
                    <Link to={`/news/${newsItem.handle}`} style={{ textDecoration: 'none', color: 'black' }}>
                      <h2 className="mb-2 pb-3 text-start text-black">{newsItem.title}</h2>

                      <p className="text-start">
                        {stripHtmlTags(newsItem.description.substring(0, 400))}
                        <div
                          style={{
                            display: 'inline-block',
                            color: '#006',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            transition: 'color 0.3s',
                          }}
                          onMouseOver={(e) => {
                            e.target.style.color = 'orange';
                          }}
                          onMouseOut={(e) => {
                            e.target.style.color = '#006';
                          }}
                        >
                          <ArrowRightAltIcon fontSize="large" />
                        </div>
                      </p>
                    </Link>
                  </div>
                </div>
                <div className="col-md-6 ps-0 pe-0 order-first order-lg-last">

                  <div className="on-going-video" key={newsItem.id}>
                    <div style={containerStyle}>
                      <iframe
                        src={newsItem.videoUrl}
                        style={iframeStyle}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>

                </div>
              </div>
            ))}
            <div className="news-blog mt-5">
              <div className="row align-items-center"onClick={WindowScroll}>
                {latestNews.map(
                  (newsItem, index) =>
                    index >= 3 && index <= 8 &&
                    (
                      <>
                        <div className="col-md-5 py-3" key={newsItem.id}>
                          <Link
                            to={`/news/${newsItem.handle}`}
                            style={{
                              textDecoration: "none",
                              color: "black",
                              className: "newsbox",
                            }}
                          >
                            <img
                              src={newsItem.img}
                              alt=""
                              className="img-fluid img-shadowdiv1"
                              style={{
                                width: "100%",
                                height: "250px",
                                objectFit: "cover",
                                borderRadius: "4px",
                              }}
                            />
                          </Link>
                        </div>
                        <div className="col-md-7 py-3" key={newsItem.id}>
                          <Link
                            to={`/news/${newsItem.handle}`}
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                            className="newsbox-style"
                          >
                            <h3 className="text-start">{newsItem.title}</h3>
                            <div
                              style={{
                                display: "inline-block",
                                marginRight: "10px",
                                verticalAlign: "top",
                              }}
                            >
                              <p className="text-start">
                                {stripHtmlTags(newsItem.description.substring(0, 400))}
                                <div
                                  style={{
                                    display: "inline-block",
                                    color: "#006",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    // marginLeft: "10px",
                                    transition: "color 0.3s",
                                  }}
                                  onMouseOver={(e) => {
                                    e.target.style.color = "orange";
                                  }}
                                  onMouseOut={(e) => {
                                    e.target.style.color = "#006";
                                  }}
                                >
                                  <ArrowRightAltIcon fontSize="large" />
                                </div>
                              </p>
                            </div>
                          </Link>
                        </div>
                      </>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewsPage;
