import React from 'react'
import { useLanguage } from '../../utils/LanguageContext'
import { Link } from 'react-router-dom'
import internet from '../../assets/images/myinternet.jpg'
import internet1 from '../../assets/images/abacus.jpg'
import MenuIcon from '@mui/icons-material/Menu';


const LatestNews = () => {

   const { translate, latestNews } = useLanguage();
   const handleLinkClick = () => {
      window.scrollTo(0, 0);
   };
   const stripHtmlTags = (html) => {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.textContent || div.innerText || '';
   };
   return (
      <div>
         <section>
            <div className="padd features">
               <div className="container">
                  <div className='latest-news-shadowdiv'>
                     <div className="row">
                        <div className="col-sm-9">
                           <ul className="p-0">
                              <li className='frist_child'> <MenuIcon style={{ color: 'red', marginRight: '10px', marginBottom: "2px" }} /><strong style={{ fontSize: '18px', textTransform: 'uppercase' }}>{translate('latestNewsHeading')}</strong></li>
                           </ul>
                           <div className="row" >
                              {latestNews.map((newsItem, index) => (
                                 index < 4 && (
                                    <div className="col-sm-6" key={newsItem._id}>
                                       <div className="box">
                                          <Link to={`/news/${newsItem.handle}`} onClick={handleLinkClick}>
                                             <img src={newsItem.img} style={{ width: '500px', height: '250px', }} alt="" />
                                             <p className='mt-2 text-start  text-truncate'>{newsItem.title}...</p>
                                             <p className='sub-title-text'> {stripHtmlTags(newsItem.description.substring(0, 100))}...</p>
                                          </Link>
                                       </div>
                                    </div>
                                 )
                              ))}
                           </div>
                        </div>
                        <div className="col-sm-3 text-center">
                           <ul className="pt-5">
                           </ul>
                           {<ul className="add-section p-0">
                              <li>
                                 <Link to="https://www.myinternetzone.com/" target='_blank'>
                                    <img src={internet} alt="" />
                                 </Link>
                              </li>
                              <li>
                                 <Link to='https://www.theabacus.in/' target='_blank'>
                                    <img src={internet1} alt="" />
                                 </Link>
                              </li>
                           </ul>}

                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   )
}

export default LatestNews
