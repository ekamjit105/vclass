
import {configureStore} from '@reduxjs/toolkit'

import { combineReducers} from "redux"
import thunk from "redux-thunk"



import { loginReducer,registerReducer } from "./reducers/userReducer";
import { getAllClassReducer, getOneClassReducer } from "./reducers/classReducer";
import { getAllPostReducer, getOnePostReducer } from "./reducers/postReducer";
import {getOneSubmissionReducer, getAllSubmissionsReducer} from "./reducers/submissionReducer";

const combinedReducers = combineReducers({
    loginReducer:loginReducer,
    registerReducer:registerReducer,
    getAllClassReducer:getAllClassReducer,
    getAllPostReducer:getAllPostReducer,
    getOneClassReducer:getOneClassReducer,
    getOnePostReducer:getOnePostReducer,
    getOneSubmissionReducer:getOneSubmissionReducer,
    getAllSubmissionsReducer:getAllSubmissionsReducer
});

const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null

const initialstate={
    loginReducer :{
        currentUser : currentUser
    }

}


const middleware = [thunk];
const store = configureStore({
reducer:combinedReducers, preloadedState:initialstate, middleware:middleware
})

export default store;