import axios from 'axios'


export const loginuser = (uobj)=>async(dispatch)=>{
    dispatch({type:"LOGIN_USER_REQUEST"})
    try {   
        const response = await axios.post("/api/users/login",uobj)

        localStorage.setItem("currentUser",JSON.stringify(response.data));
        
        
        dispatch({type:"LOGIN_USER_SUCCESS",payload:response.data})
        
        window.location.href = "/";

    } catch (error) {
       //alert("Invalid login")
        dispatch({type:"LOGIN_USER_FAIL"})
    }
}

export const logoutuser = (uobj)=>async(dispatch)=>{
    try{
            console.log("logging out user")
            localStorage.removeItem(
                "currentUser"
            );
        }
    catch (error) {
       
    }
}

export const registerUser = (user) =>async(dispatch) =>{
    
    dispatch({type:'REGISTER_USER_REQUEST'})
    try {
    const response = await axios.post('/api/users/register',user);
    
    dispatch({type:'REGISTER_USER_SUCCESS',payload:response});
    window.location.href = "/login"

    } catch (error) {
        dispatch({type:'REGISTER_USER_FAIL',payload:error})    
    }
}
   