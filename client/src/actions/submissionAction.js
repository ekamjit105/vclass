import axios from 'axios'

export const createSub=(sobj)=>async(dispatch)=>{
    try {
        const response = await axios.post("/api/submissions/addsub",sobj)
        const user = JSON.parse(localStorage.getItem("currentUser"))
        user.submitted=[...user.submitted,sobj.pid]
        localStorage.setItem("currentUser",JSON.stringify(user))
        

        window.location.reload()

    } catch (error) {
        console.log("error doing submission")
    }

}


export const gradeSub=(sobj)=>async(dispatch)=>{
    try {
        const response = await axios.post("/api/submissions/gradesub",sobj)

    } catch (error) {
        console.log("error doing submission")
    }

}

export const getOneSubmission= ({uid,pid})=>async(dispatch)=>{

    dispatch({type:"GET_ONES_REQUEST"})
    try{
        const response= await axios.post("api/submissions/getonesubmission",{uid,pid});

        dispatch({type:"GET_ONES_SUCCESS",payload:response.data[0]})
        console.log("GOT ONE SUBMISSION")
    
    }
    catch(error)
    {
        dispatch({type:"GET_ONES_FAIL",error})
    }

}


export const getAllSubmissions= ({pid})=>async(dispatch)=>{

    dispatch({type:"GET_ALLS_REQUEST"})
    try{
        const response= await axios.post("api/submissions/getallsubmissions",{pid});
        
        dispatch({type:"GET_ALLS_SUCCESS",payload:response.data})

    }
    catch(error)
    {
        dispatch({type:"GET_ALLS_FAIL",error})
    }

}
