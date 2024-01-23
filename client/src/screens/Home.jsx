import React, { useEffect } from 'react'
import ClassCard from '../components/ClassCard';
import {Container,Row, Col, Form, Alert} from 'react-bootstrap'

import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import {useDispatch, useSelector} from 'react-redux'
import { createClass, getAllClasses,getAllClassesU, joinClass } from '../actions/classAction';
import { getAllClassReducer } from '../reducers/classReducer';

const Home = () => {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {currentUser} = useSelector(state=>(state.loginReducer))


  currentUser==null?(window.location.href='/login'):(console.log())

    

    const {uid, classes} = currentUser;
    const {created, joined} = classes;



  const dispatch = useDispatch();
  //load all the current user's classes into class reducer's state

 const classstate = useSelector(state=>state.getAllClassReducer)
    useEffect(()=>{
      dispatch(getAllClassesU({uid:uid}))//dispatch action
    }, [dispatch])

  const {loading,success,error} = classstate



  //CREATING A NEW CLASS
  const [newcn, setNewcn] = useState()

  const createClassHandler=()=>{
    const cobj = {cname:newcn,uobj:currentUser}


    setShow(false)
    dispatch(createClass(cobj))
  }
  
  
  //JOIN A CLASS
  const [cid,setCid] = useState()

  const joinClassHandler = () =>{
    //check if class already joined
    if(created.includes(cid))
    {
      alert("Cannot join your created class")
    }
    else if(joined.includes(cid))
    {
      alert("Class Already joined")
    }
    else{
      dispatch(joinClass({cid:cid,uobj:currentUser}))
      
    }
  
  }

    return (
    <><br></br>
        

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new Classroom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
          <Form>
            <Form.Group>
              <Form.Control required type="text" value={newcn} onChange={(e)=>(setNewcn(e.target.value))} placeholder="Enter Class Name"/>
              <br></br>
            </Form.Group>
            <Form.Group>
              <Form.Control required type="text"  placeholder="Enter Class Description"/>
            </Form.Group>
           <Button style={{marginTop:"4%"}} variant="primary" onClick={createClassHandler}>Launch Class</Button>
          </Form>
        
        </Modal.Body>
      
      </Modal>
        
        
      <Container>
        
        <h2 onClick={handleShow} style={{cursor:"pointer", display:"inline"}}>
        <i class="fa fa-plus-circle" aria-hidden="true" ></i> Create a new Classroom
        </h2>
        <input   type="text" value={cid} onChange={e=>setCid(e.target.value)} placeholder="Enter a Class code" style={{display:"inline", width:"20%",marginLeft:"5%", paddingLeft:"10px"}}/>
          <Button className="btn-success" onClick={joinClassHandler} style={{display:"inline",marginLeft:"2%", marginTop:"0"}}>Join Class</Button>
        
        <br/>
        {loading?(<>
          <h1>loading</h1>
        </>)
        :error? <h1>Error while loading data</h1>
                          :(<>

          <br/><h3>Created Classes</h3><br/>
        <center>            
        {created.length==0?(<span style={{color:"grey"}}>No classes to show</span>):(<Row>
            {created.toReversed().map((cid)=>(
              <Col md={4}> <ClassCard className = "col-lg-3" cid={cid}/></Col>
            )) } 
        </Row>)}
        

        </center>
        
        <br/><h3>Joined Classes</h3>
        <br></br>
        <center>  
            
        {joined.length===0?(<span style={{color:"grey"}}>No classes to show</span>):(<Row>
            {joined.toReversed().map((cid)=>(
              <Col md={4}> <ClassCard className = "col-lg-3" cid={cid}/></Col>
            )) } 
        </Row>)}
            

         </center>
        <br/>
        <br/> 
        </>)}

            
        
        </Container>
    </>
  )



}

export default Home