import React, { useEffect, useState } from 'react'
import { Modal, Form, Button, Col, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { gradeSub } from '../actions/submissionAction'
import { sendMail } from '../actions/mailAction'


const Submission = (sobj) => {
 
    const {submission} = sobj

    const dispatch = useDispatch()

    const [grade,setGrade]=useState(submission.grade)
    const [remarks,setRemarks]=useState(submission.remarks)

    const gradeSubHandler=()=>{

        submission.grade=grade
        submission.remarks=remarks
        submission.datesubmitted=new Date(submission.datesubmitted)
        dispatch(gradeSub(submission))
        
        var mailobj = {
            to:tomail,
            subject:"BlackBoard : Assignment Graded",
            text:"Your Assignment has been graded. Grade : "+grade+" Remarks : "+remarks+""
            }
        //dispatch send mail action
        dispatch(sendMail(mailobj))
        setTxt("")
        setSub("")
        
        alert("Submission graded successfully")
    }
 
 
    //mail modal
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [tomail,setToMail]=useState("")
    const [sub,setSub]=useState()
    const [txt,setTxt]=useState()


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



 
    return (
    <>

        
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
                <Button onClick={sendMailHandler} className='btn-success'>Send mail</Button>
                &nbsp;&nbsp;&nbsp;
                <Button onClick={handleClose2} className='btn-danger'>Close</Button>
            
            </Form.Group>

          </Form>
        
        </Modal.Body>
      
      </Modal>












        <Row>
            <Col>{submission.uname}</Col>
            
            <Col><a href={submission.link} target="_blank" rel="noreferrer">View submission</a></Col>
            
            <Col>{new Date(submission.datesubmitted).toLocaleDateString('en-GB')}</Col>
            
            <Col><input type="text" value={grade} onChange={e=>setGrade(e.target.value)}></input></Col>

            <Col><input type="text" value={remarks} onChange={e=>setRemarks(e.target.value)}></input></Col>

            <Col><Button onClick={()=>{gradeSubHandler(); setToMail(submission.uid)}}>Grade</Button></Col>

            <Col><i class="fa fa-envelope" aria-hidden="true" style={{height:"15px",width:"15px",cursor:"pointer"}} onClick={()=>{handleShow2(); setToMail(submission.uid);}}></i></Col>
        </Row>

        


<br></br>
    </>
  )
}

export default Submission