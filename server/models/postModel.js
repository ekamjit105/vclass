const mongoose = require('mongoose')
const postSchema = mongoose.Schema(
{
    pname:{
        type:String,
        required:true
    },
    pdesc:{
        type:String,
        required:true
    },
    
    ptype:{
        type:String,
        required:true
    },
    datecreated:{
        type:Date,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    cid:{
        type:String,
        default:false
    },
    submitted:{
        type:Array,
        default:false
    },
    total:{
        type:Number,
        required:true
    },

},{timestamp:true}
)

const postModel = mongoose.model('posts',postSchema)
module.exports =postModel


