const mongoose = require('mongoose')
const classSchema = mongoose.Schema(
{
    cname:{
        type:String,
        required:true
    },
    cid:{
        type:String,
        required:true
    },
    mentorid:{
        type:String,
        required:true
    },
    
    nstudents:{
        type:Number,
        default:false
    },
    students:{
        type:Array,
        default:false
    },
    cimg:{
        type:String,
        default:false
    }

},{timestamp:true}
)

const classModel = mongoose.model('classes',classSchema)
module.exports =classModel


