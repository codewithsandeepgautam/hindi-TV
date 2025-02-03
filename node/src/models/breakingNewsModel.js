const mongoose = require('mongoose')
const breakingNewsSchema = mongoose.Schema({
    title:String,
    titleHn:String ,
    createdAt:Date,
    isDeleted: { type: Boolean, default: false }

});
    
module.exports = mongoose.model('BreakingNews', breakingNewsSchema) 