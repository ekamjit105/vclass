import React, { useEffect } from 'react'
import {Form, Container, Row, Col } from 'react-bootstrap'
import Post from '../components/Post'

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Modal, Button } from 'react-bootstrap';
import { createPost, getAllPosts } from '../actions/postAction';
import { sendMail } from '../actions/mailAction';
import { deleteClass, removeClassUser } from '../actions/classAction';


const MenClass = ({cid}) => {
  
    //get all posts in cid
    /*const posts = [
    {pid : 1, pname: "Assignment 1", pdesc: "Lorem Ipsum", ptype:"assignment", pdate:"06/10/2023", pdeadline:"07/10/2023"},
    {pid : 2, pname: "Announcement", pdesc: "Lorem Ipsum", ptype:"general", pdate:"06/10/2023", pdeadline:""},
    {pid : 3, pname: "Assignment 2", pdesc: "Lorem Ipsum", ptype:"assignment", pdate:"05/10/2023", pdeadline:"08/10/2023"}]
    */

    //addpost modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [pname,setPname]=useState()
    const [pdesc,setPdesc]=useState()
    const [ptype,setPtype]=useState(false)
    const [deadline,setDeadline]=useState(new Date())
    const [total,setTotal]=useState(0)
    

    //mail modal
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [tomail,setToMail]=useState("")
    const [sub,setSub]=useState()
    const [txt,setTxt]=useState()


    const dispatch  = useDispatch()


      useEffect(()=>{
        dispatch(getAllPosts({cid}))
      },[dispatch])


    const {posts,loading}=useSelector(state=>state.getAllPostReducer)
    const {thisclass}=useSelector(state=>state.getOneClassReducer)

    const navigate = useNavigate()

    const addposthandler=()=>{

      const pobj = {

        pname:pname,
        pdesc:pdesc,
        ptype:ptype?"assignment":"general",
        deadline:new Date(deadline),
        total:parseInt(total),
        submissions:[],
        datecreated:new Date(),
        cid:cid
      }

      dispatch(createPost(pobj))
      
      setPname()
      setPdesc()
      setPtype(false)
      setDeadline(new Date())
      setTotal(0)

      setShow(false)
      window.location.href=`/class?cid=${cid}`;
      
      //dispatch(getAllPosts(pobj))
        //save this post object in posts using addpost action
    }


    const sendMailHandler = () =>{
      var mailobj = {
        to:tomail,
        subject:sub,
        text:txt
        }
        //dispatch send mail action
        dispatch(sendMail(mailobj))
        setTxt("")
        setSub("")
        alert("Mail successfully sent")
        
    }

   
    const handleremove = (uid) => {
      if (typeof window !== 'undefined' && window.confirm("Are you sure you want to remove "+uid)) {
        dispatch(removeClassUser({uid:uid,role:1,cid:cid}))
      } else {
        console.log("User pressed Cancel");
      }
    };

    
   const DeleteClass =()=>{
    if (typeof window !== 'undefined' && window.confirm("Are you sure you want to delete the class?")) {
        dispatch(deleteClass({cid:cid}))
      } else {
        console.log("User pressed Cancel");
      }
   }


    return (
    <>


<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
          <Form>
            <Form.Group>
                <Form.Control required type="text" placeholder="Add title" value={pname} onChange={e=>setPname(e.target.value)}/>
                <br></br>
                <Form.Control required value={pdesc} onChange={e=>setPdesc(e.target.value)} type="text" placeholder="Add Description" name="desc"/>
                <br></br>
                <Form.Check required value={ptype} onClick={e=>setPtype(!ptype)} label="Assignment"/>
                <br></br>

                {
                  ptype?
                  (<><Form.Control value={deadline} onChange={e=>setDeadline(e.target.value)} type="date" name="duedate"/>
                <br></br>
                <Form.Control value={total} onChange={e=>setTotal(e.target.value)} type="text" placeholder="Total Marks" name="marks"/>
                <br></br></>)
                  :
                  (<></>)}
                
                <Button onClick={addposthandler}>Post</Button>
            
            </Form.Group>

          </Form>
        
        </Modal.Body>
      
      </Modal>


      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Send a new mail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
          <Form>
            <Form.Group>
            Mail to : {tomail}<br></br><br></br>
                <Form.Control required type="text" placeholder="Add Subject" value={sub} onChange={e=>setSub(e.target.value)}/>
                <br></br>
                <Form.Control required value={txt} onChange={e=>setTxt(e.target.value)} type="textarea" placeholder="Add Body" name="desc"/>
                <br></br>
                <Button onClick={sendMailHandler}className='btn-success'>Send mail</Button>
                &nbsp;&nbsp;&nbsp;
                <Button onClick={handleClose2} className='btn-danger'>Close</Button>
            
            </Form.Group>

          </Form>
        
        </Modal.Body>
      
      </Modal>



        <Container style={{marginTop:"2%"}}>

            <Row>

                <Col md={3} style={{border:"1px solid grey",backgroundColor:"#fafffc" ,borderRadius:"10px", padding:"2%", marginRight:"2%"}}>
                    <h4>
                        Participants  ({thisclass.nstudents})
                    </h4>
                    <hr></hr>
                    
                    {
                        thisclass.nstudents!=0?(thisclass.students.map(student=>(
                          <>
                            <span style={{fontSize:"2vh"}}>{student}</span>&nbsp;
                            <img src="icons/delete.png" style={{height:"15px",width:"15px",cursor:"pointer"}} onClick={()=>{handleremove(student)}}></img>
                            &nbsp;
                            <i class="fa fa-envelope" aria-hidden="true" style={{height:"15px",width:"15px",cursor:"pointer"}} onClick={()=>{handleShow2(); setToMail(student);}}></i><br></br></>
                        
                        ))):(<span>No Students in the class</span>)
                        
                    }

                </Col>

                <Col md={8} style={{padding:"2%"}}>
                    
              
      <h2 onClick={handleShow} style={{cursor:"pointer"}}><i class="fa fa-plus-circle" aria-hidden="true" ></i> Add a new Post
        </h2>
           

        {loading?
        (<>

        </>)
        :
        (<>

          <br></br>

                    {   posts.length!=0?(posts.toReversed().map(post=>(

                    <Post pobj={{post,cid,role:1}}/>

                    ))):(<div style={{marginTop:"5%", color:"grey"}}><center>No Posts To Show</center></div>)

                    }

        </>)}

        <br></br>
                                <br></br>
                                <center>
                                <Button className='btn-danger' onClick={()=>{DeleteClass()}}>Delete Class</Button>
                                </center>

                    
                </Col>

            </Row>

        </Container>








    </>
  )
}

export default MenClass