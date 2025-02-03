import React, { useEffect, useState } from "react";
import "../../style/style.css";
import axios from "axios";
// import internet from "../../assets/images/myinternet.jpg";
import myev from "../../assets/images/my-ev.png";
import skypro from "../../assets/images/skypro-tv.png";
// import livebg from "../../assets/images/live.png";
// import icon from "../../assets/images/togle-img.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLanguage } from "../../utils/LanguageContext";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import LiveNewsSlider from "./LiveNewsSlider";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Live = () => {
  const { translate } = useLanguage();
  const [liveUrls, setLiveUrls] = useState([]);
  
  const getLiveNews = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/news/getlive`);
      console.log(">>>", response.data.liveUrls);
      setLiveUrls(response.data.liveUrls);
    } catch (error) {
      console.log("Error fetching Live:", error);
    }
  };

  useEffect(() => {
    getLiveNews();
  }, []);

  return (
    <div>
      <section>
        <div className="live-news padd features">
          <div className="container">
            <div className="row">
              <div className="col-sm-9">
                <ul className="p-0">
                  <li className="frist_child">
                    <MenuIcon style={{ color: "red", marginRight: "10px", marginBottom: '2px' }} />
                    <strong style={{ fontSize: '18px', textTransform: 'uppercase' }}>
                      {translate("liveHeading")}
                    </strong>
                  </li>
                </ul>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="box">
                      <div className="responsive-iframe-container">
                        {liveUrls.length > 0 ? (
                          <iframe
                            src={liveUrls[0].videoUrl}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <p>Loading...</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <LiveNewsSlider liveUrls={liveUrls}/>
                </div>
              </div>
              <div className="col-sm-3 text-center">
                <ul className="pt-5">
                </ul>
                <ul className="add-section p-0">
                  <li>
                    <Link to="https://www.skypro.co.in/" target='_blank'>
                      <img src={skypro} alt="skypro Tv" />
                    </Link>
                  </li>
                  <li>
                    <Link to="https://www.myevpoint.in/" target="_blank">
                      <img src={myev} alt="Myev Point" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Live;
