const mongoose = require('mongoose')
const LiveSchema = mongoose.Schema({
   videoUrl:String,
   createdAt:Date
})
module.exports = mongoose.model('Live', LiveSchema)