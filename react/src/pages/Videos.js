import React from "react";
import { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MenuIcon from "@mui/icons-material/Menu";
import rightIcon from "../assets/images/right-icon01.png";
import leftIcon from "../assets/images/left-icon01.png";

import { useLanguage } from "../utils/LanguageContext";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import "../style/style.css";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import SEO from "../components/common/Seo";

const styles = {
  videoItem: {
    width: "25%", // Adjust based on the number of videos you want to display per row
    padding: "0 15px", // Add some padding if necessary
    boxSizing: "border-box", // Ensure padding doesn't increase item width
  },
};

const Videos = () => {
  // window.scroll(0, 0);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [nav3, setNav3] = useState(null);
  const slider1Ref = useRef(null);
  const slider2Ref = useRef(null);
  const slider3Ref = useRef(null);
  const { language, changeLanguage, translate, latestNews } = useLanguage();
  // const [latestNews, setLatestNews] = useState([]);
  //   const [category, setCategory] = useState([]);

  //   const getLatestNews = async (lang) => {
  //     try {


  //         const response = await axios.get(`${process.env.REACT_APP_API_URL}/getNews/${lang}`,);

  //         // console.log("News>>", response.data);

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
  const stripHtmlTags = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };
  const handleNext = () => {
    if (nav3) {
      // nav1.slickNext();  Go to next slide for nav1
      // nav2.slickNext();  Go to next slide for nav2
      nav3.slickNext(); // Go to next slide for nav3
    }
  };

  const handlePrev = () => {
    if (nav3) {
      // nav1.slickPrev(); // Go to previous slide for nav1
      // nav2.slickPrev(); // Go to previous slide for nav2
      nav3.slickPrev(); // Go to previous slide for nav3
    }
  };

  useEffect(() => {
    // getLatestNews(language);
    setNav1(slider1Ref.current);
    setNav2(slider2Ref.current);
    setNav3(slider3Ref.current);
  }, []);
  return (
    <div>
      <SEO title="हिंदी न्यूज़ वीडियो, Breaking News Videos | My Hindi TV" description="देखें ताजातरीन हिंदी न्यूज़ वीडियो और ब्रेकिंग खबरें। My Hindi TV पर लाइव अपडेट्स और लेटेस्ट वीडियो।"/>
      <Navbar changeLanguage={changeLanguage} currentLanguage={language} />
      <section>
        <div className="live-news padd features Our-Show section-paddingfix">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <ul className="p-0">
                  <li className="frist_child">
                    <MenuIcon
                      style={{
                        color: "red",
                        marginRight: "10px",
                        marginBottom: "2px",
                      }}
                    />
                    <strong
                      style={{ fontSize: "18px", textTransform: "uppercase" }}
                    >
                      {translate("newsVideosHeadings")}
                    </strong>
                  </li>
                </ul>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="youtube-video-slider position-relative">
                      {/* <Slider ref={sliderRef1} {...settings}> */}
                      <Slider asNavFor={nav3} ref={slider1Ref} arrows={false}>
                        {latestNews.map(
                          (newsItem, index) =>
                            index < 6 && newsItem.videoUrl && (
                              <div
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  paddingBottom: "56.25%",
                                  overflow: "hidden",
                                }}
                                key={newsItem._id}
                              >
                                <iframe
                                  // width=""
                                  // height="315"
                                  src={newsItem.videoUrl}
                                  title="YouTube video player"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                  width="100%"
                                  height="480px"
                                ></iframe>
                                {/* <img className="w-100" src={thumb1} alt="" /> */}
                              </div>
                            )
                        )}
                      </Slider>
                      {/* <div>
                       
                      </div> */}
                      {/* <div>
                        <img className="w-100" src={thumb1} alt="" />
                      </div> */}
                      {/* </Slider> */}
                      <div className="next-pre-btn">
                        <img className="videoimg001" src={leftIcon} alt="" onClick={handleNext} />
                        <img className="videoimg002" src={rightIcon} alt="" onClick={handlePrev} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <Slider asNavFor={nav2} ref={slider3Ref} arrows={false}>
                      {latestNews.map(
                        (newsItem, index) =>
                          index < 6 && newsItem.videoUrl && (
                            <div className="bottom-caption" key={newsItem._id}>
                              <Link
                                to={`/news/${newsItem.handle}`}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                <h2 className="text-black">{newsItem.title}</h2>

                                <p className="text-start">
                                  {stripHtmlTags(newsItem.description.substring(0, 545))}

                                  {/* Truncate to 100 characters as an example */}
                                  {/* Display 'Read More' link to navigate to the full news article */}
                                  <span
                                    style={{
                                      color: "#006",
                                      textDecoration: "none", // Remove underline
                                      cursor: "pointer",
                                      // marginLeft: "10px", // Adding some space between the truncated text and the "Read More" link
                                      transition: "color 0.3s", // Smooth color transition on hover
                                    }}
                                    onMouseOver={(e) => {
                                      e.target.style.color = "orange";
                                    }} // Change color on hover
                                    onMouseOut={(e) => {
                                      e.target.style.color = "#006";
                                    }} // Change color back to grey on mouse out
                                  >
                                    <ArrowRightAltIcon fontSize="large" />
                                  </span>
                                </p>
                              </Link>
                            </div>
                          )
                      )}
                    </Slider>
                  </div>

                  <div
                    className="col-sm-6 section-to-hide"
                    style={{ textAlign: "right" }}
                  >
                    <ul className="youtube-videos">
                      {/* <Slider ref={sliderRef2} {...settings}> */}
                      <Slider
                        arrows={false}
                        asNavFor={nav1}
                        ref={slider2Ref}
                        slidesToShow={2}
                        swipeToSlide={true}
                        focusOnSelect={true}
                      >
                        {latestNews.map(
                          (newsItem, index) =>
                            index < 6 && newsItem.videoUrl && (
                              <div key={newsItem._id} style={styles.videoItem}>
                                {/* <h3>{index + 1}</h3> */}
                                <li>
                                  <div
                                    style={{
                                      position: "relative",
                                      width: "100%",
                                      paddingBottom: "56.25%",
                                      height: 0,
                                      overflow: "hidden",

                                    }}
                                  >
                                    <iframe
                                      src={newsItem.videoUrl}
                                      title="YouTube video player"
                                      frameBorder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                      allowFullScreen
                                      style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        margin: "0px 30px",
                                      }}
                                    ></iframe>
                                  </div>
                                  <p style={{ fontSize: "12px" }}>
                                    {newsItem.title.substring(0, 40)}...
                                  </p>
                                </li>
                              </div>
                            )
                        )}
                      </Slider>
                      {/* </Slider> */}
                      {/* <li>
                        <img className="w-100" src={thumb2} alt="" />
                        <p>Welcotme To The Best Model Winner Contest 2</p>
                      </li>
                      <li>
                        <img className="w-100" src={thumb2} alt="" />
                        <p>Welcotme To The Best Model Winner Contest 3</p>
                      </li> */}
                      {/* </Slider> */}
                      <li>
                        {/* <Slider ref={sliderRef2} {...settings}> */}
                        {/* <img className="w-100" src={thumb2} alt=""/>
                                 <p>Welcotme To The Best Model Winner Contest</p> */}
                        {/* </Slider> */}
                      </li>
                    </ul>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-sm-6">
                    <span className="cursor-pointer-div">
                      <iframe
                        width="100%"
                        height="315"
                        src="https://www.youtube.com/embed/8FfZjpZvpB0?si=QhGo3D_NyNgZWnMe"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                      <h4 className="py-2">
                        {translate("videoPageContentTitle")}
                      </h4>
                      <p className="py-2 pe-none">
                        {translate("videoPageContentDesc")}
                      </p>
                    </span>
                    <span className="latest-news mb-4">
                      Updated 10:32 AM, December 22, 2023
                    </span>
                  </div>
                  <div className="col-sm-6">
                    <div className="row">
                      <div className="col-sm-6">
                        <span className="cursor-pointer-div">
                          <iframe
                            width="100%"
                            // height="315"
                            src="https://www.youtube.com/embed/QNcxL6U_6Uk?si=HZy7ZPFQyYg7caQG"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          ></iframe>
                          <h5 className="py-3 mb-1">
                            {translate("videoPageTitlebyCategory")}
                          </h5>
                        </span>
                        <span className="latest-news mb-4">
                          Updated 10:32 AM, December 22, 2023
                        </span>
                      </div>
                      <div className="col-sm-6">
                        <span className="cursor-pointer-div">
                          <iframe
                            width="100%"
                            // height="315"
                            src="https://www.youtube.com/embed/QNcxL6U_6Uk?si=HZy7ZPFQyYg7caQG"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          ></iframe>
                          <h5 className="py-3 mb-1">
                            {translate("videoPageTitlebyCategory")}{" "}
                          </h5>
                        </span>
                        <span className="latest-news mb-4">
                          Updated 10:32 AM, December 22, 2023
                        </span>
                      </div>
                      <div className="col-sm-6">
                        <span className="cursor-pointer-div">
                          <iframe
                            width="100%"
                            // height="315"
                            src="https://www.youtube.com/embed/QNcxL6U_6Uk?si=HZy7ZPFQyYg7caQG"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          ></iframe>
                          <h5 className="py-3 mb-1">
                            {translate("videoPageTitlebyCategory")}{" "}
                          </h5>
                        </span>
                        <span className="latest-news mb-4">
                          Updated 10:32 AM, December 22, 2023
                        </span>
                      </div>
                      <div className="col-sm-6">
                        <span className="cursor-pointer-div">
                          <iframe
                            width="100%"
                            // height="315"
                            src="https://www.youtube.com/embed/QNcxL6U_6Uk?si=HZy7ZPFQyYg7caQG"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          ></iframe>
                          <h5 className="py-3 mb-1">
                            {translate("videoPageTitlebyCategory")}{" "}
                          </h5>
                        </span>
                        <span className="latest-news mb-4">
                          Updated 10:32 AM, December 22, 2023
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="news-blog mt-5">
                  <div className="row align-items-center">
                    {latestNews.map(
                      (newsItem, index) =>
                        index >= 1 &&
                        index < 5 && (
                          <>
                            <div className="col-md-5 py-3 " key={newsItem.id}>
                              <Link
                                to={`/news/${newsItem.handle}`}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                  className: "newsbox",
                                }}
                              >
                                {/* <img
                                  src={newsItem.img}
                                  alt=""
                                  className="img-fluid img-shadowdiv1"
                                  style={{
                                    width: "100%",
                                    height: "250px",
                                    objectFit: "cover",
                                    borderRadius: '4px'
                                  }}
                                /> */}
                                <iframe
                                  width="100%"
                                  // height="315"
                                  src={newsItem.videoUrl}
                                  title="YouTube video player"
                                  frameBorder="0"
                                  style={{
                                    width: "100%",
                                    height: "250px",
                                    objectFit: "cover",
                                    borderRadius: '4px'
                                  }}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                ></iframe>
                              </Link>
                            </div>
                            <div className="col-md-7 py-3 " key={newsItem.id}>
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
                                    {stripHtmlTags(newsItem.description.substring(0, 300))}
                                    <div
                                      style={{
                                        display: "inline-block",
                                        color: "#006",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                        // marginLeft: "1px",
                                        transition: "color 0.3s",
                                        fontWeight: "500px"
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
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Videos;
