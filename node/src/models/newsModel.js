const mongoose = require('mongoose')
const NewsSchema = mongoose.Schema({
    title: String,
    titleHn:String,
    description:String,
    descriptionHn:String,
    img:String,
    handle:String,
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    videoUrl:String,
    createdAt:Date,
   
},)
module.exports = mongoose.model("News", NewsSchema)