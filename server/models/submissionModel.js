
const mongoose = require('mongoose')
const submitSchema = mongoose.Schema(
{
    uid:{
        type:String,
        required:true
    },
    uname:{
        type:String,
        required:true
    },
    pid:{
        type:String,
        required:true
    },
    grade:{
        type:Number,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    remarks:{
        type:String,
        required:true
    },
    datesubmitted:{
        type:Date,
        default:false
    },
},{timestamp:true}
)

const postModel = mongoose.model('submissions',submitSchema)
module.exports =postModel


