import React, { useEffect } from 'react'
import {useSearchParams } from 'react-router-dom';
import {Container, Row,Col, Table, Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getOnePost } from '../actions/postAction';
import { getAllSubmissions } from '../actions/submissionAction';
import Submission from '../components/Submission';
const Papa = require('papaparse');

const Grade = () => {
  
    const [queryParams] = useSearchParams();
    const pid = queryParams.get("pid");
    const cid = queryParams.get("pid");
    
    //get complete class details from cid, destructure it to get mentor id
    
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getOnePost({pid}))
        dispatch(getAllSubmissions({pid}))
    },[dispatch])

    const {pobj,loading} = useSelector((state)=>state.getOnePostReducer)
    const {thisclass} = useSelector((state)=>state.getOneClassReducer)

    const {submissions, sloading} = useSelector(state=>state.getAllSubmissionsReducer)


    const mentorid = 1;
    const userid=1
    
    //not authorised mentor of this class;
    if(userid!==mentorid)
    window.location.href="/"

    //get all the submissions according to the cid and pid

    //get assignment details from pid
    //const pobj = {pid : 2, pname: "Announcement", pdesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", ptype:"general", pdate:"06/10/2023", pdeadline:"08/10/2023"}
    let pname="",pdesc="",datecreated="",deadline=new Date(),total=0

    if(!loading)
    {
        pname=pobj.pname
        pdesc=pobj.pdesc
        datecreated=pobj.datecreated
        deadline=pobj.deadline
        total=pobj.total
    } 

        const downloadCSV = ()=> {
            // Convert submissions array to CSV format using papaparse

            const csv = Papa.unparse(submissions);
    
            // Create a Blob containing the CSV data
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });

            // Create a link element and trigger a click to download the CSV file
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'submissions.csv';
            link.click();
        }

        

    return (
    <>
        <br></br>
        <Container>
                    {!sloading&&!loading?(<><h3>{pname} <span style={{float:"right"}}><table><center><tr><th style={{padding:"1%" , borderRight:"1px solid grey"}}>{submissions.length} </th><th style={{padding:"1%"}}>{thisclass.nstudents}</th></tr><tr><td style={{padding:"1%", fontSize:"10px", borderRight:"1px solid grey"}}>Handed In</td><td style={{padding:"1%", fontSize:"10px"}}> Assigned</td></tr></center></table>
                    </span></h3> 
                    posted on {new Date(datecreated).toLocaleDateString('en-GB')}<br></br>
                    <br></br>
                    <p>{pdesc}</p>
                    <h5>Total weightage : {total} marks</h5>
                    <br></br>
                    <h4 style={{display:"inline"}}>Submissions 
                    <Button className='btn-success' style={{float:"right"}} onClick={downloadCSV}>Download CSV</Button>
                    </h4>
                    
                    <hr></hr>

                    <Container>
                    <Row>
                        <Col><h6>Name</h6></Col>
                        <Col><h6>Link</h6></Col>
                        <Col><h6>Submitted on</h6> </Col>
                        <Col><h6>Grade</h6></Col>
                        <Col><h6>Remarks</h6></Col>
                        <Col><h6></h6></Col>
                        <Col><h6></h6></Col>
                    </Row>
                    <br></br>
                    {
                        submissions.map((submission)=>(
                            <Submission submission={submission}/>
                        ))
                        
                    }
                    </Container></>):(<></>)}
                    
        </Container>

                    


    </>
  )
}

export default Grade