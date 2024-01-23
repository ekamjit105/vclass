const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const OTP = require("../models/OTPModel")

router.post("/login",async(req,res)=>{

const {uid,password}=req.body
try {
  const user = await User.find({uid,password})
  if(user.length>0)
  {
    const currentUser = {
        uid:user[0].uid,
        password:user[0].password,
        uname:user[0].uname,
        classes:user[0].classes,
        submitted:user[0].submitted
    }
    res.status(200).send(currentUser)
  }
  else{
    alert("Login fail. Please check your credentials.")
    res.status(404)
  }
} catch (error) {
  res.status(404)
}
})


router.post("/register", async (req, res) => {
 
  const {uname,uid,password,classes}= req.body
  const newuser = new User({uname,uid,password,classes})

try {
      newuser.save()
      res.status(200).json({
        success:true,
        message:"Register Success"
      })
} catch (error) {
  res.status(400).json({ message: error });
}
});



router.post('/finduser',async(req,res)=>{
  
  const {uid} = req.body;
  
  try{
    const user = await User.findOne({uid:uid});
    
    if(user)
    {res.status(200).send({exists:true})
    }
    else{
      res.status(200).send({exists:false})
    }
  }
  catch(e)
  {
    res.status(404).send({exists:false})
  }
})


router.post('/saveOTP',async(req,res)=>{
  
  const {email,rcdOTP} = req.body;
  
  
  try{
    const user = await OTP.findOne({email:email});
    if(user)
    {
      (user.OTP=req.body.OTP)
      await user.save();
    }
    else{
      const newuser = new OTP(req.body)
      await newuser.save();
    }
    res.status(200).send({})
  }
  catch(e)
  {
    res.status(404).send({})
  }
})


router.post('/validateOTP',async(req,res)=>{
  
  const {email,rcdOTP} = req.body;
  

  try{
    const validotp = await OTP.find({email:req.body.email,OTP:req.body.OTP});
    var password= ""
    var resobj;
    if(validotp)
    {
      const userdetails = await User.findOne({uid:email});
      if(userdetails)
      resobj = {matched:true, password:userdetails.password}
      else
      resobj = {matched:true, password:password}
    }
    else{
      resobj = {matched:false, password:password}
    }
    res.status(200).send(resobj)
  }
  catch(e)
  {
    res.status(404).send({})
  }
})

router.post('/finduser',async(req,res)=>{
  
  const {uid} = req.body;
  
  try{
    const user = await User.findOne({uid:uid});
    
    if(user)
    {res.status(200).send({exists:true})
    }
    else{
      res.status(200).send({exists:false})
    }
  }
  catch(e)
  {
    res.status(404).send({exists:false})
  }
})



module.exports = router;
