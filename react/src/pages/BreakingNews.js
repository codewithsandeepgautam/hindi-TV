import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from '../components/common/Navbar'
import { useLanguage } from '../utils/LanguageContext'
import Footer from '../components/common/Footer'
import UpdateIcon from '@mui/icons-material/Update';
import { Tooltip } from '@mui/material'
const BreakingNews = () => {
    const {changeLanguage, language, translate} = useLanguage()
    const [breakingNews, setBreakingNews] = useState([])
    const getBreakingNews = async (lang) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/news/getBreakingNews/${lang}`)
            console.log("Btgfrfv News", response.data.breakingNews)
            setBreakingNews(response.data.breakingNews)
        } catch (error) {
            console.log("Error fetching latest news", error)
        }
    }
    useEffect(() => {
        getBreakingNews(language)
    }, [language])
    const formatCreatedAt = (createdAt) => {
        const options = {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        };
        const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);
        return dateTimeFormat.format(new Date(createdAt));
      };
const getCurrentDate = () =>{
    const date = new Date()
    const day = String(date.getDate()).padStart(2,'0')
    const month = String(date.getMonth()+1).padStart(2,'0');
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}
const handleReloadClick = ()=>{
    window.location.reload()
}
  return (
    <div>
      <Navbar changeLanguage={changeLanguage} currentLanguage={language}/>
      <section class="breaking-news-section py-5 section-paddingfix">
    <div class="container">
      <div className='row'>
        <div className='col-sm-12 d-flex align-items-center justify-content-between'>
          <h2 className='latestbracking-news' >{translate("breakingNewsHeading")} | {getCurrentDate()}</h2> 
          <Tooltip title='Refresh' >
            <UpdateIcon onClick={handleReloadClick}  style={{cursor:"pointer"}} />
          </Tooltip>

          </div>
      </div>
        <div class="row" style={{background: "#00006617"}}>
            {breakingNews && breakingNews.length>0 ?(breakingNews.map((newsItem, index)=>(
            <div class="col-md-12 p-0" key={newsItem._id} style={{borderRight: "1px solid #fff"}}>
                    <div class="leftarea-inner d-flex"> <span>{formatCreatedAt(newsItem.createdAt)}</span> | <div class="content ps-2"><p class="m-0">{newsItem.title}</p></div> </div>
            </div>

            ))):(<div class="content ps-2"><p class="m-0">{language==='en'?"No breaking news available":"कोई ब्रेकिंग न्यूज़ उपलब्ध नहीं है"}</p></div> )}
        </div>
    </div>
</section>
      <Footer/>
    </div>
  )
}

export default BreakingNews
