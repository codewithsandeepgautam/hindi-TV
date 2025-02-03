const breakingNewsModel = require('../models/breakingNewsModel')
const getBreakingNews = async(req,res)=>{
    const lang = req.params.lang.toLowerCase();
    try {
        const  breakingNews = await breakingNewsModel.find({isDeleted: false}).sort({createdAt: -1})
        const newsItems = breakingNews.map(news =>{
            let newsItem={}
            if(lang==='en'){
                newsItem.title = news.title; 
            } else if(lang ==='hn'){
                newsItem.title = news.titleHn;   
            }else{
                newsItem.error ='Invalid language selection'
            }
            newsItem.createdAt = news.createdAt;
            return newsItem
        })
    res.status(200).json({breakingNews:newsItems})
    } catch (error) {
       console.log(error)
       res.status(500). json({ message: "Something went wrong"}) 
    }
}

module.exports = {getBreakingNews}