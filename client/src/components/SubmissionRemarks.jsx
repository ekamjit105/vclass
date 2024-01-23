import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOneSubmission } from '../actions/submissionAction'

const SubmissionRemarks = ({pid,uid}) => {

    const dispatch  = useDispatch()
    useEffect(()=>{
        dispatch(getOneSubmission({uid,pid}))
    },[dispatch])

    const {sobj,loading} = useSelector(state=>state.getOneSubmissionReducer)

  return (
    <>
        {loading?(console.log())
        :
        (<>
            <br></br><br></br>
            <h6 style={{display:"inline"}}>View Submission : </h6><a href={sobj.link} target="_blank" rel="noreferrer">View submission</a><br></br>
            <h6 style={{display:"inline"}}>Grade : </h6> {sobj.grade<0?<span>Ungraded</span>:sobj.grade}<br></br>
            <h6 style={{display:"inline"}}>Remarks : </h6> {sobj.remarks}
        </>)}

    </>
  )
}

export default SubmissionRemarks