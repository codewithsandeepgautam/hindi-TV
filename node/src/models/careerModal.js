const mongoose = require("mongoose");
const careerSchema = new mongoose.Schema({
    fullName :{
        type : String,
        required : true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobTitle:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    file:{
        type:String,
        required:true
    }
})

const Career = mongoose.model('Career', careerSchema)
module.exports = Career;
