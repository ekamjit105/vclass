const express = require("express");
const router = express.Router();
const Submissions = require("../models/submissionModel")
const Users = require("../models/userModel")


router.post("/addsub",async(req,res)=>{
    
    const sobj = req.body
    try {
        // Assuming Class and User are defined properly
        
        const newSubmission = new Submissions(sobj);
        await newSubmission.save(); // Use await here if save is asynchronous

        const {uid,pid} = sobj

        const userc = await Users.findOne({ uid: uid }); // Use await here
        if (userc) {
            userc.uid = userc.uid;
            userc.name = userc.name;
            userc.password = userc.password;
            userc.submitted = [...userc.submitted,pid];
            userc.classes = userc.classes;
    
            await userc.save(); // Use await here
            res.status(200).send('Submission and User updated successfully');
        } else {
            res.status(404).send('User not found');
        }

       
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error'); // Change status code to 500 for unhandled errors
    }
    });


    router.post("/getonesubmission",async(req,res)=>{
        const {uid,pid} = req.body
        try {
        
            // Use the `find` method to get an array of class objects based on the class IDs
            const onesubmission = await Submissions.find({ uid: uid,pid:pid });
        
        
            res.json(onesubmission); // Send the array of class objects as a JSON response
          } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
          }
        });



        router.post("/getallsubmissions",async(req,res)=>{
            const {pid} = req.body
            try {
            
                // Use the `find` method to get an array of class objects based on the class IDs
                const allsubmissions = await Submissions.find({ pid:pid });
            
            
                res.json(allsubmissions); // Send the array of class objects as a JSON response
              } catch (error) {
                console.error(error);
                res.status(500).send('Server Error');
              }
            });
    


            router.post("/gradesub",async(req,res)=>{
    
              const sobj = req.body
              const date = new Date(sobj.datesubmitted)
              try {
                  // Assuming Class and User are defined properly
                  
                 const upsubmission = await Submissions.findOne({_id:sobj._id});
                  

                 if(upsubmission)
                 {
                  upsubmission.grade=sobj.grade;   
                  upsubmission.remarks=sobj.remarks;
                  upsubmission.datesubmitted=date;
                  await upsubmission.save(); // Use await here
                  res.status(200).send('grade updated');
                 }
                else {res.status(404).send("grade not updated");}
              } catch (error) {
                  console.error(error);
                  res.status(500).send('Internal server error'); // Change status code to 500 for unhandled errors
              }
              });
    
module.exports = router;