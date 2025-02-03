const mongoose = require('mongoose')
const categorySchema = mongoose.Schema({
    category:String,
    categoryHn:String ,
    hanlde:String,
    isDeleted: { type: Boolean, default: false }

});
    
module.exports = mongoose.model('Category', categorySchema) 