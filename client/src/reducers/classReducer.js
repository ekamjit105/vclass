export const getAllClassReducer =(state={classes:[],loading:true},action)=>{
    switch(action.type)
    {
        case "GET_ALLC_REQUEST":
            return{
                loading:true
            };
        case "GET_ALLC_SUCCESS":
            return{
                loading:false,
                success:true,
                classes:action.payload
            };
        case "GET_ALLC_FAIL":
            return{
                error:action.payload
            };
        default : return state;
    }
}



export const getOneClassReducer =(state={thisclass:{}, loading:true},action)=>{
    switch(action.type)
    {
        case "GET_ONEC_REQUEST":
            return{
                loading:true
            };
        case "GET_ONEC_SUCCESS":
            return{
                loading:false,
                success:true,
                thisclass:action.payload
            };
        case "GET_ONEC_FAIL":
            return{
                error:action.payload
            };
        default : return state;
    }
}
