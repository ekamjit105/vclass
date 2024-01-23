import axios from 'axios'



export const getAllClassesU= ({uid})=>async(dispatch)=>{

    dispatch({type:"GET_ALLC_REQUEST"})
    try{
        const response= await axios.post("api/classes/getallclassesu",{uid});
        
    

        //localStorage.setItem("allclasses",JSON.stringify(response.data))

        dispatch({type:"GET_ALLC_SUCCESS",payload:response.data})
    
    
    }
    catch(error)
    {
        dispatch({type:"GET_ALLC_FAIL",error})
    }

}

export const getOneClass= ({cid})=>async(dispatch)=>{

    dispatch({type:"GET_ONEC_REQUEST"})
    try{
        const response= await axios.post("api/classes/getoneclass",{cid});
    

        dispatch({type:"GET_ONEC_SUCCESS",payload:response.data[0]})
    
    }
    catch(error)
    {
        dispatch({type:"GET_ONEC_FAIL",error})
    }

}

export const createClass=(cobj)=>async(dispatch)=>{
    dispatch({type:"CREATE_CLASS_REQUEST"})
    try {

        const {cname,uobj} = cobj;
        const newclass = {
            cname:cname,
            cid:Math.random().toString(36).substring(2,7),
            mentorid:uobj.uid,
            nstudents:0,
            students:[],
            cimg:Math.floor(Math.random()*10).toString()+".jpg"
        }

        uobj.classes.created.push(newclass.cid)

        const sobj = {newclass:newclass, uobj:uobj}

        localStorage.setItem("currentUser",JSON.stringify(uobj));

        const response = await axios.post("/api/classes/addclass",sobj)
        
        dispatch({type:"CREATE_CLASS_SUCCESS",payload:response.data})

        window.location.reload();

    } catch (error) {
    
        dispatch({type:"CREATE_CLASS_FAIL"})
    }

}



export const joinClass=(obj)=>async(dispatch)=>{
 
    try {
        const {cid, uobj} = obj
        uobj.classes.joined.push(cid)

        const response = await axios.post("/api/classes/joinclass",obj)
        localStorage.setItem("currentUser",JSON.stringify(uobj));


       window.location.reload();
        
    } catch (error) {
        alert("Class not found")
        console.log("error joining class")
    }

}

export const removeClassUser=(uobj)=>async(dispatch)=>{
 
    try {
        const {role, uid} = uobj
        const response = await axios.post("/api/classes/removeclassuser",uobj)
        
        if(role==1)
        window.location.reload();
        else
        {
            localStorage.setItem("currentUser",JSON.stringify(response.data))

            window.location.href='/';
        }
    } catch (error) {
    
        console.log("error removing user")
    }

}


export const deleteClass=({cid})=>async(dispatch)=>{
 
    try {
        const response = await axios.post("/api/classes/deleteClass",{cid})
        const user = JSON.parse(localStorage.getItem("currentUser"))
        user.classes.created = user.classes.created.filter(userClass => userClass !== cid);
        localStorage.setItem("currentUser",JSON.stringify(user))
        
        window.location.href='/';
        
    } catch (error) {
    
        console.log("error deleting class ")
    }

}

