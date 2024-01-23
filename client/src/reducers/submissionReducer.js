
export const getOneSubmissionReducer =(state={sobj:{}, loading:true},action)=>{
    switch(action.type)
    {
        case "GET_ONES_REQUEST":
            return{
                loading:true
            };
        case "GET_ONES_SUCCESS":
            return{
                loading:false,
                success:true,
                sobj:action.payload
            };
        case "GET_ONES_FAIL":
            return{
                error:action.payload
            };
        default : return state;
    }
}


export const getAllSubmissionsReducer =(state={submissions:[],sloading:true},action)=>{
    switch(action.type)
    {
        case "GET_ALLS_REQUEST":
            return{
                sloading:true
            };
        case "GET_ALLS_SUCCESS":
            return{
                sloading:false,
                success:true,
                submissions:action.payload
            };
        case "GET_ALLS_FAIL":
            return{
                error:action.payload
            };
        default : return state;
    }
}