import React from "react";
import "../../style/style.css";
// import MenuIcon from "@mui/icons-material/Menu";
import { useLanguage } from "../../utils/LanguageContext";
import { Link } from "react-router-dom";
// import { AltRoute } from "@mui/icons-material";
const CategoryNews = () => {
    const { newsWithCategory } = useLanguage();
    const handleLinkClick = () => {
        window.scrollTo(0, 0);
      };
    return (
        <section>
            {newsWithCategory.map((category, index) => (
                <div key={category._id} className="live-news all-category py-4">
                    <div className="container">
                        <div className="p-4 backgroundclr">

                            <div className="row">
                            <Link  className="text-decoration-none text-dark" onClick={handleLinkClick} to={`/category/${category.handle}`}>
                                <h4>{category.category}</h4>
                            </Link>
                                <div className="col-md-7">
                                    <Link className="text-decoration-none text-dark" to={`/news/${category.newsItems[0].handle}`} onClick={handleLinkClick}>

                                        <div className="top-news-section-div">
                                            <div className="Intertenment-img position-relative">
                                                <img width="100%" height="420" src={category.newsItems[0].img} alt="" />
                                                <h5>{category.newsItems[0].title}</h5>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-md-5">
                                    {category.newsItems.slice(0, 5).map((newsItems, index) => (
                                        <Link className="text-decoration-none text-dark" to={`/news/${newsItems.handle}`} onClick={handleLinkClick}>

                                            <div key={newsItems.handle} className="news-post pb-2 mb-2">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="politics_img">
                                                            <img className="w-100" src={newsItems.img} alt="" />
                                                        </div>

                                                    </div>
                                                    <div className="col-md-8">
                                                        <h5>{newsItems.title.substring(0, 75)}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}

                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            ))}

        </section>

    );
};

export default CategoryNews;
