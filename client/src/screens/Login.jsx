import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { loginuser } from '../actions/userAction'

const Login = () => {

const [email,setEmail] = useState()
const [password,setPassword] = useState()

const dispatch = useDispatch()

  const loginHandler =()=>{

    const uobj={uid : email, password : password}
    dispatch(loginuser(uobj))
    
}
  
    return (
    <>
    
    <center>
        <Container style={{marginTop:"5%", width:"50%"}}>
            <h1>Log In</h1>
            <br></br>
            <Form>
                <Form.Group>
                    <Form.Control type="text" value={email} onChange={(e)=>(setEmail(e.target.value))} placeholder="Enter email" name="email"/>
                    <br></br><br></br>
                    <Form.Control type="password" value={password} onChange={(e)=>(setPassword(e.target.value))} placeholder="Enter password" name="password"/>
                    <br></br><br></br>
                    <Button className="btn-success" onClick={loginHandler}> Log in</Button>
                </Form.Group>
            </Form>
            <br/>     
            <a href="/resetpassword">Forgot password</a>
            <br/>
            <h5> Don't have an account? <a href="/signup">Sign Up</a></h5>
        </Container>

    </center>


    
    </>
  )
}

export default Login