import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Card,Button} from 'react-bootstrap'
import { useSelector } from 'react-redux';

const ClassCard = ({cid}) => {
  //from cid get the class details
  //const cname = "Trial class";


  const {classes} = useSelector(state=>state.getAllClassReducer)
  const thisclass = classes.find(item=>(item.cid===cid))
  const {cname,cimg}=thisclass

  //const cimg="3.jpg"
  const ipath = "images/"+cimg 

  const navigate = useNavigate();

  const handleViewClass = () => {
  navigate(`/class?cid=${cid}`);
  };

    return (
    <Card style={{ width: '18rem', margin:"1%"}}>
      <Card.Img variant="top" src={ipath} />
      <Card.Body>
        <Card.Title>{cname}</Card.Title>
        <Card.Text>
          Code : {cid}<br/>
        </Card.Text>
        <Button variant="primary" onClick={handleViewClass}>View Class</Button>
      </Card.Body>
    </Card>
  )
}

export default ClassCard