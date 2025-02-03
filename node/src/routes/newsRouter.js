const express = require('express')
const{getNewsByLanguage, getNewsById, getAllCategoriesWithNews, getAllNewsWithCategory} = require('../controllers/newsController')
const newsRouter = express.Router()
newsRouter.get('/getNews/:lang', getNewsByLanguage)
newsRouter.get('/getnews/:lang/:handle',getNewsById)
newsRouter.get('/getEverything/:lang', getAllCategoriesWithNews)
newsRouter.get('/getSearchResults/:lang', getAllNewsWithCategory)
module.exports = newsRouter
