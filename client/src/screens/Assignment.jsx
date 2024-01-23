import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useSearchParams } from 'react-router-dom'
import { getOnePost } from '../actions/postAction';
import { createSub, getOneSubmission } from '../actions/submissionAction';
import SubmissionRemarks from '../components/SubmissionRemarks';
const Assignment = () =>{

    const [queryParams] = useSearchParams();
    const pid = queryParams.get("pid");
    console.log(pid);


    //getonepost
    const dispatch = useDispatch()
    useEffect(()=>{
        console.log("dispatching one class")
        dispatch(getOnePost({pid}))
    },[dispatch])

    const {pobj,loading} = useSelector((state)=>state.getOnePostReducer)

    //getcurrent user from local storage












    //get that post object for given pid
    //const pobj = {pid : 2, pname: "Announcement", pdesc: "Lorem Ipsum", ptype:"general", pdate:"06/10/2023", pdeadline:"08/10/2023"}
    let pname="",pdesc="",datecreated="",deadline=new Date()

    if(!loading)
    {
        pname=pobj.pname
        pdesc=pobj.pdesc
        datecreated=pobj.datecreated
        deadline=pobj.deadline
    } 

    const currdate=new Date()
    const dline = new Date(deadline)
    console.log("deadline conv : ",dline)
    
    const expired = currdate>dline

    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    console.log(currentUser)
    //check if student.submitted has pid
    
 
    //console.log("getones state from assgn",useSelector(state=>state.getOneSubmissionReducer))

    const [slink,setLink] = useState()

    //this will save submitted data to submissions collection, and add pid in the user's submissions
    const submissionHandler=()=>{

        const sobj = {
            uid:currentUser.uid,
            uname:currentUser.uname,
            pid:pid,
            grade:-1,
            link:slink,
            remarks:" ",
            datesubmitted:currdate
        }

        console.log("submitting", sobj)

        //dispatch submit action
        dispatch(createSub(sobj))

    }



    return(
        <>
        <br></br><br></br>
        <Container>
            <Row style={{border:"1px solid grey", borderRadius:"10px", padding:"2%"}}>
                <Col>

                    <h3>{pname} </h3>
                    Posted on : {new Date(datecreated).toLocaleDateString('en-GB')}<br></br>
                    Deadline : {new Date(datecreated).toLocaleDateString('en-GB')}
                    <br></br><br></br>
                    <p>{pdesc}</p>
                    <br></br>
                    {
                        !currentUser.submitted.includes(pid)?( 
                        <>{ 
                            dline>currdate?
                            (<><h6 style={{"display":"inline", "padding":"2%","color":"brown"}}>Submission Pending</h6>
                                <input require value = {slink} onChange ={e=>setLink(e.target.value)} style={{width:"40%", padding:"2%"}} type="text" placeholder="Add submission link"></input>
                                <br/>
                                <br/>
                                <Button onClick={submissionHandler}>Submit</Button>
                            </>)
                            :
                            (<h6 style={{"display":"inline", "padding":"2%","color":"red"}}>Deadline Expired</h6>)
                    
                        }</>)
                        :(<>
                            <h6 style={{"display":"inline", "padding":"2%","color":"green"}}>Submission Completed</h6>
                            You have already submitted this assignment
                        <SubmissionRemarks pid={pid} uid={currentUser.uid}/>
                        
                             
                        </>)
                    }
                
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </Col>
            </Row>

        </Container>

        </>

    )
}

export default Assignment