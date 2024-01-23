import React from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { deletePost } from '../actions/postAction';
import { useDispatch } from 'react-redux';
const Post = ({pobj}) => {
  //const [pobj, role]=obj
  //console.log("recieved pobj")
  //console.log(pobj)
  const {post,role}=pobj
  const {_id, pname, pdesc, ptype, datecreated, deadline} = post;
  const currdate=new Date()
  const dline = new Date(deadline)
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  //console.log(currentUser)


  const navigate = useNavigate();

  const handleGrading = () => {
  navigate(`/grade?pid=${_id}`);
  };

  const dispatch=useDispatch();

  const handledeletepost = () => {
    if (typeof window !== 'undefined' && window.confirm("Are you sure you want to delete post?")) {
      dispatch(deletePost({pid:_id}))
    } else {
      console.log("User pressed Cancel");
    }
  };


  //console.log(pname,currdate,dline,currdate>dline)
    return (
    <>
    <Container style={{border:"1px solid grey",backgroundColor:"#ffffff", borderRadius:"10px", padding:"2%", marginTop:"2%"}}>
        <h5 style={{display:"inline"}}>{pname}</h5>
        {role==1?(<img src="icons/delete.png" style={{height:"20px",width:"20px",float:"right",marginLeft:"1%",cursor:"pointer"}} onClick={()=>{handledeletepost()}}></img>
        
        ):(<></>)}
        <br></br>
        <span style={{color:"grey"}}>  Posted on {new Date(datecreated).toLocaleDateString('en-GB')}</span>
        <p style={{paddingTop:"2%"}}>{pdesc}</p>
        {
            ptype==="assignment"?
            (<>
            
                {role===1?(<>
                    
                
                <Button className='bg-primary' type="submit" onClick={handleGrading}>Grade Assignment</Button>
                
                </>)
                :
                (<>
                <Button className='bg-primary' type="submit" onClick={()=>(window.location.href=`/assignment?pid=${_id}`)}> View Assignment</Button>
                
                {!currentUser.submitted.includes(_id)?( 
                  <>{ dline>currdate?
                  (<><h6 style={{"display":"inline", "padding":"2%","color":"brown"}}>Submission Pending</h6></>)
                  :
                  (<h6 style={{"display":"inline", "padding":"2%","color":"red"}}>Deadline Expired</h6>)
                  
                  }</>)
     
                  
                :(<h6 style={{"display":"inline", "padding":"2%","color":"green"}}>Submission Completed</h6>)
                  }
                
                </>)}
                  
            
            </>)
            :
            (<></>)
        }
    </Container>
    </>
  )
}

export default Post