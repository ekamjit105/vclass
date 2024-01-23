const express = require("express");
const router = express.Router();
const Post = require("../models/postModel")
const { ObjectId } = require('mongodb');

router.post("/addpost",async(req,res)=>{
    const pobj = req.body
    try {
        // Assuming Class and User are defined properly
        
        const newpost = new Post(pobj);
        await newpost.save(); // Use await here if save is asynchronous
       
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error'); // Change status code to 500 for unhandled errors
    }

})




router.post("/getallposts",async(req,res)=>{
    const {cid} = req.body
    try {
    
        // Use the `find` method to get an array of class objects based on the class IDs
        const pobj = await Post.find({ cid: cid });
    
    
        res.json(pobj); // Send the array of class objects as a JSON response
      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
    });
    
    router.post("/getonepost",async(req,res)=>{
        const {pid} = req.body
        try {
        
            // Use the `find` method to get an array of class objects based on the class IDs
            const onepost = await Post.find({ _id: pid });
        
        
            res.json(onepost); // Send the array of class objects as a JSON response
          } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
          }
        });
        
            
    router.post("/deletepost", async (req, res) => {
      const { pid } = req.body;
      
      try {

        // Use the `deleteOne` method and await its result
        const result = await Post.deleteOne({ _id: new ObjectId(pid) });

        if (result.deletedCount === 1) {
          console.log(`Post with _id ${pid} deleted successfully`);
          res.status(200).json({ message: 'Post deleted successfully' });
        } else {
          console.log(`Post with _id ${pid} not found`);
          res.status(404).json({ error: 'Post not found' });
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

module.exports = router;