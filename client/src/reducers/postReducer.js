export const getAllPostReducer =(state={posts:[],loading:true},action)=>{
    switch(action.type)
    {
        case "GET_ALLP_REQUEST":
            return{
                loading:true
            };
        case "GET_ALLP_SUCCESS":
            return{
                loading:false,
                success:true,
                posts:action.payload
            };
        case "GET_ALLP_FAIL":
            return{
                error:action.payload
            };
        default : return state;
    }
}

export const getOnePostReducer =(state={pobj:{}, loading:true},action)=>{
    switch(action.type)
    {
        case "GET_ONEP_REQUEST":
            return{
                loading:true
            };
        case "GET_ONEP_SUCCESS":
            return{
                loading:false,
                success:true,
                pobj:action.payload
            };
        case "GET_ONEP_FAIL":
            return{
                error:action.payload
            };
        default : return state;
    }
}
