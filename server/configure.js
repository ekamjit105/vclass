const mongoose = require('mongoose')

const connectDB = async() =>{

    try{
        const url = process.env.MONGODB_URI;  //from .env file, data accessed through process.env
        const conn= await mongoose.connect(url,{
        });

        console.log("MongoDB database connected");
    }
    catch(error){
        console.log(`Database connection error: ${error.message}`);
    }

};
module.exports=connectDB;