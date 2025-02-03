import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { useLanguage } from "../../utils/LanguageContext";

const SearchBar = () => {
    const [searchKey, setSearchKey] = useState("");
    const [searchedData, setSearchedData] = useState([]);
    const [news, setNews] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const { language } = useLanguage();

    const getLatestNews = async (lang) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/news/getEverything/${lang}`);
            if (Array.isArray(response.data) && response.data.length > 0){
                setNews(response.data);
            } else {
                setNews([]);
            }
        } catch (error) {
            console.log("Error fetching latest news", error);
        }
    };
    useEffect(() => {
        getLatestNews(language);
    }, [language]);

    const handleSearch = () => {
        if (searchKey.trim() === "") {
            setSearchPerformed(false);
            setSearchedData([]);
            return;
        }
        setSearchPerformed(true);
        const key = searchKey.toLowerCase();

        const filteredCategories = 
            Array.isArray(news) && news.length > 0
                ? news.filter(category => category.category.toLowerCase().includes(key))
                : [];
        const filteredNewsItems =
            Array.isArray(news) && news.length > 0
                ? news.flatMap(category => 
                    category.newsItems.filter(newsItem =>
                        newsItem.title.toLowerCase().includes(key)
                    ).map(newsItem => ({
                        ...newsItem,
                        categoryHandle: category.category,
                        categoryId: category._id
                    }))
                )
                : [];
        const filteredPages = pages.filter(pageItem => {
            return Object.keys(pageItem).some(pageKey =>
                pageKey.toLowerCase().includes(key)
            );
        });
        setSearchedData([...filteredCategories, ...filteredNewsItems, ...filteredPages]);
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSearch();
        }
      };
    return (
        <div className="search-icon">
            <input
                className='search-btn-style'
                placeholder={language ==="pu" ? 'ਖੋਜ...' :'Search...'}
                type="text"
                onKeyPress ={handleKeyPress}
                value={searchKey}
                onChange={(e) => {
                    setSearchKey(e.target.value);
                    setSearchPerformed(false);
                }}
            />
            <SearchIcon className='searchbtn-icon' onClick={handleSearch} />
            <ul className='searchlist'>
                {searchPerformed ? (
                    searchedData.length > 0 ? (
                        searchedData.map((item, index) => (
                            <li key={index}>
                                {'category' in item ? (
                                    <Link to={`/category/${item.handle}`}>{item.category}</Link>
                                ) : 'title' in item ? (
                                    <Link to={`/news/${item.handle}`}>{item.title}</Link>
                                ) : (
                                    <Link to={Object.values(item)[0]}>{Object.keys(item)[0]}</Link>
                                )}
                            </li>
                        ))
                    ) : (
                        <li>Not Found</li>
                    )
                ) : null}
            </ul>
        </div>
    );
};

const pages = [
    { home: "/" },
    { about: "/about-us" },
    { contact: "/contact-us" },
    { shows: "/shows" },
    { terms: "/terms-and-conditions" },
    { videos: "/videos" },
    { news: "/news" },
    { advertise: "/advertise" },
    { investor: "/investor" },
    { career: "/career" },
    { breakingnews: "/breaking-news" },
    { privacy: "/privacy" },
    {disclaimer: "/disclaimer"},
    {pressreleases:"/press-releases"}
];

export default SearchBar;
