import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useLanguage } from "../../utils/LanguageContext";
import { Link } from "react-router-dom";
const NewsVideos = () => {
  const { translate, latestNews } = useLanguage();
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  }; 
  return (
    <div>
      <section className="latest-video padd features p-0">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <ul className="p-0">
                        <li className="frist_child">
                        
                           
                            <MenuIcon
                              style={{ color: "red", marginRight: "10px" , marginBottom:'2px'}}
                            />
                            <strong style={{fontSize : '18px', textTransform: 'uppercase'}}>
                            {translate("newsVideosHeadings")}
                            </strong>
                            
            
                        </li>
                      </ul>
                      <div className="row">
                      {latestNews.map((newsItem, index)=>(
                                index < 6 && newsItem.videoUrl &&(
                        <div className="col-sm-4 grid-margin" key={newsItem._id}>
                          <div className="position-relative responsive-iframe-container"  >
                            {/* <div className="rotate-img"> */}
                              <a href="/">
                                <iframe
                                
                                  src={newsItem.videoUrl}
                                  title="YouTube video player"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                ></iframe>
                                {/* <img
                                  src="img/latest-video1.jpg#"
                                  alt="thumb"
                                  className="img-fluid"
                                /> */}
                              </a>
                            {/* </div>   */}
                            {/* <div className="badge-positioned w-90">
                              <div className="d-flex justify-content-between align-items-center">
                                <span className="badge badge-danger font-weight-bold">
                                  Lifestyle
                                </span>
                                <div className="video-icon">
                                  <a href="/">
                                    <i className="fa fa-play"></i>
                                  </a>
                                </div>
                              </div>
                            </div> */}
                          </div>
                        </div>
                                    )
                                    ))}
                        {/* <div className="col-sm-4 grid-margin">
                          <div className="position-relative">
                            <div className="rotate-img">
                              <a href="/">
                                <img
                                  src="img/latest-video2.jpg"
                                  alt="thumb"
                                  className="img-fluid"
                                />
                              </a>
                            </div>
                            <div className="badge-positioned w-90">
                              <div className="d-flex justify-content-between align-items-center">
                                <span className="badge badge-danger font-weight-bold">
                                  National News
                                </span>
                                <div className="video-icon">
                                  <a href="/">
                                    <i className="fa fa-play"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}
                        {/* <div className="col-sm-4 grid-margin">
                          <div className="position-relative">
                            <div className="rotate-img">
                              <a href="/">
                                <img
                                  src="img/latest-video2.jpg"
                                  alt="thumb"
                                  className="img-fluid"
                                />
                              </a>
                            </div>
                            <div className="badge-positioned w-90">
                              <div className="d-flex justify-content-between align-items-center">
                                <span className="badge badge-danger font-weight-bold">
                                  National News
                                </span>
                                <div className="video-icon">
                                  <a href="/">
                                    <i className="fa fa-play"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                      {/* <div className="row">
                        <div className="col-sm-4">
                          <div className="position-relative">
                            <div className="rotate-img">
                              <a href="/">
                                <img
                                  src="img/latest-video3.jpg"
                                  alt="thumb"
                                  className="img-fluid"
                                />
                              </a>
                            </div>
                            <div className="badge-positioned w-90">
                              <div className="d-flex justify-content-between align-items-center">
                                <span className="badge badge-danger font-weight-bold">
                                  Lifestyle
                                </span>
                                <div className="video-icon">
                                  <a href="/">
                                    <i className="fa fa-play"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="position-relative">
                            <div className="rotate-img">
                              <a href="/">
                                <img
                                  src="img/latest-video4.jpg"
                                  alt="thumb"
                                  className="img-fluid"
                                />
                              </a>
                            </div>
                            <div className="badge-positioned w-90">
                              <div className="d-flex justify-content-between align-items-center">
                                <span className="badge badge-danger font-weight-bold">
                                  National News
                                </span>
                                <div className="video-icon">
                                  <a href="/">
                                    <i className="fa fa-play"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="position-relative">
                            <div className="rotate-img">
                              <a href="/">
                                <img
                                  src="img/latest-video4.jpg"
                                  alt="thumb"
                                  className="img-fluid"
                                />
                              </a>
                            </div>
                            <div className="badge-positioned w-90">
                              <div className="d-flex justify-content-between align-items-center">
                                <span className="badge badge-danger font-weight-bold">
                                  National News
                                </span>
                                <div className="video-icon">
                                  <a href="/">
                                    <a href="/">
                                      <i className="fa fa-play"></i>
                                    </a>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="read-more py-3 text-center">
              <Link to="/videos" onClick={handleLinkClick}>{translate('viewMoreBtn')}</Link>
            </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsVideos;
