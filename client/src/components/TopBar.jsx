import React from 'react'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { logoutuser } from '../actions/userAction'

import {useDispatch, useSelector} from 'react-redux'

const TopBar = () => {
 
    const user = {userid:1, name:"Ekamjit Singh",classes:{created:["c1","c2","c3"],joined:["j1","j2","j3"]}}
    
    
 
    const dispatch = useDispatch()

    const {currentUser} = useSelector(state=>(state.loginReducer))

    const signouthandler =()=>{

     dispatch(logoutuser())
  
     window.location.href="/login"
     
    }
 
 
 
    return (
    <>
        <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="/logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            <b>Black</b>board
          </Navbar.Brand>
          {currentUser==null?
          (<></>)
          :
          (<>
            <NavDropdown title={<span>Hi {currentUser.uname}</span>} id="collapsible-nav-dropdown" style={{"marginRight":"2%"}}>
              <NavDropdown.Item href="/profile">Profile Info</NavDropdown.Item>
              <NavDropdown.Item href="/login" onClick={signouthandler}>Sign Out</NavDropdown.Item>
          </NavDropdown> 

          </>)
          }
          

        </Container>
      </Navbar>
    </>
  )
}

export default TopBar