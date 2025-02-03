import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../utils/LanguageContext'
const Categories = () => {
    const { newsWithCategory } = useLanguage();
    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    };
    return (
        <div>
            <div className="categories-section">
                <div className="container-fluid px-0">
                    <div className='categories_overflow_menu'>
                        <ul className='cat_menu_list'>
                            {newsWithCategory.map((category, index) => (
                                index < 6 && (
                                    <li className='text-capitalize'><Link className='menu_item' to={`/category/${category.handle}`} >{category.category}</Link>
                                        <div className='sub_menu'>
                                            <ul className='sub_menu_items'>
                                                {category.newsItems.map((newsItem, index) => (
                                                    index < 4 && (
                                                        <li key={newsItem._id}>
                                                            <Link className='sub_menu_item' to={`/news/${newsItem.handle}`} onClick={handleLinkClick}>
                                                                <div className='menu_item_img'>
                                                                    <img src={newsItem.img} alt="" />
                                                                </div>
                                                                <p>{newsItem.title.substring(0, 60)}...</p>
                                                            </Link>
                                                        </li>
                                                    )
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                )
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Categories
