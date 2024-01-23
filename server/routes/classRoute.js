const express = require("express");
const router = express.Router();
const Class = require("../models/classModel");
const User = require("../models/userModel")

router.post("/addclass",async(req,res)=>{
    const {newclass,uobj} = req.body

    try {
        // Assuming Class and User are defined properly
        const nclass = new Class(newclass);
        await nclass.save(); // Use await here if save is asynchronous
        console.log("received user")
        console.log(uobj)
        const userc = await User.findOne({ uid: uobj.uid }); // Use await here
        if (userc) {
            userc.uid = uobj.uid;
            userc.name = uobj.name;
            userc.password = uobj.password;
            userc.submitted = uobj.submitted;
            userc.classes = uobj.classes;
    
            await userc.save(); // Use await here
            res.status(200).send('User updated successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error'); // Change status code to 500 for unhandled errors
    }

})


router.post("/joinclass",async(req,res)=>{
    const {cid,uobj} = req.body
    //update user (joined added)
    const {uid} = uobj
    //find and update the class object with uid in students
    try {
        // Assuming Class and User are defined properly
      
        const myclass = await Class.findOne({ cid: cid }); // Use await here
        if (myclass) {
            myclass.cname=myclass.cname;
            myclass.cid=myclass.cid;
            myclass.mentorid=myclass.mentorid;
            myclass.nstudents=myclass.nstudents+1;
            myclass.students=[...myclass.students,uid];
            await myclass.save(); // Use await here
        } else {
            res.status(404).send('class not found');
        }

        //updating user
        const userc = await User.findOne({ uid: uobj.uid }); // Use await here
        if (userc) {
            userc.uid = uobj.uid;
            userc.name = uobj.name;
            userc.password = uobj.password;
            userc.submitted = uobj.submitted;
            userc.classes = uobj.classes;
    
            await userc.save(); // Use await here
            console.log("updated user now : ",userc)
            res.status(200).send('User updated successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error'); // Change status code to 500 for unhandled errors
    }

})

    router.post("/getallclassesu",async(req,res)=>{
        const {uid} = req.body
        try {
            const user = await User.findOne({uid:uid})
            const created=user.classes.created;
            const joined=user.classes.joined;

            const allclasses=[...created,...joined];
            //console.log(allclasses);
        
            // Use the `find` method to get an array of class objects based on the class IDs
            const classes = await Class.find({ cid: { $in: allclasses } });
        
            //console.log(classes);
        
            res.json(classes); // Send the array of class objects as a JSON response
          } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
          }
        });



    router.post("/getoneclass",async(req,res)=>{
        const {cid} = req.body
        try {
            //console.log('in getoneclass router');
           // console.log(cid);
        
            // Use the `find` method to get an array of class objects based on the class IDs
            const oneclass = await Class.find({ cid: cid });
        
            //console.log(oneclass);
        
            res.json(oneclass); // Send the array of class objects as a JSON response
          } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
          }
        });
    

        router.post("/removeclassuser",async(req,res)=>{
            const {uid,cid} = req.body
            try {
                
                const foundClass = await Class.findOne({cid:cid});

                if (!foundClass) {
                return res.status(404).json({ error: 'Class not found' });
                }

                // Remove the specified student ID from the array
                foundClass.students = foundClass.students.filter(student => student !== uid);
                foundClass.nstudents = foundClass.nstudents-1;
                // Save the updated class document
                await foundClass.save();


                //now removing class id from user's joined

                const foundUser = await User.findOne({uid:uid});
                if (!foundUser) {
                    return res.status(404).json({ error: 'User not found' });
                }
                
                (foundUser.classes.joined = foundUser.classes.joined.filter(joinedClass => joinedClass !== cid));
                await foundUser.save();

                console.log(foundUser.classes)

                //console.log(`Removed student ${uid} from class ${cid}`);
                res.status(200).json(foundUser);
            
            } catch (error) {
                console.error('Error removing student from class:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
            });
        


            router.post("/deleteClass", async (req, res) => {
                const { cid } = req.body;
              
                try {
                  // Remove the class document by its ID
                  const result = await Class.deleteOne({ cid: cid });
              
                  if (result.deletedCount !== 1) {
                    console.log(`Class with cid ${cid} not found`);
                    return res.status(404).json({ error: 'Class not found' });
                  }
              
                  // Now remove the cid from the joined array in all user documents
                  const updateResult = await User.updateMany(
                    { "classes.joined": cid },
                    { $pull: { "classes.joined": cid } }
                  );
              
                  console.log(`Removed class ${cid} from ${updateResult.modifiedCount} users`);
              

                     // Now find and remove the cid from the created array in the user who created the class
                    const creatorResult = await User.updateOne(
                        { "classes.created": cid },
                        { $pull: { "classes.created": cid } }
                    );
                
                    if (creatorResult.modifiedCount === 1) {
                        console.log(`Removed class ${cid} from the creator's created array`);
                    } else {
                        console.log(`Class ${cid} not found in the creator's created array`);
                    }

                  res.status(200).json({ message: 'Class removed successfully' });
                } catch (error) {
                  console.error('Error removing class:', error);
                  res.status(500).json({ error: 'Internal server error' });
                }
              });


    module.exports = router;
    
    