const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
{
    uname:{
        type:String,
        required:true
    },
    uid:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    classes: {
        joined: {
          type: [String], // Assuming class IDs are strings
          default: [],
        },
        created: {
          type: [String], // Assuming class IDs are strings
          default: [],
        },
    },
    submitted:{
        type:Array,
        default:false
    }

},{timestamp:true}
)

const userModel = mongoose.model('users',userSchema)
module.exports =userModel


