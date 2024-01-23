export const loginReducer =(state={},action)=>{
    switch(action.type)
    {
        case "LOGIN_USER_REQUEST":
            return{
                loading:true
            };
        case "LOGIN_USER_SUCCESS":
            return{
                loading:false,
                success:true,
                currentUser:action.payload
            };
        case "LOGIN_USER_FAIL":
            return{
                error:action.payload
            };
        default : return state;
    }
}


export const registerReducer = (state={},action) => {
    switch(action.type){
    case 'REGISTER_USER_REQUEST':
        return{
            loading:true
        };
    case 'REGISTER_USER_SUCCESS':
        return{
            loading:false,
            success:true
        };
    case 'REGISTER_USER_FAIL':
        return{
            error:action.payload
        };
    default : return state;
    
    }
}