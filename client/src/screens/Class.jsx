import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import StuClass from './StuClass'
import MenClass from './MenClass'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../actions/postAction'
import { getOneClass } from '../actions/classAction'

const Class = () => {


    const [queryParameters] = useSearchParams()
    const cid = queryParameters.get("cid")
    //const cid="abc"
    //get complete class detail using cid
    

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getOneClass({cid}))
        dispatch(getAllPosts({cid}))
    },[dispatch])

    const {thisclass,loading}=useSelector(state=>state.getOneClassReducer)
    let cname="", mentorid="", cimg="0.jpg"
    
    if(!loading)
    {
        cname=thisclass.cname
        mentorid=thisclass.mentorid
        cimg=thisclass.cimg
    }



    //get current uid
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const {uid}=currentUser


    

    return (
    <>
    <Container style={{paddingTop:"2%"}}>
    
  <div style={{ position: "relative", padding: "5%" }}>
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `url('images/${cimg}')`,
      opacity: "0.2",
      zIndex: -1,
    }}
  ></div>
  <h1><b>{cname}</b></h1>
<h5> Class code : {cid}</h5>
</div>
        {uid===mentorid?
        (
            <>
                <MenClass cid={cid}></MenClass>
            </>
        )
        :
        (<>
                <StuClass cid={cid}></StuClass>
        </>)
        }
        <br></br><br></br>
    </Container>
        
    </>
  )
}

export default Class