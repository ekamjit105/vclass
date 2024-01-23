import React, { useEffect } from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'
import Post from '../components/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../actions/postAction'
import { removeClassUser } from '../actions/classAction'
const StuClass = ({cid}) => {
  
   //get all posts in cid
   /*const posts = [{pid : 1, pname: "Assignment 1", pdesc: "Lorem Ipsum", ptype:"assignment", pdate:"06/10/2023", pdeadline:"07/10/2023"},
   {pid : 2, pname: "Announcement", pdesc: "Lorem Ipsum", ptype:"general", pdate:"06/10/2023", pdeadline:""},
   {pid : 3, pname: "Assignment 2", pdesc: "Lorem Ipsum", ptype:"assignment", pdate:"05/10/2023", pdeadline:"08/10/2023"}]
   */
   const dispatch  = useDispatch()

   useEffect(()=>{
     dispatch(getAllPosts({cid}))

   },[dispatch])

  const {posts,loading}=useSelector(state=>state.getAllPostReducer)
  const currentUser=JSON.parse(localStorage.getItem("currentUser"))
  const submitted = currentUser.submitted
  const currdate=new Date; 
  

   const LeaveClass =()=>{
    if (typeof window !== 'undefined' && window.confirm("Are you sure you want to exit the class?")) {
        const uid = currentUser.uid;
        dispatch(removeClassUser({uid:uid,role:0,cid:cid}))
      } else {
        console.log("User pressed Cancel");
      }
   }


    return (
    <>
        
        <Container style={{"marginTop":"2%"}}>

            <Row>

            <Col md={3} style={{border:"1px solid grey", borderRadius:"10px", padding:"2%", marginRight:"2%"}}>
                    <h4>
                        Due Next
                    </h4>
                    <hr></hr>
                    {loading?(<></>):
                    (<>
  
                                {   posts.length!=0?(posts.toReversed().map(post=>(
                                    <>{post.ptype=="assignment" && !submitted.includes(post._id) && currdate<=new Date(post.deadline)?
                                    (<><span style={{cursor:"pointer", color:"#8b0404"}} onClick={()=>(window.location.href=`/assignment?pid=${post._id}`)}>{post.pname}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span style={{fontSize:"14px", color:"grey"}}>( Due on {new Date(post.deadline).toLocaleDateString('en-GB')} )<br></br></span></>)
                                    :(<></>)}
</>
                                    
                                    ))):(<div style={{marginTop:"5%", color:"grey"}}><center>No Posts To Show</center></div>)   
                                }
                    </>)}
                </Col>

                <Col md={8} >
                {loading?(<></>):
                    (<>

                    <br></br>   
                                {   posts.length!=0?(posts.toReversed().map(post=>(

                                    <Post pobj={{post,cid,role:0}}/>

                                    ))):(<div style={{marginTop:"5%", color:"grey"}}><center>No Posts To Show</center></div>)   
                                }
                    </>)}
                                <br></br>
                                <br></br>
                                <center>
                                <Button className='btn-danger' onClick={()=>{LeaveClass()}}>Leave Class</Button>
                                </center>
                                
                                

                    
                </Col>

            </Row>

        </Container>


    </>
  )
}

export default StuClass