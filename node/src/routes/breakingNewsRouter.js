const express = require('express')
const {getBreakingNews} = require('../controllers/breakingNewsController')
const breakingNewsRouter = express.Router()
breakingNewsRouter.get('/getBreakingNews/:lang', getBreakingNews)
module.exports= breakingNewsRouter;