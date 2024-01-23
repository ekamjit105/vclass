import axios from 'axios'
import { Alert } from 'react-bootstrap'

export const createPost=(pobj)=>async(dispatch)=>{
    try {
        const response = await axios.post("/api/posts/addpost",pobj)
   
        Alert("Post successfully created")
    } catch (error) {
        console.log("error posting to class")
    }

}

export const getAllPosts=(cobj)=>async(dispatch)=>{
    
    dispatch({type:"GET_ALLP_REQUEST"})
    try {
        const response = await axios.post("/api/posts/getallposts",cobj)
        
        dispatch({type:"GET_ALLP_SUCCESS",payload:response.data})
        
    } catch (error) { 
        dispatch({type:"GET_ALLP_ERROR"})
    }

}



export const getOnePost= ({pid})=>async(dispatch)=>{

    dispatch({type:"GET_ONEP_REQUEST"})
    try{
        const response= await axios.post("api/posts/getonepost",{pid});
        dispatch({type:"GET_ONEP_SUCCESS",payload:response.data[0]})

        

    }
    catch(error)
    {
        dispatch({type:"GET_ONEP_FAIL",error})
    }

}



export const deletePost= ({pid})=>async(dispatch)=>{
    try{
        const response= await axios.post("api/posts/deletepost",{pid});
        window.location.reload();
    }
    catch(error)
    {
        console.log(error)
    }

}