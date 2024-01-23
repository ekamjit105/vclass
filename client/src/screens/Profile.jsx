import React from 'react'
import { Container, Table } from 'react-bootstrap'



const Profile = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const {uid,uname,classes} = currentUser



  return (
    <>
    <Container>
      <center>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Table border={2} style={{padding:"10%",width:"65vw"}}>
        <tr>
          <td>Name</td>
          <td>{uname}</td>
        </tr>
        <tr>
          <td>Email ID</td>
          <td>{uid}</td>
        </tr>
        <tr>
          <td>Number of Classes Created </td>
          <td>{classes.created.length}</td>
        </tr>
        <tr>
          <td>Number of Classes Joined </td>
          <td>{classes.joined.length}</td>
        </tr>
      </Table></center>
    </Container>
      
    </>
  )
}

export default Profile