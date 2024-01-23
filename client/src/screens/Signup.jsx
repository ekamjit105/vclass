import React from 'react'
import axios from 'axios'
import {Form, Container, Button} from 'react-bootstrap'
import {useState} from 'react'
import {loginUser, registerUser} from '../actions/userAction'
import {useSelector, useDispatch } from 'react-redux'

const RegisterScreen = () => {
    const [uname,setName] = useState('')
    const [uid, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    
    const [exists,setExists] = useState(true);
    const [checked,setChecked] = useState(false);
    const [OTP, setOTP] = useState('');
    const [verified, setVerified] = useState(false);
    const [matched, setMatched] = useState(false);


    const dispatch = useDispatch()
    const registerState = useSelector((state) => state.registerReducer);
    const { success } = registerState;
    
    const registerHandler = async() =>{
    
        if(password!==confirmpassword)
        {
            alert("paswords do not match!")
        }
        else{

        //CHECK IF USER ALREADY EXISTS

        const reqobj = {
          uid:uid
        }
        var response = await axios.post("/api/users/finduser",reqobj);
        setExists(response.data.exists);
        setChecked(true);

        if(!response.data.exists)
        {
          var x = Math.floor(Math.random()*1000000);
          x=x.toString();
          var mailobj = {
              to:uid,
              subject:"BlackBoard: OTP for account verification",
              text:"Your OTP for account verification is : "+x
          }
          response = await axios.post("/api/mail/sendmail",mailobj);


          const OTPobj={email:uid,OTP:x};
              
          response = await axios.post("/api/users/saveOTP",OTPobj);
        }

        }
   }



   const OTPMatcher = async() =>{
    const OTPobj={email:uid,OTP:OTP};
        
    var response = await axios.post("/api/users/validateOTP",OTPobj);
    var {matched}=response.data;
    if(matched)
    {

        const user = {uname,uid,password,classes:{created:[],joined:[]}}
        alert("Congratulations! New Account created Successfully. Check your mail for credentials.")

        dispatch(registerUser(user))
        var mailobj = {
            to:uid,
            subject:"BlackBoard: Congratulations on creating a new account!",
            text:"Your Account password is : "+password+". Keep it safe and enjoy learning!"
        }
          
        response = await axios.post("/api/mail/sendmail",mailobj);
        setMatched(true);
        user = {uid,password}
        
    }
    setVerified(true);
}
    

 return (
    <>
    
    
    <Container>
    
    {exists?
    
      <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" value={uname} onChange={(e)=>setName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">  
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={uid} onChange={(e)=>setEmail(e.target.value)}/>
        
          
        {uid!=='' && checked && exists ?
        <Form.Text className="text-muted">Email already exists</Form.Text>
        :
        <Form.Text className="text-muted">We'll never share your email with anyone else.
        </Form.Text>}

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group> 
      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
      </Form.Group>
      
      <Button variant="primary" onClick={registerHandler}>
        Send OTP
      </Button>
    </Form>
    
    : //does not exist
    <Container style={{textAlign:"center"}}><center>{!matched?<Form style={{width:"50%", textAlign:"center"}}>
        <center><br></br><br></br><h5 style={{"color":"lightgreen"}}>OTP sent to email successfully</h5></center>
        <Form.Group className="mb-3" controlId="formBasicEmail"><br></br>
            <Form.Control type="text" placeholder="Enter OTP" value={OTP} onChange={(e)=>setOTP(e.target.value)}/>
        </Form.Group>
            {OTP!=='' && verified && !matched ?<Form.Text className="text-muted">
            OTP does not match
            </Form.Text>:<h1></h1>}
            <Button variant="primary" onClick={OTPMatcher}>
            Register
            </Button>
            </Form>
        :   <>

            </>
        }</center></Container>
    
    }
    
    </Container>
    </>
  )
}

export default RegisterScreen